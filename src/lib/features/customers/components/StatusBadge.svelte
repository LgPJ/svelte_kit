<script lang="ts">
	import { STATUS_LABELS, type CustomerStatus } from '../domain/customer';

	let { status }: { status: CustomerStatus } = $props();
</script>

<span class="badge {status.toLowerCase()}">
	<span class="dot" aria-hidden="true"></span>
	{STATUS_LABELS[status]}
</span>

<style>
	.badge {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		padding: 0.125rem 0.625rem;
		border-radius: 999px;
		font-size: 0.8125rem;
		font-weight: 600;
		white-space: nowrap;
	}

	.dot {
		width: 0.5rem;
		height: 0.5rem;
		border-radius: 50%;
		background: currentColor;
	}

	.active {
		background: var(--badge-active-bg);
		color: var(--badge-active-fg);
	}

	.pending {
		background: var(--badge-pending-bg);
		color: var(--badge-pending-fg);
	}

	.blocked {
		background: var(--badge-blocked-bg);
		color: var(--badge-blocked-fg);
	}
</style>
