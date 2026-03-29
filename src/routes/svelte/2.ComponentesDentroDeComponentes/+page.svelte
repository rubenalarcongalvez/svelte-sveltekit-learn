<script lang='ts'>
	import ComponenteLib from '$lib/components/ComponenteLib.svelte'; // IMPORTANT: Para importar desde libreria, debemos poner $lib antes de la ruta (aunque se autoimporta solo normalmente todo si lo usamos)
	import OtroComponente from './OtroComponente.svelte'; // Importamos componentes normales de esta manera
</script>

<style>
	p {
		color: goldenrod;
		font-family: 'Comic Sans MS', cursive;
		font-size: 2em;
	}
</style>

<p>This is a paragraph.</p>
<!-- IMPORTANT: Los componentes siempre, los nombres deben ser la primera en mayúsculas -->
<OtroComponente/>
<ComponenteLib/>
<!-- Podemos declarar los componentes como queramos, tanto de forma corta como larga -->
<ComponenteLib></ComponenteLib>