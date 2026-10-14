<script lang="ts">
	import { formatDate } from '$lib/shared/format';
	import type { Customer } from '../domain/customer';
	import StatusBadge from './StatusBadge.svelte';

	let { customers, onSelect }: { customers: Customer[]; onSelect: (id: number) => void } =
		$props();
</script>

<table>
	<thead>
		<tr>
			<th scope="col">Nombre</th>
			<th scope="col">Email</th>
			<th scope="col">Estado</th>
			<th scope="col">Registro</th>
			<th scope="col"><span class="visually-hidden">Acciones</span></th>
		</tr>
	</thead>
	<tbody>
		{#each customers as customer (customer.id)}
			<tr>
				<td class="name">{customer.name}</td>
				<td>{customer.email}</td>
				<td><StatusBadge status={customer.status} /></td>
				<td>{formatDate(customer.created_at)}</td>
				<td class="actions">
					<button class="btn" type="button" onclick={() => onSelect(customer.id)}>
						Ver detalle
						<span class="visually-hidden">de {customer.name}</span>
					</button>
				</td>
			</tr>
		{/each}
	</tbody>
</table>

<style>
	table {
		width: 100%;
		border-collapse: collapse;
	}

	th,
	td {
		padding: var(--space-3) var(--space-4);
		text-align: left;
		border-bottom: 1px solid var(--color-border);
	}

	th {
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		color: var(--color-text-muted);
	}

	tbody tr:last-child td {
		border-bottom: 0;
	}

	tbody tr:hover {
		background: #f9faff;
	}

	.name {
		font-weight: 600;
	}

	.actions {
		text-align: right;
	}

	/* Tablet: drop the least important column to avoid horizontal scroll. */
	@media (max-width: 899px) {
		th:nth-child(4),
		td:nth-child(4) {
			display: none;
		}
	}
</style>
