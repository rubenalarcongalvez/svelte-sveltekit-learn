<!-- IMPORTANT: Svelte tiene transiciones (transition:) e in: out: que podemos usar facilmente -->
<script>
	import { blur, crossfade, draw, fade, fly, scale, slide } from "svelte/transition";

	/* Estado independiente por elemento (transition:) */
	let showFade = $state(true);
	let showFly = $state(true);
	let showSlide = $state(true);
	let showScale = $state(true);
	let showBlur = $state(true);
	let showDraw = $state(true);

	/* Estado independiente por elemento (in:/out:) */
	let showInOutFade = $state(true);
	let showInOutFly = $state(true);
	let showInOutSlide = $state(true);
	let showInOutScale = $state(true);
	let showInOutBlur = $state(true);
	let showInOutDraw = $state(true);

	/* Estado para mover el chip de crossfade entre columnas */
	let leftSide = $state(true);

	/* Crossfade devuelve send/receive para animar entre dos posiciones */
	const [send, receive] = crossfade({
		duration: 350,
		fallback: (node) => fade(node, { duration: 250 })
	});
</script>

<h1>Transitions en Svelte</h1>

<!-- IMPORTANT: Podemos usar transition: para hacer transiciones -->
<h2>transition:</h2>

{#if showFade}
  <button type="button" class="box" transition:fade onclick={() => (showFade = false)}>fade (click)</button>
{:else}
  <button class="ghost" onclick={() => (showFade = true)}>Mostrar fade</button>
{/if}

{#if showFly}
  <!-- IMPORTANT: También le podemos añadir parámetros a las transiciones -->
  <button type="button" class="box" transition:fly={{ x: 40, duration: 2000 }} onclick={() => (showFly = false)}>fly (click)</button>
{:else}
  <button class="ghost" onclick={() => (showFly = true)}>Mostrar fly</button>
{/if}

{#if showSlide}
  <button type="button" class="box" transition:slide={{ duration: 300 }} onclick={() => (showSlide = false)}>slide (click)</button>
{:else}
  <button class="ghost" onclick={() => (showSlide = true)}>Mostrar slide</button>
{/if}

{#if showScale}
  <button type="button" class="box" transition:scale={{ start: 0.6, duration: 300 }} onclick={() => (showScale = false)}>scale (click)</button>
{:else}
  <button class="ghost" onclick={() => (showScale = true)}>Mostrar scale</button>
{/if}

{#if showBlur}
  <button type="button" class="box" transition:blur={{ amount: 8, duration: 300 }} onclick={() => (showBlur = false)}>blur (click)</button>
{:else}
  <button class="ghost" onclick={() => (showBlur = true)}>Mostrar blur</button>
{/if}

{#if showDraw}
  <button type="button" class="icon-button" aria-label="Ocultar draw transition" onclick={() => (showDraw = false)}>
    <svg class="signature" viewBox="0 0 220 70" aria-label="draw transition">
      <path
        d="M10,50 C45,10 80,10 110,50 C140,10 175,10 210,50"
        fill="none"
        stroke="currentColor"
        stroke-width="4"
        stroke-linecap="round"
        transition:draw={{ duration: 700 }}
      />
    </svg>
  </button>
{:else}
  <button class="ghost" onclick={() => (showDraw = true)}>Mostrar draw</button>
{/if}

<!-- IMPORTANT: También podemos diferenciar cuándo sale y cuándo entra en la transición con in: y out: -->
<h2>in: / out:</h2>

{#if showInOutFade}
  <button type="button" class="box" in:fade={{ duration: 150 }} out:fade={{ duration: 600 }} onclick={() => (showInOutFade = false)}>fade in/out (click)</button>
{:else}
  <button class="ghost" onclick={() => (showInOutFade = true)}>Mostrar fade in/out</button>
{/if}

{#if showInOutFly}
  <button type="button" class="box" in:fly={{ y: 30, duration: 150 }} out:fly={{ y: -30, duration: 600 }} onclick={() => (showInOutFly = false)}>fly in/out (click)</button>
{:else}
  <button class="ghost" onclick={() => (showInOutFly = true)}>Mostrar fly in/out</button>
{/if}

{#if showInOutSlide}
  <button type="button" class="box" in:slide={{ duration: 150 }} out:slide={{ duration: 600 }} onclick={() => (showInOutSlide = false)}>slide in/out (click)</button>
{:else}
  <button class="ghost" onclick={() => (showInOutSlide = true)}>Mostrar slide in/out</button>
{/if}

{#if showInOutScale}
  <button type="button" class="box" in:scale={{ start: 0.8, duration: 150 }} out:scale={{ start: 1, duration: 600 }} onclick={() => (showInOutScale = false)}>scale in/out (click)</button>
{:else}
  <button class="ghost" onclick={() => (showInOutScale = true)}>Mostrar scale in/out</button>
{/if}

{#if showInOutBlur}
  <button type="button" class="box" in:blur={{ amount: 3, duration: 150 }} out:blur={{ amount: 10, duration: 600 }} onclick={() => (showInOutBlur = false)}>blur in/out (click)</button>
{:else}
  <button class="ghost" onclick={() => (showInOutBlur = true)}>Mostrar blur in/out</button>
{/if}

{#if showInOutDraw}
  <button type="button" class="icon-button" aria-label="Ocultar draw in out" onclick={() => (showInOutDraw = false)}>
    <svg class="signature" viewBox="0 0 220 70" aria-label="draw in and out">
      <path
        d="M10,50 C45,10 80,10 110,50 C140,10 175,10 210,50"
        fill="none"
        stroke="currentColor"
        stroke-width="4"
        stroke-linecap="round"
        in:draw={{ duration: 200 }}
        out:draw={{ duration: 900 }}
      />
    </svg>
  </button>
{:else}
  <button class="ghost" onclick={() => (showInOutDraw = true)}>Mostrar draw in/out</button>
{/if}

<h2>crossfade</h2>
<div class="columns">
	<div class="column">
		{#if leftSide}
			<button type="button" class="chip" in:receive={{ key: "item" }} out:send={{ key: "item" }} onclick={() => (leftSide = false)}>Item (click)</button>
		{/if}
	</div>
	<div class="column">
		{#if !leftSide}
			<button type="button" class="chip" in:receive={{ key: "item" }} out:send={{ key: "item" }} onclick={() => (leftSide = true)}>Item (click)</button>
		{/if}
	</div>
</div>

<style>
	h1 {
		font-size: 1.5rem;
		margin: 0 0 0.5rem;
	}

	h2 {
		margin: 1.25rem 0 0.5rem;
		font-size: 1.1rem;
	}

	.box {
		padding: 0.4rem 0.7rem;
		margin: 0.35rem 0;
		background: #eef3ff;
		border: 1px solid #c7d3f8;
		border-radius: 0.45rem;
		max-width: 18rem;
		cursor: pointer;
		text-align: left;
	}

	.signature {
		display: block;
		width: 220px;
		height: 70px;
		margin: 0.5rem 0;
		color: #1f3f99;
	}

	.columns {
		display: grid;
		grid-template-columns: repeat(2, minmax(120px, 1fr));
		gap: 1rem;
		max-width: 320px;
	}

	.column {
		min-height: 52px;
		padding: 0.6rem;
		border: 1px dashed #9fb1e6;
		border-radius: 0.45rem;
	}

	.chip {
		display: inline-block;
		padding: 0.3rem 0.6rem;
		background: #173f99;
		color: #fff;
		border-radius: 999px;
		cursor: pointer;
	}

	.icon-button {
		border: 0;
		background: transparent;
		padding: 0;
		cursor: pointer;
	}

	.ghost {
		margin: 0.35rem 0;
		padding: 0.35rem 0.6rem;
		border: 1px dashed #91a8e8;
		background: #f7f9ff;
		border-radius: 0.45rem;
		cursor: pointer;
	}
</style>
