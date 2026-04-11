<script>
	let cucharadas = $state(1);
	let sabores = $state([]);

	const formatter = new Intl.ListFormat('es', { style: 'long', type: 'conjunction' });
</script>

<h2>Tamaño</h2>

{#each [1, 2, 3] as number (number)}
	<label>
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

<!-- IMPORTANT: También podemos poner bind:value para los selects múltiples -->
<select multiple bind:value={sabores}>
	{#each ['Cookies and cream', 'Menta', 'Ferrero Rocher'] as sabor (sabor)}
		<option>{sabor}</option>
	{/each}
</select>

<!-- Esto, si no fuera múltiple, tendríamos que controlar que no fuera un array y controlarlo de otra forma -->
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