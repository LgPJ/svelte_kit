<script lang="ts">
	import { CUSTOMER_STATUSES } from '../domain/customer';
	import type { StatusFilter } from '../domain/filters';

	let { value = $bindable('ALL') }: { value: StatusFilter } = $props();

	const options: { value: StatusFilter; label: string }[] = [
		{ value: 'ALL', label: 'Todos' },
		{ value: CUSTOMER_STATUSES[0], label: 'Activos' },
		{ value: CUSTOMER_STATUSES[1], label: 'Pendientes' },
		{ value: CUSTOMER_STATUSES[2], label: 'Bloqueados' }
	];
</script>

<fieldset class="filter">
	<legend class="visually-hidden">Filtrar por estado</legend>
	{#each options as option (option.value)}
		<label class:selected={value === option.value}>
			<input type="radio" name="status-filter" value={option.value} bind:group={value} />
			{option.label}
		</label>
	{/each}
</fieldset>

<style>
	.filter {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2);
		margin: 0;
		padding: 0;
		border: 0;
	}

	label {
		position: relative;
		padding: var(--space-2) var(--space-4);
		border: 1px solid var(--color-border);
		border-radius: 999px;
		background: var(--color-surface);
		font-size: 0.875rem;
		cursor: pointer;
	}

	label.selected {
		background: var(--color-primary);
		border-color: var(--color-primary);
		color: var(--color-primary-contrast);
	}

	label:has(input:focus-visible) {
		outline: 3px solid var(--color-focus);
		outline-offset: 2px;
	}

	input {
		position: absolute;
		opacity: 0;
		inset: 0;
		cursor: pointer;
	}
</style>
