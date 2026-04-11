<script>
	import { messages } from "./loading-messages";
	import { typewriter } from "./transition";

	let i = $state(-1);

	$effect(() => {
		const interval = setInterval(() => {
			i += 1;
			i %= messages.length;
		}, 2500);

		return () => {
			clearInterval(interval);
		};
	});
</script>

<h1>loading...</h1>

<!-- IMPORTANT: Englobar en #key (y relacionar) el estado, hará que la transición cada vez que el estado (i, el $state) se actualice -->
<!-- Esto no es tan bueno en eficiencia, por lo que no sería tan bueno abusar de esto -->
{#key i}
  <p in:typewriter={{ speed: 10 }}>
    {messages[i] || ''}
  </p>
{/key}
