<script lang="ts">
	import InfoPaquete from './InfoPaquete.svelte';

  const {version, ...pkg} = {
		name: 'svelte',
		version: '5.0',
		description: 'súper rápido',
		website: 'https://svelte.dev'
	};
</script>

<!-- Lo llamamos de esta manera, como cualquier etiqueta y le damos el valor -->
<InfoPaquete /> <!-- En este, vemos que actúa el prop predeterminado que pusimos -->
<!-- Podemos pasarle los argumentos como queramos -->
<InfoPaquete 
  name={pkg.name}
  {version}
  description={pkg.description}
  website={pkg.website}
/>
<!-- De esta manera también es válido -->
<InfoPaquete {...pkg} {version}/>
