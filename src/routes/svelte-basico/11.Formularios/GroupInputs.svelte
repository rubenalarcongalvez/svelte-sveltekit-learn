<script>
	let cucharadas = $state(1);
	let sabores = $state([]);

	const formatter = new Intl.ListFormat('es', { style: 'long', type: 'conjunction' });
</script>

<h2>Tamaño</h2>

{#each [1, 2, 3] as number (number)}
	<label>
  <!-- IMPORTANT: Usamos bind:group para en base a opciones, elegir una o varias. Sirve para agrupar checkbox y radio buttons -->
		<input
			type="radio"
			name="cucharadas"
			value={number}
      bind:group={cucharadas}
		/>
		{number} {number === 1 ? 'cucharada' : 'cucharadas'}
	</label>
{/each}

<h2>Sabores</h2>

{#each ['Cookies and cream', 'Menta', 'Ferrero Rocher'] as sabor (sabor)}
	<label>
		<input
			type="checkbox"
			name="sabores"
			value={sabor}
      bind:group={sabores}
		/>
		{sabor}
	</label>
{/each}

{#if sabores.length === 0}
	<p>Selecciona un sabor</p>
{:else if sabores.length > cucharadas}
	<p>No puedes pedir más sabores que cucharadas</p>
{:else}
	<p>
		Pediste {cucharadas} {cucharadas === 1 ? 'cucharada' : 'cucharadas'}
		de {formatter.format(sabores)}
	</p>
{/if}