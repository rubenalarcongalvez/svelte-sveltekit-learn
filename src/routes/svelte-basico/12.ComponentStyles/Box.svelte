<div class="box"></div>

<style>
	.box {
		width: 5em;
		height: 5em;
		border-radius: 0.5em;
		margin: 0 0 1em 0;
    /* IMPORTANT: La mejor práctica, es usar variables, que podemos pasar como si fueran props, pero con estilo de variable */
		background-color: var(--color, #ddd);
	}
</style>
