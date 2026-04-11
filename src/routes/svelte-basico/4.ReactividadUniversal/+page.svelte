<script>
	import Counter from './Counter.svelte'; // Importamos el componente que a su vez importa propiedades y funciones
</script>

<!-- De esta forma, todos estos contadores, comparten un único contador, no el suyo propio -->
<Counter />
<Counter />
<Counter />
