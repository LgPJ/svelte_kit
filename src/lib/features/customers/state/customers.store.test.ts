import { describe, expect, it } from 'vitest';
import type { Customer } from '../domain/customer';
import type { CustomerRepository } from '../domain/customer.repository';
import { CustomersStore } from './customers.store.svelte';

const sample: Customer[] = [
	{ id: 1, name: 'Ana', email: 'ana@x.com', status: 'ACTIVE', created_at: '2024-01-01T00:00:00Z' },
	{ id: 2, name: 'Luis', email: 'luis@x.com', status: 'BLOCKED', created_at: '2024-01-02T00:00:00Z' }
];

const repoReturning = (data: Customer[]): CustomerRepository => ({ getAll: async () => data });
const failingRepo: CustomerRepository = {
	getAll: async () => {
		throw new Error('boom');
	}
};

describe('CustomersStore', () => {
	it('loads customers and flags success', async () => {
		const store = new CustomersStore(repoReturning(sample));
		await store.load();
		expect(store.loadStatus).toBe('success');
		expect(store.visibleCustomers).toHaveLength(2);
	});

	it('exposes the error message on failure', async () => {
		const store = new CustomersStore(failingRepo);
		await store.load();
		expect(store.loadStatus).toBe('error');
		expect(store.errorMessage).toBe('boom');
	});

	it('applies filters and clears them', async () => {
		const store = new CustomersStore(repoReturning(sample));
		await store.load();
		store.statusFilter = 'BLOCKED';
		expect(store.visibleCustomers.map((c) => c.id)).toEqual([2]);
		expect(store.hasActiveFilters).toBe(true);
		store.clearFilters();
		expect(store.visibleCustomers).toHaveLength(2);
	});

	it('selects and closes detail', async () => {
		const store = new CustomersStore(repoReturning(sample));
		await store.load();
		store.select(1);
		expect(store.selectedCustomer?.name).toBe('Ana');
		store.closeDetail();
		expect(store.selectedCustomer).toBeNull();
	});
});
