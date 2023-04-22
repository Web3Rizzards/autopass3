<script lang="ts">
  import type { Order } from "../../types";
  import PaymentItem from "./PaymentItem.svelte";

  export let orders: Order[];
</script>

<container>
  <PaymentItem />
</container>

<style>
  container {
    display: flex;
    flex-direction: column;

    width: 100%;
    gap: 1rem;
  }
</style>
