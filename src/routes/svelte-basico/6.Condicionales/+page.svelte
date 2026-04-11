<!-- IMPORTANT: Svelte no tiene bloque switch ni while -->
<script>
	let count = $state(0);
	let countVisible = $state(0);

	function increment() {
		count++;
		countVisible++;
	}

  $effect(() => {
    if (countVisible > 20) {
      countVisible = 0;
    }
  });
</script>

<button onclick={increment}>
	Activado {countVisible}
	{countVisible === 1 ? 'vez' : 'veces'}
</button>

<!-- IMPORTANT: Podemos poner IF, y dentro del IF, podemos poner el ELSE o ELSE IF, ya que sería una continuación del IF -->
{#if count > 10 && count <= 20}
  <p>Ehhh, ehhh. ¿No has clicado ya el botoncito muchas veces?</p>
  {:else if count > 20}
  <p>Madre mía...</p>
  {:else}
  <p>Pincha el botón, máquina</p>
{/if}

{#if count > 20}
  <p>Te lo advertí. Ahora por pesado, te reinicio el contador...</p>
{/if}