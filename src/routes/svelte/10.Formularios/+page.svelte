<!-- URGENT: Aún me queda aquí por hacer siguientes -->
<a href="https://svelte.dev/tutorial/svelte/numeric-inputs">Voy por aquí</a>

<!-- IMPORTANT: Lo mejor para formularios complejos sería usar SuperForms (librería), pero solo si son muy complejos -->
<script lang="ts">
	import ErrorValidacion from "$lib/components/ErrorValidacion.svelte";
	import { tamanoMinimo } from "$lib/util/validadores.svelte";

	let person = $state({
    name: 'Pepe',
    DNI: ''
  });
  /* IMPORTANT: No hay nada nativo de validadores, pero lo podemos gestionar nosotros mismos */
  /* Podemos tenerlos tanto juntos como separados */
  let validadorRequired = $derived(!!person?.name);
  let validadorMaximo25 = $derived(person?.name.length <= 25);
  let validadorTamanoMinimo = $derived(tamanoMinimo(person?.name, !!person?.DNI));

  /* Los que tengan su validador correcto, no debemos poner nada, para poder filtrarlos bien */
  let erroresValidacion = $derived([
    !validadorRequired && 'El nombre es requerido',
    !validadorMaximo25 && 'El nombre no puede ser tan largo',
    !validadorTamanoMinimo && 'El nombre debe ser más largo o debes poner el DNI'
  ].filter(Boolean) as string[]);

  let validadores = $derived(erroresValidacion.length === 0);
</script>

<!-- IMPORTANT: En lugar de usar value, usaremos binds. En este caso queremos asignar el valor a una variable que queramos. Lo podemos hacer incluso de objetos y un sub-atributo. También podemos ponerle estilo condicional para completar, pero ya a nuestra elección -->
<input bind:value={person.name} placeholder="Nombre"/>

{#if validadores}
  <h1>Hola {person.name || person.DNI}!</h1>
  {:else}
  <!-- IMPORTANT: Incluso podemos tener nuestro propio componente para errores de validacion -->
  {#each erroresValidacion as mensajeError, i (mensajeError)}
    <ErrorValidacion {mensajeError} numeroError={i + 1}/>
  {/each}
{/if}
