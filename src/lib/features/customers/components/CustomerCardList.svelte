<script lang="ts">
	import { formatDate } from '$lib/shared/format';
	import type { Customer } from '../domain/customer';
	import StatusBadge from './StatusBadge.svelte';

	let { customers, onSelect }: { customers: Customer[]; onSelect: (id: number) => void } =
		$props();
</script>

<ul class="cards">
	{#each customers as customer (customer.id)}
		<li class="card">
			<div class="header">
				<strong>{customer.name}</strong>
				<StatusBadge status={customer.status} />
			</div>
			<p class="email">{customer.email}</p>
			<p class="date">Registro: {formatDate(customer.created_at)}</p>
			<button class="btn" type="button" onclick={() => onSelect(customer.id)}>
				Ver detalle
				<span class="visually-hidden">de {customer.name}</span>
			</button>
		</li>
	{/each}
</ul>

<style>
	.cards {
		display: grid;
		gap: var(--space-3);
		margin: 0;
		padding: var(--space-3);
		list-style: none;
	}

	.card {
		display: grid;
		gap: var(--space-2);
		padding: var(--space-4);
		border: 1px solid var(--color-border);
		border-radius: var(--radius);
	}

	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-2);
	}

	p {
		margin: 0;
		overflow-wrap: anywhere;
	}

	.date {
		font-size: 0.875rem;
		color: var(--color-text-muted);
	}
</style>
