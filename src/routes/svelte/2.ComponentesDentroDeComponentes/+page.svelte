<script lang="ts">
	import ComponenteLib from '$lib/components/ComponenteLib.svelte'; // IMPORTANT: Para importar desde libreria, debemos poner $lib antes de la ruta (aunque se autoimporta solo normalmente todo si lo usamos)
	import { Contador } from './Contador.svelte';
	import OtroComponente from './OtroComponente.svelte'; // Importamos componentes normales de esta manera
	
	/* IMPORTANT: Podemos incluso importar varios estilos de archivos distintos, tanto de $lib como de la misma carpeta. Podemos poner el sistema de carpetas que queramos */
	import './estilosArchivo.css'; /* IMPORTANT: Muy importante: Los estilos que importemos, también afectará a los componentes hijos, pero los estilos propios de este componente (en style), no */

	/* IMPORTANT: También podemos separar los TS que queramos en otros archivos, incluso tener varios */
	const contador = new Contador(); // Como si fuera un service realmente y así podemos separar lógicas
	contador.incrementar();
	contador.incrementar();
	console.log(contador.doble);
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
<OtroComponente />
<ComponenteLib/>
<!-- Podemos declarar los componentes como queramos, tanto de forma corta como larga -->
<ComponenteLib></ComponenteLib>