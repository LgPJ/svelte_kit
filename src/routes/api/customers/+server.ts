import { error, json } from '@sveltejs/kit';
import { customersData } from '$lib/server/customers.data';
import type { RequestHandler } from './$types';

const SIMULATED_LATENCY_MS = 700;

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Mock REST endpoint.
 *  - GET /api/customers          -> 200 with the full list
 *  - GET /api/customers?fail=1   -> 500 (to exercise the error UI)
 *  - GET /api/customers?empty=1  -> 200 with [] (to exercise the empty UI)
 */
export const GET: RequestHandler = async ({ url }) => {
	await wait(SIMULATED_LATENCY_MS);

	if (url.searchParams.has('fail')) {
		error(500, 'Simulated server failure');
	}

	return json(url.searchParams.has('empty') ? [] : customersData);
};
