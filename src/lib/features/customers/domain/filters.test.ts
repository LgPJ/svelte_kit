import { describe, expect, it } from 'vitest';
import type { Customer } from './customer';
import { filterCustomers } from './filters';

const customers: Customer[] = [
	{ id: 1, name: 'Ana Pérez', email: 'ana@example.com', status: 'ACTIVE', created_at: '2024-01-10T10:00:00Z' },
	{ id: 2, name: 'Luis Gómez', email: 'luis@corp.io', status: 'PENDING', created_at: '2024-02-11T10:00:00Z' },
	{ id: 3, name: 'Marta Ruiz', email: 'marta@example.com', status: 'BLOCKED', created_at: '2024-03-12T10:00:00Z' }
];

describe('filterCustomers', () => {
	it('returns everything with ALL and empty query', () => {
		expect(filterCustomers(customers, { status: 'ALL', query: '' })).toHaveLength(3);
	});

	it('filters by status', () => {
		const result = filterCustomers(customers, { status: 'PENDING', query: '' });
		expect(result.map((c) => c.id)).toEqual([2]);
	});

	it('searches by name ignoring case and accents', () => {
		const result = filterCustomers(customers, { status: 'ALL', query: 'perez' });
		expect(result.map((c) => c.id)).toEqual([1]);
	});

	it('searches by email', () => {
		const result = filterCustomers(customers, { status: 'ALL', query: 'corp.io' });
		expect(result.map((c) => c.id)).toEqual([2]);
	});

	it('combines status and query', () => {
		expect(filterCustomers(customers, { status: 'ACTIVE', query: 'example' })).toHaveLength(1);
		expect(filterCustomers(customers, { status: 'BLOCKED', query: 'ana' })).toHaveLength(0);
	});
});
