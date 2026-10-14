<div class="loading" role="status" aria-live="polite">
	<span class="visually-hidden">Cargando clientes…</span>
	{#each Array(6) as _, index (index)}
		<div class="skeleton" aria-hidden="true"></div>
	{/each}
</div>

<style>
	.loading {
		display: grid;
		gap: var(--space-3);
		padding: var(--space-4);
	}

	.skeleton {
		height: 3rem;
		border-radius: var(--radius);
		background: linear-gradient(90deg, #eceef4 25%, #f6f7fb 50%, #eceef4 75%);
		background-size: 200% 100%;
		animation: shimmer 1.2s infinite linear;
	}

	@keyframes shimmer {
		to {
			background-position: -200% 0;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.skeleton {
			animation: none;
		}
	}
</style>
