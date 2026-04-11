<script lang="ts">
	import Box from "./Box.svelte";

	let coloresCajas: string[] = $state(['red', 'green', 'blue']);
</script>

<style>
  /* Usaremos :global() */
  /* IMPORTANT: Si queremos alterar el estilo de todos los componentes y sus hijos (desde este nivel hasta abajo, no a los padres). Algo como ng-deep pero sin afectar a los padres también. Hay que tener cuidado porque no es tan buena práctica, pero es permitido */
  /* .boxes :global(.box:nth-child(1)) {
		background-color: red;
	}

	.boxes :global(.box:nth-child(2)) {
		background-color: green;
	}

	.boxes :global(.box:nth-child(3)) {
		background-color: blue;
	} */
</style>

<!-- IMPORTANT: La mejor práctica, es usar variables, que podemos pasar como si fueran props, pero con estilo de variable -->
<!-- IMPORTANT: Si usamos este método, debemos tener en cuenta que si queremos cambiar más estilos, los estilos de Box ya no serán los mismos, sino un nivel por debajo. Por ejemplo, si box tiene un div como primer elemento, para acceder a él, no podemos usar div.boxes > div, ya que internamente, está envuelto en un wrapper para que la variable --color funcione -->
<div class="boxes">
  {#each coloresCajas as color (color)}
		<Box --color={color} />
  {/each}
</div>