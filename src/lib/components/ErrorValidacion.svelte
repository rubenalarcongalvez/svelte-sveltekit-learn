<script lang="ts">
  let {mensajeError = 'Error', numeroError} = $props();
</script>

<p class="text-red-500">{numeroError ? `${numeroError}. ` : ''}{mensajeError}</p>