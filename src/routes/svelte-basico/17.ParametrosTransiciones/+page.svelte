<script>
	import { fly } from 'svelte/transition';

	let visible = $state(true);
	let accesible = $state(true);
	let status = $state('waiting...');
</script>

<p>status: {status}</p>

<label>
	<input type="checkbox" bind:checked={visible} />
	visible
</label>
<label>
	<input type="checkbox" bind:checked={accesible} />
	accesible
</label>

{#if accesible}
  {#if visible}
    <p
      // IMPORTANT: Como vemos, si no tuviera |global, la transición no funcionaría al alternar accesible, ya que no es el elemento directo padre que lo engloba. Para solucionarlo y que se aplique en cualquier condición, ponemos |global
      transition:fly|global={{ y: 200, duration: 2000 }}
      // IMPORTANT: Puede sernos útil saber cuándo empieza y termina una transición. Para ello, usamos lo siguiente
      onintrostart={() => status = 'intro started'}
      onoutrostart={() => status = 'outro started'}
      onintroend={() => status = 'intro ended'}
      onoutroend={() => status = 'outro ended'}
    >
      Flies in and out
    </p>
  {/if}
{/if}
