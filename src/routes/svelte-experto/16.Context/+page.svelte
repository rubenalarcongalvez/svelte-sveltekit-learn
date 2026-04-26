<!-- Mirar en Canvas.svelte y luego en Square.svelte -->

<!-- IMPORTANT: El Context es como si inyectáramos dependencias en Angular, pero más rápido, aunque menos completo y fastidioso ya que te tienes que acordar exactamente de la key que le pones al contexto -->
<!-- Es muy importante declararlos al principio del componente para que se instancien antes -->
<!-- URGENT: Es mucho mejor que usar simplemente export para exportar, ya que solo sería a nivel de donde lo llama -->
<!-- Además, es muy peligroso utilizar export para cosas reactivas, ya que si tenemos SSR, pueden vulnerarse los datos -->
<script>
	import Canvas from './Canvas.svelte';
	import { getContextContadorPepe } from './contador-pepe-context.svelte.ts';
	import Square from './Square.svelte';

	// we use a seeded random number generator to get consistent jitter
	let seed = 1;

	function random() {
		seed *= 16807;
		seed %= 2147483647;
		return (seed - 1) / 2147483646;
	}

	function jitter(amount) {
		return amount * (random() - 0.5);
	}

	/* IMPORTANT: El contexto lo crea el +layout.svelte (o componente padre donde fue declarado) y aquí solo lo consumimos */
	const contadorPepeContext = getContextContadorPepe();
	console.log(contadorPepeContext);
	console.log(contadorPepeContext.contador);
	contadorPepeContext.contador++; // Lo hacemos aquí y en Canvas.svelte
	console.log(contadorPepeContext.contador);
</script>

<div class="container">
	<Canvas width={800} height={1200}>
		{#each Array(12) as _, c (c)}
			{#each Array(22) as _, r (r)}
				<Square
					x={180 + c * 40 + jitter(r * 2)}
					y={180 + r * 40 + jitter(r * 2)}
					size={40}
          rotate={jitter(r + 0.05)}
				/>
			{/each}
		{/each}
	</Canvas>
</div>

<style>
	.container {
		height: 80vh;
		aspect-ratio: 2 / 3;
		margin: 0 auto;
		background: rgb(224, 219, 213);
		filter: drop-shadow(0.5em 0.5em 1em rgba(0, 0, 0, 0.1));
	}
</style>