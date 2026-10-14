import type { Customer } from '../domain/customer';
import type { CustomerRepository } from '../domain/customer.repository';
import { filterCustomers, type StatusFilter } from '../domain/filters';

export type LoadStatus = 'idle' | 'loading' | 'success' | 'error';

const DEFAULT_ERROR = 'Ocurrió un error inesperado.';

export class CustomersStore {
	customers = $state<Customer[]>([]);
	loadStatus = $state<LoadStatus>('idle');
	errorMessage = $state('');
	statusFilter = $state<StatusFilter>('ALL');
	query = $state('');
	selectedId = $state<number | null>(null);

	visibleCustomers = $derived(
		filterCustomers(this.customers, { status: this.statusFilter, query: this.query })
	);
	selectedCustomer = $derived(this.customers.find((c) => c.id === this.selectedId) ?? null);
	hasActiveFilters = $derived(this.statusFilter !== 'ALL' || this.query.trim() !== '');

	constructor(private readonly repository: CustomerRepository) {}

	async load() {
		this.loadStatus = 'loading';
		this.errorMessage = '';

		try {
			this.customers = await this.repository.getAll();
			this.loadStatus = 'success';
		} catch (cause) {
			this.errorMessage = cause instanceof Error ? cause.message : DEFAULT_ERROR;
			this.loadStatus = 'error';
		}
	}

	clearFilters() {
		this.statusFilter = 'ALL';
		this.query = '';
	}

	select(id: number) {
		this.selectedId = id;
	}

	closeDetail() {
		this.selectedId = null;
	}
}
