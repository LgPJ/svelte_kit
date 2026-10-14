<script lang="ts">
	let {
		title,
		description,
		actionLabel,
		onAction
	}: { title: string; description: string; actionLabel?: string; onAction?: () => void } = $props();
</script>

<div class="state">
	<h2>{title}</h2>
	<p>{description}</p>
	{#if actionLabel && onAction}
		<button class="btn" type="button" onclick={onAction}>{actionLabel}</button>
	{/if}
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
	}

	p {
		margin: 0;
		color: var(--color-text-muted);
	}
</style>
