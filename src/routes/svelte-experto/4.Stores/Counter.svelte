<script>
	import { count } from './shared.ts';
</script>

<!-- Lo podemos hacer de 2 maneras con el writable: -->
<!-- <button onclick={() => count.update((n) => n + 1)}> Aquí, simplemente sería count++ -->
<button onclick={() => $count++}> <!-- Aquí, simplemente sería count++ -->
	clicks: {$count} <!-- Aquí, pondríamos simplemente count si fuera con $state -->
</button>
