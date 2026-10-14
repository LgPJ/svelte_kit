import { describe, expect, it } from 'vitest';
import { formatDate } from './format';

describe('formatDate', () => {
	it('formats ISO dates in Spanish', () => {
		expect(formatDate('2024-01-12T09:15:00Z')).toContain('2024');
	});

	it('returns a dash for invalid input', () => {
		expect(formatDate('not-a-date')).toBe('—');
	});
});
