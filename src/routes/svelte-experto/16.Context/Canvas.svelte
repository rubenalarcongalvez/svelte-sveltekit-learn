<script>
	import { setContext } from 'svelte';
	import { SvelteSet } from 'svelte/reactivity';
	import { getContextContadorPepe } from './contador-pepe-context.svelte';

	let { width = 100, height = 100, children } = $props();

	let canvas;
	let items = new SvelteSet();

	/* IMPORTANT: Hemos definido que con el nombre canvas, podemos acceder a la función addItem. Se puede asignar cualquier cosa (funciones, clases, etc, incluso varias cosas) */
	setContext('canvas', {addItem});

	function addItem(fn) {
		$effect(() => {
			items.add(fn);
			return () => items.delete(fn);
		});
	}

	$effect(() => {
		const ctx = canvas.getContext('2d');

		ctx.clearRect(0, 0, width, height);
		items.forEach(fn => fn(ctx));
	});

	const contadorPepeContext = getContextContadorPepe();
	contadorPepeContext.contador++;
	console.log(contadorPepeContext.contador); // Comprobamos el resultado
</script>

<canvas bind:this={canvas} {width} {height}>
	{@render children()}
</canvas>

<style>
	canvas {
		width: 100%;
		height: 100%;
	}
</style>
