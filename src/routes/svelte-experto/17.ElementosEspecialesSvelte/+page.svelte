<script>
// @ts-nocheck
	import { fade } from "svelte/transition";
	import gatito from './gatito.png';
	import noPulses from './no-pulses.png';
	import fusionNucleo from './fusion-nucleo.gif';

	let key = $state();
	let keyCode = $state();
	let vecesClicado = $state(0);
	let scrollY = $state();
	let heightVisible = $state();
  let selection = $state('');
	let apareceGatito = $state(false);
	let fusionDelNucleo = $state(false);
	const opcionesSelectores = ['h1', 'p', 'marquee'];
	let indiceSelectorSeleccionado = $state(0);

	function alternarSelector() {
		++indiceSelectorSeleccionado;
		if (indiceSelectorSeleccionado >= 3) {
			indiceSelectorSeleccionado = 0;
		}
	}

	function onkeydown(event) {
		key = event.key;
		keyCode = event.keyCode;
	}

	function provocarFalloFusionNucleo() {
		if (fusionDelNucleo) {
			throw new Error('FUSION DEL NUCLEO ACTIVADA');
		}
	}

  const onselectionchange = (e) => {
		selection = document.getSelection().toString();
	};
</script>

<!-- IMPORTANT: Elemento <svelte:window/> Sirve para realizar las acciones que queramos en el elemento window (cualquier punto de la web). Tanto estilos globales, como location, screen, scroll, etc -->
<svelte:window {onkeydown} onclick={() => vecesClicado++} bind:scrollY={scrollY} onscroll={() => console.log(scrollY)} bind:innerHeight={heightVisible}/>
<!-- IMPORTANT: Elemento <svelte:document/> Sirve para realizar las acciones que queramos en base al document (que está dentro de window). Es para acciones más típicas del DOM (interacción DENTRO del HTML, eventos del mouse (excepto mouseenter y mouseleave que son del elemento body), etc) -->
<!-- Util para cosas como onselectionchange, que no se activa con window -->
<svelte:document {onselectionchange}/>
<!-- IMPORTANT: Elemento <svelte:body/> Sirve para realizar las acciones que queramos en base al body (que está dentro de document). Es para acciones dentro del elemento principal body que no se contemplen o no tengan selector css como onmouseenter y onmouseleave -->
<svelte:body onmouseenter={() => apareceGatito = true} onmouseleave={() => apareceGatito = false}/>
<!-- IMPORTANT: Elemento <svelte:head/> Sirve para cambiar o insertar NUEVAS cosas en el head, sin tener que modificar el index.html, y a nivel de componente -->
<svelte:head>
	<!-- Por ejemplo, le voy a cambiar el titulo a la página, aunque también podemos modificar la meta tag, stylesheet, link, etc. -->
	{#if apareceGatito}
		<title>Te veo</title> <!-- Vemos que en la pestaña, pone lo que dije al pasar por encima del body -->
		{:else}
		<title>Tutorial Sveltekit</title>
	{/if}
</svelte:head>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<div style="text-align: center">
  <p>Haz foco en la pantalla y escribe, haz click o scroll ya verás</p>
	{#if key}
		<kbd>{key === ' ' ? 'Space' : key}</kbd>
		<p>{keyCode}</p>
	{/if}

  <!-- URGENT: Si vecesClicado NO estuviera dentro de un span, al seleccionarlo, todo el p se actualizaría, deseleccionándolo. Un resultado NO esperado -->
  <p>Veces clicada la pantalla: <span>{vecesClicado}</span></p>

  {#if selection}
    <p>Selección subrayada: {selection}</p>
    {:else}
    <p>Subraya cualquier cosa</p>
  {/if}

  {#if scrollY > 1}
		<div transition:fade>
      <!-- IMPORTANT: Destruimos y volvemos a construir el elemento para que pueda hacer la transacción cuando queramos -->
			{#key scrollY > (heightVisible * 2)}
				<p class:!bg-red-500={scrollY > (heightVisible * 2)} class="fixed bottom-2" transition:fade>Estamos bajando a una profundidad de {Math.round(scrollY)}px</p>
			{/key}
		</div>
  {/if}

	<!-- IMPORTANT: Elemento <svelte:element/> Sirve para usar de modo condicional un elemento solo llamándolo por su nombre, pero sin poner mil condicionales -->
	<!-- También es una alternativa más elegante a @html, ya que este, no sobreescribe el elemento padre (innerHTML en Angular sí que lo sobreescribe) -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<!-- IMPORTANT: Además, se le puede poner eventos y lo que queramos mientras que con innerHTML, con lo de dentro, no. Además, no requiere sanitización -->
	<svelte:element this={opcionesSelectores[indiceSelectorSeleccionado]} onclick={alternarSelector} class="bg-amber-300! rounded! p-2! cursor-pointer">
		Púlsame y cambio de selector HTML :)
	</svelte:element>
	<!-- IMPORTANT: Elemento <svelte:boundary/> sirve para prevenir de que cuando pase un error dentro de nuestro selector, lo podamos controlar. Es simplemente algo preventivo mientras solucionamos algún bug. Básicamente un try-catch pero de HTML y descubrir el error -->
	<!-- URGENT: Se controla con snippet con funcion failed y con onerror -->
	<svelte:boundary onerror={(err) => console.error(err)}>
		{provocarFalloFusionNucleo()}
		<div
			class="relative cursor-pointer"
			role="button"
			tabindex="0"
			onclick={() => fusionDelNucleo = true}
		>
			<img src={noPulses} alt="No pulses botón fusión del núcleo">
			<p class="absolute bottom-0">No pulses botón: FUSION DEL NÚCLEO</p>
		</div>

		{#snippet failed(error, reset)} <!-- IMPORTANT: Con error, podemos leer el error y con reset, resetearlo hasta donde estaba seguro -->
			<div class="relative" transition:fade>
				<img src={fusionNucleo} alt={error.message} title={error.message}>
				<button class="absolute bottom-0" onclick={() => {
					fusionDelNucleo = false;
					reset();
				}}>Resetear</button>
			</div>
		{/snippet}
	</svelte:boundary>
</div>

<img
	class="gatito"
	class:curious={apareceGatito}
	alt="Hola gatito"
	src={gatito}
/>

<style>
  p {
		background-color: rgb(31 41 55);
		color: rgb(255 255 255);
		padding: 0.5rem;
		border-radius: 0.25rem;
  }

	div {
		display: flex;
		height: 100%;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}

	kbd {
		border-radius: 4px;
		font-size: 6em;
		padding: 0.2em 0.5em;
		background-color: #eeeeee;
		border-top: 5px solid #f9f9f9;
		border-left: 5px solid #f9f9f9;
		border-right: 5px solid #aaaaaa;
		border-bottom: 5px solid #aaaaaa;
		color: #555;
	}

  :global(body) {
		height: 400vw;
		background: url(./deepsea.webp); /* IMPORTANT: Hemos puesto de background una imagen que ocupe mucho de la pantalla, para poder hacer scroll */
		background-size: cover;
	}

	.gatito {
		position: fixed;
		left: 0;
		bottom: -60px;
		transform: translate(-80%, 0) rotate(-15deg);
		transform-origin: 100% 100%;
		transition: transform 0.4s;
	}

	.curious {
		transform: translate(-15%, 0) rotate(0deg);
	}
</style>
