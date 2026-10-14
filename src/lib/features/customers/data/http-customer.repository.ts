import type { Customer } from '../domain/customer';
import type { CustomerRepository } from '../domain/customer.repository';

export class ApiError extends Error {
	constructor(
		message: string,
		readonly status?: number
	) {
		super(message);
		this.name = 'ApiError';
	}
}

type Fetch = typeof fetch;

export class HttpCustomerRepository implements CustomerRepository {
	constructor(
		private readonly endpoint: string,
		private readonly fetcher: Fetch = fetch
	) {}

	async getAll(signal?: AbortSignal): Promise<Customer[]> {
		let response: Response;
		try {
			response = await this.fetcher(this.endpoint, { signal });
		} catch (cause) {
			if (cause instanceof DOMException && cause.name === 'AbortError') throw cause;
			throw new ApiError('No se pudo conectar con el servidor.');
		}

		if (!response.ok) {
			throw new ApiError(`El servidor respondió con un error (${response.status}).`, response.status);
		}

		return (await response.json()) as Customer[];
	}
}
