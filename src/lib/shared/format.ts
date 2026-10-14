const dateFormatter = new Intl.DateTimeFormat('es', { dateStyle: 'medium', timeZone: 'UTC' });

export function formatDate(isoDate: string): string {
	const date = new Date(isoDate);
	return Number.isNaN(date.getTime()) ? '—' : dateFormatter.format(date);
}
