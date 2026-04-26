<!-- IMPORTANT: Es como usar resolve en Angular, que transforma una promesa para que podamos usarla como signal, con métodos propios -->
<script>
	import { roll } from './utils.svelte.ts';

  /* IMPORTANT: Solo toma en cuenta la promesa más reciente en esa variable, por lo que no hace falta comprobaciones extra */
	let promise = $state(roll()); /* Predeterminamos la acción */
	let promise2 = $state(roll());
</script>

<button onclick={() => {
    promise = roll();
    promise2 = roll();
  }}>
	Tirar dados
</button>

<!-- Bloque de asincronía convencional -->
{#await promise}
  <p>Tirando dados...</p>
{:then value}
  <h1>Tu número es el: {value}</h1>
{:catch error}
  <p class="text-red-600">{error}</p>
{/await}

<!-- Podemos rescatar el valor directamente si creemos que siempre va a resultar -->
{#await promise2 then numero}
  <h1>El número de tu segundo dado es el: {numero}</h1>
{/await}