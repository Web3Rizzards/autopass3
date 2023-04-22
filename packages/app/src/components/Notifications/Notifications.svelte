<script lang="ts">
  import type { Order } from "../../types";
  import { orders } from "../../stores";
  import PaymentItem from "./PaymentItem.svelte";
</script>

<container>
  {#if $orders}
    {#each $orders as order}
      <PaymentItem {order} />
    {/each}
  {/if}
</container>

<style>
  container {
    display: flex;
    flex-direction: column;

    width: 100%;
    gap: 1rem;
  }
</style>
