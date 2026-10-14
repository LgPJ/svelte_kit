<script lang="ts">
	import { formatDate } from '$lib/shared/format';
	import type { Customer } from '../domain/customer';
	import StatusBadge from './StatusBadge.svelte';

	let { customer, onClose }: { customer: Customer | null; onClose: () => void } = $props();

	let dialog: HTMLDialogElement;

	// Native <dialog> gives focus trap, Esc handling and inert background for free.
	$effect(() => {
		if (customer && !dialog.open) dialog.showModal();
		if (!customer && dialog.open) dialog.close();
	});

	function closeOnBackdropClick(event: MouseEvent) {
		if (event.target === dialog) onClose();
	}
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
<dialog bind:this={dialog} aria-labelledby="detail-title" onclose={onClose} onclick={closeOnBackdropClick}>
	{#if customer}
		<header>
			<h2 id="detail-title">{customer.name}</h2>
			<button class="btn" type="button" onclick={onClose} aria-label="Cerrar detalle">✕</button>
		</header>
		<dl>
			<dt>ID</dt>
			<dd>#{customer.id}</dd>
			<dt>Email</dt>
			<dd>{customer.email}</dd>
			<dt>Estado</dt>
			<dd><StatusBadge status={customer.status} /></dd>
			<dt>Fecha de registro</dt>
			<dd>{formatDate(customer.created_at)}</dd>
		</dl>
	{/if}
</dialog>

<style>
	dialog {
		width: min(28rem, calc(100vw - 2rem));
		padding: var(--space-6);
		border: 0;
		border-radius: var(--radius);
		box-shadow: 0 20px 40px rgb(16 24 40 / 0.25);
	}

	dialog::backdrop {
		background: rgb(16 24 40 / 0.5);
	}

	header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-4);
		margin-bottom: var(--space-4);
	}

	h2 {
		margin: 0;
		font-size: 1.25rem;
	}

	dl {
		display: grid;
		grid-template-columns: max-content 1fr;
		gap: var(--space-3) var(--space-6);
		margin: 0;
	}

	dt {
		color: var(--color-text-muted);
	}

	dd {
		margin: 0;
		overflow-wrap: anywhere;
	}
</style>
