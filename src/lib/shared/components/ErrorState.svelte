<script lang="ts">
	let { message, onRetry }: { message: string; onRetry: () => void } = $props();
</script>

<div class="state" role="alert">
	<h2>No pudimos cargar los clientes</h2>
	<p>{message}</p>
	<button class="btn btn-primary" type="button" onclick={onRetry}>Reintentar</button>
</div>

<style>
	.state {
		display: grid;
		justify-items: center;
		gap: var(--space-3);
		padding: var(--space-8) var(--space-4);
		text-align: center;
	}

	h2 {
		margin: 0;
		font-size: 1.125rem;
		color: var(--badge-blocked-fg);
	}

	p {
		margin: 0;
		color: var(--color-text-muted);
	}
</style>
