<!-- IMPORTANT: Las runas, a diferencia de Angular, no se llaman como una función, sino que son considerados algo como variables. No usaremos los () para llamar al valor -->

<script lang="ts">
	let countSinRuna = 0;
	let countConRuna = $state(0);

	function incrementarSinRuna() {
		countSinRuna++;
	}
	function incrementarConRuna(veces: number = 1) {
    /* IMPORTANT: Como vemos, solo hace falta declararlo con $state para que actue como una variable normal que escucha cambios, a diferencia de Angular, que podemos usar .set o .update */
		countConRuna += veces;
	}
  
	/* IMPORTANT: MUY IMPORTANTE: En Svelte, las runas actualizan de forma profunda los objetos, por lo que no hay que actualizar el objeto entero como en Angular o hacer structuredClone. Simplemente cambiamos la propiedad y listo. Esto se ve muy claro con los arrays. Si lo mismo, usamos un effect, dicho effect no sentirá el cambio en Angular a no ser que usemos update pero sí en Svelte */
	let arrayMutable: number[] = $state([1, 2]);
  /* IMPORTANT: También podemos hacer algo como el computed de Angular. En Svelte, se llama $derived. En base a otras runas, actualiza su valor de forma automática */
  /* Esta es la forma inline */
  // const totalArray: number = $derived(arrayMutable.reduce((t, n) => t + n, 0));
  /* Esta es la forma de bloque (con by) */
  const totalArray: number = $derived.by(() => {
    return arrayMutable.reduce((t, n) => t + n, 0)
  });

	function anadirNumero() {
		arrayMutable.push(arrayMutable.length + 1);
    /* Recordemos que las runas son proxies. Si queremos ver solo el valor y no la proxy, debemos llamarlo de esta manera */
    console.log($state.snapshot(arrayMutable));
	}

  /* IMPORTANT: También podemos hacer que cada vez que se actualice el valor en cualquier sitio, nos arroje el console.log de nuestra runa con $inspect */
  /* Esto, cuando lo subamos a producción, se quitará automáticamente sin necesidad de tener que quitarlo nosotros mismos como con el console.log normal */
  /* .with recibe primero 'init' | 'update', luego el snapshot del valor (puede ser varios args) */
  $inspect(arrayMutable).with((tipo, ...snapshot) => {
    /* El tipo no me interesa verlo, pero se puede obtener */
    console.log(`[${snapshot?.join(', ')}]`);
  });

  /* IMPORTANT: Lo mismo que el effect de Angular, cuando cambia cualquier runa de dentro, realiza la acción */
  let numeroCreciente: number = $state(0);
  let intervalo: number = $state(1000);
  $effect(() => { // IMPORTANT: MUY IMPORTANTE: Los effects no se accionaran hasta llegar al navegador del usuario (no cuando estemos sirviendo el SSR)
    const idIntervalo = setInterval(() => {
      numeroCreciente += 1;
    }, intervalo);

    /* IMPORTANT: Cuando queramos ejecutar una función de limpieza al acabar el effect, usaremos lo siguiente: */
    return () => {
      /* Si no ponemos esto, no podremos bajar la velocidad ya que no se resetearía el intervalo anterior y crearía uno nuevo */
      clearInterval(idIntervalo);
    };
  });
</script>

<!-- IMPORTANT: Vemos que el que no se declaró con runa (como las signals en Angular), no se actualiza -->
<p class="text-lg"><b>Botón clicado sin runa:</b> {countSinRuna} {countSinRuna === 1 ? 'vez' : 'veces'}. Solo cambia al actualizar el DOM (por ejemplo cuando se ejecuta otro state)</p>
<p class="text-lg"><b>Botón clicado con runa:</b> {countConRuna} {countConRuna === 1 ? 'vez' : 'veces'}</p>

<!-- Recordemos que las funciones se usan como en JS, sin parentesis, y si tiene parametros, usamos lambda  -->
<button onclick={incrementarSinRuna}>
	Incrementar sin runa
</button>
<button onclick={() => incrementarConRuna()}>
	Incrementar con runa ($state)
</button>
<button onclick={() => incrementarConRuna(3)}>
	Incrementar con runa ($state) 3 veces
</button>

<hr>

<section>
  <p class="text-lg">
    <b>Array mutable con runa: </b>
    <span>{arrayMutable?.join(' + ') || 0} = {totalArray}</span>
  </p>
</section>

<button onclick={anadirNumero}>
  Añadir número siguiente en el array
</button>

<hr>

<section>
  <p class="text-lg">
    <b>Número creciente: </b>
    <span>{numeroCreciente}</span>
  </p>
</section>

<button onclick={() => intervalo /= 2}>
  Subir rapidez
</button>
<button onclick={() => intervalo *= 2}>
  Bajar rapidez
</button>