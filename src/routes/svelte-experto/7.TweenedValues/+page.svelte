<!-- IMPORTANT: La clase Tween sirve para avanzar progresivamente al nuevo valor asignado, de forma que parezca que va poco a poco -->
<!-- Es como un $state, pero con esa particularidad -->
<script>
	import { cubicOut } from "svelte/easing";
	import { Tween } from "svelte/motion";

  /* IMPORTANT: Lo podemos instanciar, e incluso poner transiciones adicionales */
	let progress = new Tween(0, {
    delay: 100,
    duration: 400,
    /* Podemos definirlo nosotros mismos la transición, o usar preestablecidas. Lo mismo, con valores de 0 a 1 */
    easing: cubicOut,
    /* Con esto, definimos cómo se calcula el valor intermedio. NORMALMENTE, NO LO DEFINIREMOS */
		interpolate: (from, to) => {
			// Crea la funcion que recibe t (0..1) y devuelve el valor intermedio.
			return (t) => from + (to - from) * t;
		}
  });
</script>

<!-- IMPORTANT: Para consultar el número actual en el que está -->
<progress value={progress.current}></progress>

<!-- IMPORTANT: Para consultar o setear el número al que queremos ir con nuestra transición -->
<button onclick={() => (progress.target = 0)}>
	0%
</button>

<button onclick={() => (progress.target = 0.25)}>
	25%
</button>

<button onclick={() => (progress.target = 0.5)}>
	50%
</button>

<button onclick={() => (progress.target = 0.75)}>
	75%
</button>

<button onclick={() => (progress.target = 1)}>
	100%
</button>

<style>
	progress {
		display: block;
		width: 100%;
	}
</style>
