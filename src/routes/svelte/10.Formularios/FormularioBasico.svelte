<!-- IMPORTANT: Lo mejor para formularios complejos sería usar SuperForms (librería), pero solo si son muy complejos -->
<script lang="ts">
	import ErrorValidacion from "$lib/components/ErrorValidacion.svelte";
	import { tamanoMinimo } from "$lib/util/validadores.svelte";

  let dniHabilitado: boolean = $state(false);
	let person = $state({
    name: 'Pepe',
    edad: null,
    DNI: '',
    estadoCivil: 'soltero'
  });
  /* IMPORTANT: No hay nada nativo de validadores, pero lo podemos gestionar nosotros mismos */
  /* Podemos tenerlos tanto juntos como separados */
  let validadorNombreRequired = $derived(!!person?.name);
  let validadorEstadoCivilRequired = $derived(!!person?.estadoCivil);
  let validadorMaximo25 = $derived(person?.name.length <= 25);
  let validadorTamanoMinimo = $derived(tamanoMinimo(person?.name, !!person?.DNI));
  let validadorEdadMinima = $derived(person?.edad >= 16);
  let validadorEdadMaxima = $derived(person?.edad <= 30);

  /* Los que tengan su validador correcto, no debemos poner nada, para poder filtrarlos bien */
  let erroresValidacion = $derived([
    !validadorNombreRequired && 'El nombre es requerido',
    !validadorMaximo25 && 'El nombre no puede ser tan largo',
    !validadorTamanoMinimo && 'El nombre debe ser más largo o debes poner el DNI',
    !validadorEdadMinima && 'Debes tener al menos 16 años',
    !validadorEdadMaxima && 'Ya eres muy viejo, esto es para carnet joven (máximo 30 años)',
    !validadorEstadoCivilRequired && 'Debes poner tu estado civil'
  ].filter(Boolean) as string[]);

  let validadores = $derived(erroresValidacion.length === 0);
</script>

<!-- IMPORTANT: En lugar de usar value, usaremos binds. En este caso queremos asignar el valor a una variable que queramos. Lo podemos hacer incluso de objetos y un sub-atributo. También podemos ponerle estilo condicional para completar, pero ya a nuestra elección -->
<form class="flex items-center gap-2">
  <input bind:value={person.name} placeholder="Nombre"/>
  <!-- IMPORTANT: Si queremos directamente asignar booleanos, en lugar de bind:value, usaremos bind:checked -->
  <section class="flex items-center">
    <input type="checkbox" bind:checked={dniHabilitado} id="dniHabilitado" onchange={() => {
      if (!dniHabilitado) {
        person.DNI = '';
      }
    }}>
    <label for="dniHabilitado">DNI</label>
  </section>
  {#if dniHabilitado}
    <input bind:value={person.DNI} placeholder="DNI"/>
  {/if}
  <input bind:value={person.edad} placeholder="Edad" min="16" max="30" type="number"/>

  <!-- También podemos asignarlo a selects -->
  <select bind:value={person.estadoCivil}>
    <option value="casado">Casado</option>
    <option value="soltero">Soltero</option>
  </select>
</form>

{#if validadores}
  <h1>Hola {person.name || person.DNI}!</h1>
  {:else}
  <!-- IMPORTANT: Incluso podemos tener nuestro propio componente para errores de validacion -->
  {#each erroresValidacion as mensajeError, i (mensajeError)}
    <ErrorValidacion {mensajeError} numeroError={i + 1}/>
  {/each}
{/if}