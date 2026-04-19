<script>
  /* IMPORTANT Podemos pasarle como parámetros, snippets aquí */
	let { data, field, header, row, mensajeBonito, children } = $props();

	let search = $state('');

	let filtered = $derived.by(() => {
		if (search === '') return data;

		const regex = new RegExp(search, 'i');
		return data.filter((d) => regex.test(d[field]));
	});
</script>

<!-- IMPORTANT: Como vemos, podemos llamar a los snippets que hemos puesto dentro del componente, incluso a lo que no hemos usado snippet, lo pondremos como @render children -->
{@render children()}
{@render mensajeBonito()}

<div class="list">
	<label>
		Filter: <input bind:value={search} />
	</label>

	<div class="header">
    <!-- IMPORTANT: Llamamos a los snippets como siempre -->
		{@render header()}
	</div>

	<div class="content">
		{#each filtered as d (d)}
			{@render row(d)}
		{/each}
	</div>
</div>

<style>
	.list {
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	.header {
		border-top: 1px solid var(--bg-2);
		padding: 0.2em 0;
	}

	.content {
		flex: 1;
		overflow: auto;
		padding-top: 0.5em;
		border-top: 1px solid var(--bg-2);
	}
</style>
