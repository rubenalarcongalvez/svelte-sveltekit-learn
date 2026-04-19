<script lang="ts">
	const MAX_SIZE = 200;

  /* IMPORTANT: Todas las clases y TODO, puede ser reactivo, con $state o $derived por ejemplo, o $state.raw o $derived.by */
	class Box {
    /* IMPORTANT: Declaramos las propiedades PRIVADAS, con un # si estamos en JS o TS, pero como estamos en TS, podemos poner private directamente */
		#width: number = $state(0);
		#height: number = $state(0);
		area: number = $derived(this.width * this.height);
		perimetro: number = $derived.by(() => {
      return this.width * 2 + this.height * 2;
    });
    historialAreasAgrandadoBoton: number[] = $state.raw([]);

		constructor(width: number, height: number) {
			this.#width = width;
		  this.#height = height;
		}

    /* Podemos poner getters y setters si queremos, así, no modifican más que lo que queramos */
    get width() {
      return this.#width;
    }

    get height() {
      return this.#height;
    }

    /* Por ejemplo, aquí controlamos que no exceda del valor máximo que le hemos puesto */
    set width(value) {
      this.#width = Math.max(0, Math.min(MAX_SIZE, value));
    }
    set height(value) {
      this.#height = Math.max(0, Math.min(MAX_SIZE, value));
    }

		agrandar(amount: number): void {
			this.width += amount;
			this.height += amount;
      this.historialAreasAgrandadoBoton.push(this.area);
		}
	}

	const box = new Box(100, 100);
</script>

<label>
	<input type="range" bind:value={box.width} min={0} max={MAX_SIZE} />
	{box.width}
</label>

<label>
	<input type="range" bind:value={box.height} min={0} max={MAX_SIZE} />
	{box.height}
</label>

<button onclick={() => box.agrandar(10)}>Agrandar</button>
<div class="flex gap-2 items-center">
  <h4>Historial áreas: <span>{box.historialAreasAgrandadoBoton.join(', ')}</span></h4>
  <!-- Aquí, vemos que tenemos que hacer un structured clone, o crear nosotros un nuevo array -->
	<button aria-label="Actualizar historial" onclick={() => box.historialAreasAgrandadoBoton = [...box.historialAreasAgrandadoBoton]}>Actualizar historial</button>
  <!-- Cambia porque NO lo asignamos a la misma variable -->
  <button aria-label="Resetear" onclick={() => box.historialAreasAgrandadoBoton = []}>Resetear historial</button>
</div>

<hr>

<div
	class="box flex flex-col"
	style:width="{box.width}px"
	style:height="{box.height}px"
>
	<span>Área: {box.area}</span>
	<span>Perímetro: {box.perimetro}</span>
</div>

<style>
	label {
		display: flex;
		align-items: center;
	}

	hr {
		margin: 1em 0;
		border: none;
		border-bottom: 1px solid #888;
	}

	.box {
		background: radial-gradient(at 25% 25%, hsl(15 100 60), hsl(15 100 50)) ;
		border-radius: 2px;
    padding: 5px;
    color: white;
		filter: drop-shadow(0 0 10px hsl(15 100 50 / 0.3));
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
	}
</style>
