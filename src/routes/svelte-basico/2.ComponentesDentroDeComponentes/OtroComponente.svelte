<script lang="ts">
	import { Contador, contadorService } from "./Contador.svelte";

  /* Añadimos a contadorService para que se refleje en todos lados */
  ++contadorService.cuenta;

  let contadorNuevo = new Contador();
  ++contadorNuevo.cuenta; /* Esto no sumará nada en el componente padre, ya que lo hemos vuelto a crear aquí */
</script>

<p class="ejemplo-style-global">Este párrafo no es afectado por el estilo del componente padre. Solo puede ser afectado por el estilo general (<code>layout.css</code>)</p>