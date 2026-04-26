<script>
  import tippy from 'tippy.js'; // Esto es una librería externa que importamos
	let contenidoTooltip = $state('Hola holita!');

  /* Creamos la función para el tag factory (que le pasemos contenido) */
	function tooltip(contenido) {
    /* Le pasamos el elemento HTML y el contenido que queramos */
    return (node) => {
      /* IMPORTANT: Aquí le pasamos el contenido con la opción content y podemos configurar las opciones */
      tippy(node, { content: contenido, placement: 'bottom' });
    }
	}
</script>

<input bind:value={contenidoTooltip} />

<!-- IMPORTANT: Aquí, asociamos el tooltip con el elemento HTML -->
<button {@attach tooltip(contenidoTooltip)}>
	Pásame por encima
</button>

<style>
	:global {
		[data-tippy-root] {
			--bg: #666;
			background-color: var(--bg);
			color: white;
			border-radius: 0.2rem;
			padding: 0.2rem 0.6rem;
			filter: drop-shadow(1px 1px 3px rgb(0 0 0 / 0.1));

			* {
				transition: none;
			}
		}

		[data-tippy-root]::before {
			--size: 0.4rem;
			content: '';
			position: absolute;
			left: calc(50% - var(--size));
			top: calc(-2 * var(--size) + 1px);
			border: var(--size) solid transparent;
			border-bottom-color: var(--bg);
		}
	}
</style>
