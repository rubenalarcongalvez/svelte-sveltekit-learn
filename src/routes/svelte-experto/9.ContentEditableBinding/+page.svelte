<script>
	let html = $state('');
</script>

<p>Vemos que podemos poner atajos de texto como <code>Ctrl+B</code> para negrita (como siempre en contenteditable)</p>
<!-- IMPORTANT: Podemos bindear innerHTML a lo que queramos y será bidireccional con contenteditable -->
<!-- URGENT: En Angular, esto NO se hace de forma nativa. No es bidireccional esto, habría que hacer las modificaciones con eventos o Viewchild -->
<div bind:innerHTML={html} contenteditable placeholder="Escribe algo aquí, pisha"></div>

<pre>{html}</pre>

<style>
  code {
    background-color: gray;
    color: white;
    border-radius: 5px;
    padding: 5px;
  }

	[contenteditable] {
		padding: 0.5em;
		border: 1px solid #b7b7b7;
		border-radius: 4px;
	}

  /* Esto simplemente lo ponemos para que pueda funcionar placeholder en un contenteditable */
  [contenteditable][placeholder]:empty::before {
    content: attr(placeholder);
    color: #888;
    pointer-events: none;
  }
</style>