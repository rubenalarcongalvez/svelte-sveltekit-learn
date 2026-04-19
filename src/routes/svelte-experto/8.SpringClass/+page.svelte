<!-- IMPORTANT: Spring es una alternativa a Tween que funciona mejor para valores que cambian MUCHO. Aunque es menos personalizable -->
<script lang="ts">
	import { Spring } from "svelte/motion";

  /* IMPORTANT: los instanciamos con new Spring */
	let coords = new Spring({ x: 50, y: 50 }, {
    /* Podemos personalizar el stiffness y el damping */
    stiffness: 0.1, // Define la fuerza con la que acelera hacia el objetivo
    damping: 0.25 // Define cuánto se frena para evitar rebotes excesivos
  });
	let size = new Spring(10);
</script>

<svg
	onmousemove={(e) => {
    /* Recordemos que debemos usar .target para establecer a dónde queremos ir */
		coords.target = { x: e.clientX, y: e.clientY };
	}}
	onmousedown={() => (size.target = 30)}
	onmouseup={() => (size.target = 10)}
	role="presentation"
>
  <!-- Recordemos que debemos usar .current para consultar o setear el valor actual -->
	<circle
		cx={coords.current.x}
		cy={coords.current.y}
		r={size.current}
	></circle>
</svg>

<!-- IMPORTANT: Podemos incluso cambiar la stiffness y la damping dinámicamente -->
<div class="controls">
  <br>
  <br>
  <br>
	<label>
		<h3>stiffness ({coords.stiffness})</h3>
		<input
			bind:value={coords.stiffness}
			type="range"
			min="0.01"
			max="1"
			step="0.01"
		/>
	</label>

	<label>
		<h3>damping ({coords.damping})</h3>
		<input
			bind:value={coords.damping}
			type="range"
			min="0.01"
			max="1"
			step="0.01"
		/>
	</label>
</div>

<style>
	svg {
		position: absolute;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
	}

	circle {
		fill: #ff3e00;
	}

	.controls {
		position: absolute;
		top: 1em;
		right: 1em;
		width: 200px;
		user-select: none;
	}

	.controls input {
		width: 100%;
	}
</style>
