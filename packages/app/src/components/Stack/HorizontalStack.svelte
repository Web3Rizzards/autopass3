<script lang="ts">
  export let alignItems = "flex-start";
  export let justifyContent = "center";
</script>

<horizontal-stack style="--alignItems:{alignItems}; --justifyContent: {justifyContent};">
  <slot />
</horizontal-stack>

<style>
  horizontal-stack {
    display: flex;
    flex-direction: row;

    align-items: var(--alignItems);
    justify-content: var(--justifyContent);
    
    width: 100%;
    padding: 1rem;

    gap: 1rem;
    word-break: break-all;
  }
</style>
