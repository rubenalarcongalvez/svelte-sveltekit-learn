<script>
	import AudioPlayer from './AudioPlayer.svelte';
	import { tracks } from './tracks.js';
</script>

<div class="centered">
	{#each tracks as track (track)}
    <!-- IMPORTANT: Mirar dentro del componente -->
		<AudioPlayer {...track} />
	{/each}

  <!-- IMPORTANT: Todo lo que se puede usar -->
	<section class="info">
		<p>
			El conjunto completo de bindings para <code>&lt;audio&gt;</code> y <code>&lt;video&gt;</code> es el
			siguiente:
		</p>

		<p><strong>Siete bindings de solo lectura:</strong></p>
		<ul>
			<li>
				<code>duration</code>: la duración total del audio o vídeo, en segundos. Sirve para
				mostrar la longitud completa del medio o calcular el progreso.
			</li>
			<li>
				<code>buffered</code>: un array de objetos <code>{`{ start, end }`}</code> con los tramos ya
				cargados en memoria. Sirve para pintar la barra de buffer y saber qué partes se
				pueden reproducir sin esperar.
			</li>
			<li>
				<code>seekable</code>: un array de tramos a los que el usuario puede saltar ahora mismo.
				Se parece a <code>buffered</code>, pero no significa exactamente lo mismo: indica hasta dónde se
				puede hacer seek, aunque alguna zona no esté totalmente precargada.
			</li>
			<li>
				<code>played</code>: un array de tramos que ya se han reproducido. Sirve para analítica,
				para mostrar cuánto contenido se ha consumido o para interfaces más avanzadas de
				progreso.
			</li>
			<li>
				<code>seeking</code>: valor booleano que indica si el usuario o el código están moviendo el
				cabezal a otro punto del medio. Es útil para mostrar estados de transición o evitar
				ciertas actualizaciones mientras se busca una posición nueva.
			</li>
			<li>
				<code>ended</code>: valor booleano que indica si la reproducción ya ha terminado. Sirve para
				mostrar un botón de reinicio, pasar a la siguiente pista o cambiar el estado de la UI.
			</li>
			<li>
				<code>readyState</code>: un número entre 0 y 4 que indica cuánto del medio está listo para
				reproducirse. En la práctica, sirve para saber si aún no hay datos, si ya hay
				metadatos cargados, si se puede reproducir el siguiente frame o si el navegador cree
				que puede reproducirlo casi sin interrupciones.
			</li>
		</ul>

		<p><strong>Cinco bindings bidireccionales:</strong></p>
		<ul>
			<li>
				<code>currentTime</code>: la posición actual del cabezal, en segundos. Sirve para mostrar el
				tiempo transcurrido, sincronizar una barra de progreso o saltar a un punto concreto.
			</li>
			<li>
				<code>playbackRate</code>: acelera o ralentiza la reproducción; <code>1</code> es lo normal. Es útil
				para controles de velocidad como <code>1.25x</code>, <code>1.5x</code> o <code>2x</code>.
			</li>
			<li>
				<code>paused</code>: indica si el medio está en pausa. Sirve para sincronizar botones como
				Play/Pause o reaccionar desde fuera del elemento de audio.
			</li>
			<li>
				<code>volume</code>: un valor entre 0 y 1. Se usa para sliders de volumen o para fijar un
				nivel inicial de reproducción.
			</li>
			<li>
				<code>muted</code>: un valor booleano donde <code>true</code> significa silenciado. Sirve para el botón
				de mute y para desactivar el sonido sin perder el valor anterior del volumen.
			</li>
		</ul>

		<p>
			Los vídeos además tienen los bindings de solo lectura <code>videoWidth</code> y
			<code>videoHeight</code>, que sirven para conocer el tamaño real del vídeo cargado y adaptar la
			interfaz o el lienzo a sus dimensiones nativas.
		</p>
	</section>
</div>

<style>
	.centered {
		display: flex;
		flex-direction: column;
		height: 100%;
		justify-content: center;
		gap: 0.5em;
		max-width: 40em;
		margin: 0 auto;
	}
  code {
    background-color: gray;
    color: white;
    border-radius: 5px;
    padding: 5px;
  }

	.info {
		margin-top: 1rem;
		line-height: 1.6;
	}

	.info ul {
		padding-left: 1.5rem;
		margin: 0.5rem 0 1rem;
	}

	.info p {
		margin: 0.5rem 0;
	}
</style>