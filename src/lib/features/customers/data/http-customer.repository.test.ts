import { describe, expect, it, vi } from 'vitest';
import { ApiError, HttpCustomerRepository } from './http-customer.repository';

const jsonResponse = (body: unknown, status = 200) =>
	new Response(JSON.stringify(body), { status });

describe('HttpCustomerRepository', () => {
	it('returns parsed customers on success', async () => {
		const fetcher = vi.fn().mockResolvedValue(jsonResponse([{ id: 1 }]));
		const repo = new HttpCustomerRepository('/api/customers', fetcher);
		await expect(repo.getAll()).resolves.toEqual([{ id: 1 }]);
	});

	it('throws ApiError with status on non-2xx', async () => {
		const fetcher = vi.fn().mockResolvedValue(jsonResponse({}, 500));
		const repo = new HttpCustomerRepository('/api/customers', fetcher);
		await expect(repo.getAll()).rejects.toMatchObject({ name: 'ApiError', status: 500 });
	});

	it('throws ApiError on network failure', async () => {
		const fetcher = vi.fn().mockRejectedValue(new TypeError('offline'));
		const repo = new HttpCustomerRepository('/api/customers', fetcher);
		await expect(repo.getAll()).rejects.toBeInstanceOf(ApiError);
	});
});
