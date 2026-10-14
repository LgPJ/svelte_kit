<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { HttpCustomerRepository } from '$lib/features/customers/data/http-customer.repository';
	import { CustomersStore } from '$lib/features/customers/state/customers.store.svelte';
	import CustomerDetailModal from '$lib/features/customers/components/CustomerDetailModal.svelte';
	import CustomerList from '$lib/features/customers/components/CustomerList.svelte';
	import SearchInput from '$lib/features/customers/components/SearchInput.svelte';
	import StatusFilter from '$lib/features/customers/components/StatusFilter.svelte';
	import EmptyState from '$lib/shared/components/EmptyState.svelte';
	import ErrorState from '$lib/shared/components/ErrorState.svelte';
	import LoadingState from '$lib/shared/components/LoadingState.svelte';

	// Forwarding the query string lets /?fail=1 and /?empty=1 demo the error and empty states.
	const store = new CustomersStore(
		new HttpCustomerRepository(`/api/customers${page.url.search}`)
	);

	onMount(() => store.load());
</script>

<svelte:head>
	<title>Customer Dashboard</title>
</svelte:head>

<main>
	<header>
		<h1>Customer Dashboard</h1>
		{#if store.loadStatus === 'success'}
			<p class="count" aria-live="polite">
				{store.visibleCustomers.length} de {store.customers.length} clientes
			</p>
		{/if}
	</header>

	<div class="toolbar">
		<SearchInput bind:value={store.query} />
		<StatusFilter bind:value={store.statusFilter} />
	</div>

	<section class="panel">
		{#if store.loadStatus === 'loading' || store.loadStatus === 'idle'}
			<LoadingState />
		{:else if store.loadStatus === 'error'}
			<ErrorState message={store.errorMessage} onRetry={() => store.load()} />
		{:else if store.customers.length === 0}
			<EmptyState
				title="Aún no hay clientes"
				description="Cuando se registren clientes aparecerán aquí."
			/>
		{:else if store.visibleCustomers.length === 0}
			<EmptyState
				title="Sin resultados"
				description="Ningún cliente coincide con tu búsqueda o filtro."
				actionLabel="Limpiar filtros"
				onAction={() => store.clearFilters()}
			/>
		{:else}
			<CustomerList customers={store.visibleCustomers} onSelect={(id) => store.select(id)} />
		{/if}
	</section>
</main>

<CustomerDetailModal customer={store.selectedCustomer} onClose={() => store.closeDetail()} />

<style>
	main {
		max-width: 64rem;
		margin: 0 auto;
		padding: var(--space-6) var(--space-4);
	}

	header {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		justify-content: space-between;
		gap: var(--space-2);
		margin-bottom: var(--space-4);
	}

	h1 {
		margin: 0;
		font-size: 1.5rem;
	}

	.count {
		margin: 0;
		color: var(--color-text-muted);
	}

	.toolbar {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--space-3);
		margin-bottom: var(--space-4);
	}

	.panel {
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius);
		box-shadow: var(--shadow);
		overflow: hidden;
	}
</style>
