<!-- IMPORTANT: Para ciertos objetos complejos como Map, Set, Date, URL y URLSearchParams, svelte, no aplica reactividad instantánea, sino como si fuera raw (hay que setear una nueva referencia). Es por eso que podemos usar sus clases reactivas en lugar de las originales -->
<script lang="ts">
	import { SvelteDate } from 'svelte/reactivity';

	// let fecha = $state(new Date()); // Cómo se haría de forma normal
	let fecha: Date = new SvelteDate(); // Esto ya sería un $state de base, pero mejorado en Date y reactivo total

	const pad = (n) => n < 10 ? '0' + n : n;

	$effect(() => {
		const interval = setInterval(() => {
			// fecha = new Date(); // Cómo se haría de forma normal
			fecha.setTime(Date.now());
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});
</script>

<p>La hora es: {fecha.getHours()}:{pad(fecha.getMinutes())}:{pad(fecha.getSeconds())}</p>

<p class="rounded p-2 bg-amber-600 text-white">Demás ejemplos de reactividad de objetos complejos como Map, Set, Date, URL y URLSearchParams: <a href="https://svelte.dev/docs/svelte/svelte-reactivity">https://svelte.dev/docs/svelte/svelte-reactivity</a></p>
