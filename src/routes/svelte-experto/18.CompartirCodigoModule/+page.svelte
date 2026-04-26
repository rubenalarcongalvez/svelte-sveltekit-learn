<!-- IMPORTANT: Es muy útil tener módulos para compartir cosas -->
<!-- URGENT: Es bastante peligroso si guardamos cosas NO estáticas y que cambian como datos del usuario. Para eso mejor setContext y getContext -->
<!-- IMPORTANT: Es decir, debe ser explícitamente para COMPARTIR datos EN EL MISMO COMPONENTE, por ejemplo si hay varios instanciados, las propiedades de module, se comparten directamente -->
<!-- El ejemplo está en AudioPlayer.svelte -->
<script>
	import AudioPlayer, { pauseAll } from './AudioPlayer.svelte'; // Hay que importar todo, obviamente
	import { tracks } from './tracks.js';
</script>

<div class="centered">
	{#each tracks as track (track)}
		<AudioPlayer {...track} />
	{/each}

  <!-- IMPORTANT: Como vemos, hemos podido importar la función para usarla en cualquier componente (usarlo con cuidado) -->
  <button onclick={pauseAll}>
    Pausar todo
  </button>
</div>

<style>
	.centered {
		display: flex;
		flex-direction: column;
		height: 100%;
		justify-content: center;
		gap: 0.5em;
		max-width: 40em;
		margin: 0 auto;
	}
</style>
