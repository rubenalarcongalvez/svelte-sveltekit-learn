<script lang="ts">
	/* IMPORTANT: Podemos importar las funciones o atributos que queramos y usarlos y cambiarlos si queremos */
	import { counter } from './shared.svelte.ts';
	/* Como el otro contador está en un archivo aparte, lo pueden usar todos nuestro componentes Counter. Este siguiente, es nuestro solo */
	let contadorBoton: number = $state(0);
</script>

<br>
<button onclick={() => {
	counter.count++;
	contadorBoton++;
}}>
	clicks generales: {counter.count} | clicks este botón: {contadorBoton}
</button>
