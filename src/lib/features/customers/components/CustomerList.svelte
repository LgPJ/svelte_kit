<script lang="ts">
	import type { Customer } from '../domain/customer';
	import CustomerCardList from './CustomerCardList.svelte';
	import CustomerTable from './CustomerTable.svelte';

	let { customers, onSelect }: { customers: Customer[]; onSelect: (id: number) => void } =
		$props();
</script>

<!-- Same data, two presentations: the breakpoint decides which one is shown. -->
<div class="table-view"><CustomerTable {customers} {onSelect} /></div>
<div class="cards-view"><CustomerCardList {customers} {onSelect} /></div>

<style>
	.cards-view {
		display: none;
	}

	@media (max-width: 639px) {
		.table-view {
			display: none;
		}

		.cards-view {
			display: block;
		}
	}
</style>
