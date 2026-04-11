<script lang="ts">
	/* IMPORTANT: Usamos $props para usarlo a modo de input() output() de Angular */
	let { name = 'tabaco', version = '2.0', description = 'mentolado', website = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' } = $props(); /* Podemos poner el tipo de respuesta que queramos recibir también */
</script>

<style>
  code {
    background-color: black;
    color: red;
		border-radius: 5px;
		padding: 5px;
  }
</style>

<p>
	El paquete <code>{name}</code> es: {description}. Descarga la versión {version} de
	<a href="https://www.npmjs.com/package/{name}">npm</a> y
	<a href={website}>aprende más aquí</a>
</p>
