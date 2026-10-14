export const CUSTOMER_STATUSES = ['ACTIVE', 'PENDING', 'BLOCKED'] as const;

export type CustomerStatus = (typeof CUSTOMER_STATUSES)[number];

export interface Customer {
	id: number;
	name: string;
	email: string;
	status: CustomerStatus;
	created_at: string;
}

export const STATUS_LABELS: Record<CustomerStatus, string> = {
	ACTIVE: 'Activo',
	PENDING: 'Pendiente',
	BLOCKED: 'Bloqueado'
};
