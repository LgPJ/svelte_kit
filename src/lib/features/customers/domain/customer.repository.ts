import type { Customer } from './customer';

/** Abstraction the UI depends on. Any data source (REST, mock, GraphQL) can implement it. */
export interface CustomerRepository {
	getAll(signal?: AbortSignal): Promise<Customer[]>;
}
