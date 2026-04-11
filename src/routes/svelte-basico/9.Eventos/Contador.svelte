<!-- IMPORTANT: También podemos pasar como parámetros los eventos que queramos -->
<script lang="ts">
  /* Incluso podemos hacer que el usuario ponga sus propios eventos */
	let {incrementar, decrementar, ...customEvents} = $props();
</script>

<style>
  button {
    cursor: pointer;
  }
</style>

<button {...customEvents}>Custom (ej: reset)</button>
<button onclick={decrementar}>-1</button>
<button onclick={incrementar}>+1</button>
