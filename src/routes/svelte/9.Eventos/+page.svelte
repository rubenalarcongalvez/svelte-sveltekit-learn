<script lang="ts">
	import Contador from "./Contador.svelte";

	let m = $state({ x: 0, y: 0 });

	function onpointermove(event) {
		m.x = event.clientX;
		m.y = event.clientY;
	}

  let valorContador: number = $state(0);
</script>

<style>
  @reference 'tailwindcss';
  section {
    @apply mt-2 h-25 w-50 cursor-pointer rounded border relative;
  }
</style>

<a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/pointermove_event"
	>Podemos ejecutar cualquier evento de HTML</a
>

<main class="flex gap-2">
  <!-- También podemos escribir los eventos como onpointermove={onpointermove} o directamente {onpointermove} -->
  <!-- Además, podemos usar lambda directamente en lugar de usar una función aparte -->
  <section
    role="presentation"
    {onpointermove}
    onpointerleave={() => (m = { x: 0, y: 0 })}
  >
    El cursor está en {Math.round(m.x) || '?'} x {Math.round(m.y) || '?'}
  </section>

  <!-- IMPORTANT: Los capture sirven para capturar cuándo se le da al botón realmente -->
  <!-- En este ejemplo vemos que si ponemos capture, detecta de padre a hijo, y si no, de hijo a padre -->
  <section
    onclick={(e) => alert('Se ha ejecutado el DIV')}
  >
    <span
      onclick={(e) => alert('Se ha ejecutado el SPAN')}
      class="h-full w-full cursor-pointer rounded absolute text-center"
    >
      ¡Prueba a clicarme!
    </span>
  </section>

  <!-- Vemos la diferencia ahora si ejecutamos con capture -->
  <section
    onclickcapture={() => alert('Se ha ejecutado el DIV')}
  >
    <span
      onclickcapture={() => alert('Se ha ejecutado el SPAN')}
      class="h-full w-full cursor-pointer rounded absolute text-center"
    >
      ¡Prueba a clicarme!
    </span>
  </section>

  <!-- IMPORTANT: También podemos pasar como parámetros los eventos que queramos -->
  <section class="flex items-center flex-col justify-center">
    <!-- IMPORTANT: Incluso podemos hacer que el usuario ponga sus propios eventos donde queramos dentro del componente (lo tendremos que poner en el propio componente) -->
    <div><Contador incrementar={() => valorContador++} decrementar={() => valorContador--} onclick={() => valorContador = 0}/></div>
    <span>El contador va por {valorContador}</span>
  </section>
</main>
