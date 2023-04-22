<script lang="ts">
</script>

<horizontal-stack>
  <slot />
</horizontal-stack>

<style>
  horizontal-stack {
    display: flex;
    flex-direction: row;

    width: 100%;
    padding: 1rem;

    gap: 1rem;
    word-break: break-all;
  }
</style>
