<script lang="ts">
	import { paint } from './gradient.js';

  let canvas: HTMLCanvasElement;

	$effect(() => {
    /* Podemos jugar con las propiedades y de todo del elemento */
		const context = canvas.getContext('2d');

		let frame = requestAnimationFrame(function loop(t) {
			frame = requestAnimationFrame(loop);
			paint(context, t);
		});

		return () => {
			cancelAnimationFrame(frame);
		};
	});
</script>

<!-- IMPORTANT: Podemos bindear cualquier elemento (como @ViewChid en Angular) a cualquier variable -->
<canvas bind:this={canvas} width={32} height={32}></canvas>

<style>
	canvas {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: #666;
		mask: url(./svelte-logo-mask.svg) 50% 50% no-repeat;
		mask-size: 60vmin;
		-webkit-mask: url(./svelte-logo-mask.svg) 50% 50% no-repeat;
		-webkit-mask-size: 60vmin;
	}
</style>
