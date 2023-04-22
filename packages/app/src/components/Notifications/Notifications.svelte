<script lang="ts">
  import type { Order } from "../../types";
  import { orders } from "../../stores";
  import PaymentItem from "./PaymentItem.svelte";
  let _orders: Order[];

  orders.subscribe((value) => {
    _orders = value;
  });
</script>

<container>
  {#if _orders}
    {#each _orders as order}
      <PaymentItem {order} />
    {/each}
  {/if}
</container>

<style>
  container {
    display: flex;
    flex-direction: column;

    background-color: transparent;
    border-radius: 15px;
    
    width: 100%;
    gap: 1rem;
  }
</style>
