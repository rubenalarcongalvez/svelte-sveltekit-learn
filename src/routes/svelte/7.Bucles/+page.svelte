<script>
	import Ingrediente from './Ingrediente.svelte';

	let ingrediente = $state([
		{ id: 1, name: 'apple' },
		{ id: 2, name: 'banana' },
		{ id: 3, name: 'carrot' },
		{ id: 4, name: 'doughnut' },
		{ id: 5, name: 'egg' }
	]);
</script>

<!-- IMPORTANT: De esta manera declaramos bucles, incluso podemos obtener su índice  -->
<!-- Si ponemos la key, mejor (lo que va entre paréntesis al final). Siempre es mejor ponerla por el DOM -->
<main class="flex gap-2 justify-center">
	<section>
		<h1>Con key</h1>
		{#each ingrediente as ingrediente, indice (ingrediente.id)}
			<article class="flex items-baseline">
				<Ingrediente name={ingrediente.name} />
				<span>. Posición: {indice + 1}</span>
			</article>
		{/each}
	</section>

	<section>
		<h1>Sin key</h1>
		<!-- eslint-disable-next-line svelte/require-each-key -->
		{#each ingrediente as ingrediente, indice}
			<article class="flex items-baseline">
				<Ingrediente name={ingrediente.name} />
				<span>. Posición: {indice + 1}</span>
			</article>
		{/each}
	</section>

	<button onclick={() => ingrediente.shift()}>Eliminar primer elemento</button>
</main>