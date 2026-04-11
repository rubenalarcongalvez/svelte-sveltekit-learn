<script>
	import { cubicInOut, elasticOut } from 'svelte/easing';
	import { fade } from 'svelte/transition';

	let visible = $state(true);

	/* IMPORTANT: podemos crear nuestras propias transiciones, en referencia al elemento HTML */
	function spin(node, {
		duration,
		delay,
	}) {
		return {
			/* Le podemos poner los siguientes argumentos */
			duration, // En milisegundos
			delay, // En milisegundos
			/* IMPORTANT: Easing y tick son algo menos eficientes, pero dan una lógica más compleja */
			easing: cubicInOut, // Función de suavizado (ease-in-out)
			/* IMPORTANT: tick - Toma el nodo (elemento) como referencia. Aunque en la mayoría de casos, mejor usar css en lugar de tick */
			/* Recibe t (0 a 1, progreso), y podemos hacer cambios al DOM aquí */
			tick: (t) => {
				const deg = t * 360; // Rotación de 0 a 360 grados
				node.style.transform = `rotate(${deg}deg)`;
			},
			/* IMPORTANT: Con CSS. */
			/* t es el progreso, que va incremental hasta terminar */
			/* u es el complemento de t (es decir 1 - t). Ej:
				Inicio: t = 0, u = 1
				Mitad: t = 0.5, u = 0.5
				Final: t = 1, u = 0
			*/
			css: (t, u) => {
				const eased = elasticOut(t);

				return `
					transform: scale(${eased}) rotate(${eased * 1080}deg);
					color: hsl(
						${Math.trunc(t * 360)},
						${Math.min(100, 1000 * u)}%,
						${Math.min(50, 500 * u)}%
					);`
			}
		};
	}

	/* IMPORTANT: También podemos crear transiciones con JS/TS */
	function typewriter(node, { speed = 1 }) {
		const valid = node.childNodes.length === 1 && node.childNodes[0].nodeType === Node.TEXT_NODE;

		if (!valid) {
			throw new Error(`This transition only works on elements with a single text node child`);
		}

		const text = node.textContent;
		const duration = text.length / (speed * 0.01);

		return {
			duration,
			tick: (t) => {
				const i = Math.trunc(text.length * t);
				node.textContent = text.slice(0, i);
			},
			/* Incluso dentro de nuestra transición de TS, podemos usar CSS */
			css: (t, u) => `opacity: ${t * u}`
		};
	}
</script>

<label>
	<input type="checkbox" bind:checked={visible} />
	visible
</label>

{#if visible}
	<div
		class="centered"
		// IMPORTANT: Enlazamos nuestra transición creada con CSS
		in:spin={{ duration: 8000, delay: 500 }}
		out:fade
	>
		<span>transitions!</span>
	</div>
	
	<!-- IMPORTANT: Enlazamos nuestra transición creada con JS/TS -->
	<p transition:typewriter>
		The quick brown fox jumps over the lazy dog
	</p>
{/if}

<style>
	.centered {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}

	span {
		position: absolute;
		transform: translate(-50%, -50%);
		font-size: 4em;
	}
</style>
