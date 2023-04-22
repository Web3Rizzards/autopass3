<script lang="ts">
</script>

<container>
  <slot />
</container>

<style>
  container {
    display: flex;
    flex-direction: row;

    width: 100%;
    padding: 1rem;
    margin: 1rem;

    gap: 1rem;
    word-break: break-all;
  }
</style>
