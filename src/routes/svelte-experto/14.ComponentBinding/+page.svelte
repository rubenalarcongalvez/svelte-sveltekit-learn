<script lang="ts">
	import Keypad from './Keypad.svelte';

	let pin = $state('');
	let elemento: HTMLDivElement = $state();

	let view = $derived(pin
		? pin.replace(/\d(?!$)/g, '•')
		: 'Introduce tu PIN');

	function onsubmit() {
		alert(`Has puesto: ${pin}`);
	}

  /* Como vemos, estamos cogiendo el elemento DIV de Keypad y lo estamos asignando aquí */
  function ponerMarco() {
    elemento.classList.add('rounded', 'border', 'p-2');
  }
</script>

<main class="flex gap-2 flex-col items-center">
  <h1 style="opacity: {pin ? 1 : 0.4}">
    {view}
  </h1>

  <!-- IMPORTANT: Para bindear como si fuera un model() de Angular un prop de un componente. Esto hay que usarlo con moderación porque tiene poca trazabilidad -->
  <!-- Podemos incluso hacerlo con elementos (this) -->
  <Keypad bind:value={pin} {onsubmit} bind:element={elemento}/>

  <button onclick={ponerMarco}>
    Poner marco
  </button>
</main>
