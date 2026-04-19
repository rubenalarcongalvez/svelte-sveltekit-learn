<!-- IMPORTANT: Los snippets son como una mezcla más rápida y efectiva del ng-content y el ng-template (para no tener que repetir código en el mismo componente, o pasarle al componente hijo bloques de código y código entero directamente desde el padre, pudiendo rellenar lo que queramos) -->
<!-- Se pueden pasar tanto como parámetros como poniéndolos directamente dentro del componente hijo. Con @render children(), pondrá todo lo que pongamos DENTRO del componente hijo (lo tenemos que poner eso en el componente hijo), y si queremos especificar más, con snippets, podemos asignarle snippets para distinguir qué le pasamos, y en el componente hijo, ponemos: @render NOMBRE_DEL_SNIPPET(PROPIEDADES_SI_TIENE_DEL_SNIPPET) -->
<table>
	<thead>
		<tr>
			<th>Emoji</th>
			<th>Descripción</th>
			<th>UNICODE</th>
			<th>HTML</th>
		</tr>
	</thead>

	<tbody>
    <!-- IMPORTANT: Creamos un snippet de esta forma para poder llamarlo donde queramos con parámetros que queramos (los parámetros no es obligatorioo que los pongamos). Lo de dentro del snippet no se renderiza, es simplemente para declararlo y luego llamarlo -->
		{#snippet monicaco(/** @type {string} */ descripcion = 'Cucu', mono = '🙈')} <!-- Podemos poner cualquier tipo de parametro, pero podemos tiparlo de este modo -->
      <tr>
				<td>{mono}</td>
        <td>{descripcion}</td>
				<td>\u{mono.charCodeAt(0).toString(16)}\u{mono.charCodeAt(1).toString(16)}</td>
				<td>&amp#{mono.codePointAt(0)}</td>
      </tr>
    {/snippet}
    <!-- IMPORTANT: Lo llamamos de esta manera todas las veces que queramos y de las formas que queramos, con @render -->
		{@render monicaco()}
		{@render monicaco('Tras tras', '🙉')}
		{@render monicaco('Te sorprende', '🙊')}
	</tbody>
</table>

<style>
	th, td {
		padding: 0.5em;
	}

	td:nth-child(3),
	td:nth-child(4) {
		font-family: monospace;
	}
</style>
