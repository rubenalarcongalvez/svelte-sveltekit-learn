<script>
	let cadenaPersonalizada = `Esto sería como el innerHTML de Angular <strong>HTML!!!</strong>`;
</script>

<!-- IMPORTANT: Así es como ponemos HTML desde una cadena, pero Svelte no sanitiza por defecto. Hay que sanitizar si el contenido es externo -->
<!-- eslint-disable-next-line svelte/no-at-html-tags -->
<p>{@html cadenaPersonalizada}</p>