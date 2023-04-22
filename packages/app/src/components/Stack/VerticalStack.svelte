<script lang="ts">
</script>

<vertical-stack>
  <slot />
</vertical-stack>

<style>
  vertical-stack {
    display: flex;
    flex-direction: column;

    width: 100%;
    gap: 1rem;
    padding: 1rem;

    word-break: break-all;
  }
</style>
