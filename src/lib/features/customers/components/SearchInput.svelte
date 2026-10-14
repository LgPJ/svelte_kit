<script lang="ts">
	let { value = $bindable('') }: { value: string } = $props();
</script>

<label class="search">
	<span class="visually-hidden">Buscar por nombre o email</span>
	<input type="search" placeholder="Buscar por nombre o email…" bind:value />
</label>

<style>
	.search {
		flex: 1 1 16rem;
	}

	input {
		width: 100%;
		padding: var(--space-2) var(--space-3);
		border: 1px solid var(--color-border);
		border-radius: var(--radius);
		background: var(--color-surface);
	}
</style>
