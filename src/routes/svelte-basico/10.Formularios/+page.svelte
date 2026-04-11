<script lang="ts">
	import FormularioBasico from './FormularioBasico.svelte';
	import GroupInputs from './GroupInputs.svelte';
	import SelectMultiple from './SelectMultiple.svelte';

  let opciones = $state([
    'Formulario básico',
    'Group inputs',
    'Select múltiple'
  ]);
  let eleccion = $state(opciones[0]);
</script>

<nav class="flex gap-2 justify-center w-full">
  {#each opciones as opcion (opcion)}
    <button onclick={() => eleccion = opcion}>{opcion}</button>
  {/each}
</nav>

<br>

{#if eleccion == opciones[0]}
  <h1>{opciones[0]}</h1>
  <FormularioBasico/>  
  {:else if eleccion == opciones[1]}
  <h1>{opciones[1]}</h1>
  <GroupInputs/>
  {:else if eleccion == opciones[2]}
  <h1>{opciones[2]}</h1>
  <SelectMultiple/>
{/if}