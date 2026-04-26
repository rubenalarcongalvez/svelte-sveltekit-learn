<script>
	let width = $state();
	let height = $state();
	let size = $state(42);

  /* URGENT: Como vemos, NO surte efecto. Se cambia el valor, pero el elemento, no cambia de tamaño */
  function cambiarWidth() {
    width = 28;
  }
</script>

<label>
	<input type="range" bind:value={size} min="10" max="100" />
	font size ({size}px)
</label>

<!-- Ponemos bindear dimensiones inherentes a los elementos -->
<!-- IMPORTANT: clientWidth y clientHeight sirven para las dimensiones internas (tamaño de la caja y el padding, lo de dentro) -->
<!-- IMPORTANT: offsetWidth y offsetHeight sirven para las dimensiones externas (todo lo que ocupa realmente, borde, padding, barra de scroll, caja, contenido, etc). Lo único que excluye son los márgenes -->
<!-- URGENT: Estos valores son solo readonly, por lo que aunque los cambiemos manualmente, no surtirá efecto -->
<button bind:clientWidth={width} bind:clientHeight={height} onclick={cambiarWidth}>
	<span style="font-size: {size}px" contenteditable>edita el texto</span>
	<span class="size">{width} x {height}px</span>
</button>

<style>
	button {
		position: relative;
		display: inline-block; /* IMPORTANT: Los contenidos inline (sin block), no tienen width ni height. Hay que tenerlo en cuenta. Por eso he puesto inline-block */
		padding: 0.5rem;
		background: hsla(15, 100%, 50%, 0.1);
		border: 1px solid hsl(15, 100%, 50%);
	}

	.size {
		position: absolute;
		right: -1px;
		bottom: -1.4em;
		line-height: 1;
		background: hsl(15, 100%, 50%);
		color: white;
		padding: 0.2em 0.5em;
		white-space: pre;
	}
</style>
