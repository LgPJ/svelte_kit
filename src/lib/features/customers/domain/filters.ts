import type { Customer, CustomerStatus } from './customer';

export type StatusFilter = CustomerStatus | 'ALL';

export interface CustomerFilters {
	status: StatusFilter;
	query: string;
}

const normalize = (value: string) =>
	value
		.normalize('NFD')
		.replace(/\p{Diacritic}/gu, '')
		.toLowerCase()
		.trim();

export function filterCustomers(customers: Customer[], filters: CustomerFilters): Customer[] {
	const query = normalize(filters.query);

	return customers.filter((customer) => {
		const matchesStatus = filters.status === 'ALL' || customer.status === filters.status;
		const matchesQuery =
			query === '' ||
			normalize(customer.name).includes(query) ||
			normalize(customer.email).includes(query);

		return matchesStatus && matchesQuery;
	});
}
