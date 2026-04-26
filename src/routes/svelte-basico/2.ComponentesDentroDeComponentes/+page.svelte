<script lang="ts">
	import ComponenteLib from '$lib/components/ComponenteLib.svelte'; // IMPORTANT: Para importar desde libreria, debemos poner $lib antes de la ruta (aunque se autoimporta solo normalmente todo si lo usamos)
	import { Contador, contadorService } from './Contador.svelte';
	import OtroComponente from './OtroComponente.svelte'; // Importamos componentes normales de esta manera
	
	/* IMPORTANT: Podemos incluso importar varios estilos de archivos distintos, tanto de $lib como de la misma carpeta. Podemos poner el sistema de carpetas que queramos */
	import './estilosArchivo.css'; /* IMPORTANT: Muy importante: Los estilos que importemos, también afectará a los componentes hijos y padres, pero los estilos propios de este componente (en style), no */

	/* URGENT: Cuidado con lo que exportamos. Es muy peligroso hacer estas cosas SIN setContext o getContext si usamos SSR, ya que podríamos tener vulnerabilidades de seguridad. Lo mejor es usar getContext y setContext, que lo veremos en Svelte-experto (Context) */
	/* IMPORTANT: También podemos separar los TS que queramos en otros archivos, incluso tener varios */
	const contadorNuevo = new Contador(); // Si lo hacemos asi, estaremos simplemente creando un nuevo contador, por lo que no guardará estado entre archivos
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

<!-- Aqui ilustramos lo de contador -->
<!-- Aunque lo cambiemos en otro componente, conservará su estado de este componente, ya que lo declaramos aquí  -->
<div>Contador Nuevo: {contadorNuevo.cuenta}</div>
<!-- IMPORTANT: Sin embargo, si lo hacemos asi, si guardara el estado si lo cambiamos en otro sitio -->
<div>Contador Service: {contadorService.cuenta}</div>