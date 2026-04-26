<script>
	import { setContextContadorPepe } from './contador-pepe-context.svelte.ts';

	/* IMPORTANT: El layout actúa como proveedor para toda la lección */
	setContextContadorPepe();

	let { children } = $props();
</script>

{@render children()}