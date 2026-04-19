<script>
	import FilteredList from './FilteredList.svelte';
	import { colors } from './data.js';
</script>

<FilteredList
	data={colors}
	field="name"
  /* IMPORTANT: Le podemos pasar snippets como parámetros al componente hijo */
  {header}
  {row}
>
  <!-- IMPORTANT: Podemos poner lo que queramos genérico aquí, como en Angular, que @children del componente hijo, si se lo pasamos por parámetro, lo pondrá -->
  <div>Hola caracola</div>

  <!-- IMPORTANT: Incluso si declaramos los snippets aquí dentro, podremos usarlos en el hijo. Esto también irá con children como prop, pero además, le debemos pasar mensajeBonito en las props del componente hijo (aunque no haga falta en el componente padre pasarlo como parámetro) -->
  {#snippet mensajeBonito(mensaje = 'Eres la luz que ilumina la mañana')}
    <div class="p-2 rounded bg-amber-600 text-white mb-2">
      {mensaje}
    </div>
  {/snippet}
</FilteredList>

{#snippet header()}
	<header>
		<span class="color"></span>
		<span class="name">name</span>
		<span class="hex">hex</span>
		<span class="rgb">rgb</span>
		<span class="hsl">hsl</span>
	</header>
{/snippet}

{#snippet row(d)}
	<div class="row">
		<span class="color" style="background-color: {d.hex}"></span>
		<span class="name">{d.name}</span>
		<span class="hex">{d.hex}</span>
		<span class="rgb">{d.rgb}</span>
		<span class="hsl">{d.hsl}</span>
	</div>
{/snippet}

<style>
  header, .row {
    display: grid;
    align-items: center;
    grid-template-columns: 2em 4fr 3fr;
    gap: 1em;
    padding: 0.1em;
    background: var(--bg-1);
    border-radius: 0.2em;
  }

  header {
    font-weight: bold;
  }

  .row:hover {
    background: var(--bg-2);
  }

  .color {
    aspect-ratio: 1;
    height: 100%;
    border-radius: 0.1em;
  }

  .rgb, .hsl {
    display: none;
  }

  @media (min-width: 40rem) {
    header, .row {
      grid-template-columns: 2em 4fr 3fr 3fr;
    }

    .rgb {
      display: block;
    }
  }

  @media (min-width: 60rem) {
    header, .row {
      grid-template-columns: 2em 4fr 3fr 3fr 3fr;
    }

    .hsl {
      display: block;
    }
  }
</style>