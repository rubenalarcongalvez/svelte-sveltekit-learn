<script>
	const emojis = {
		apple: '🍎',
		banana: '🍌',
		carrot: '🥕',
		doughnut: '🍩',
		egg: '🥚'
	};

  // `name` se actualiza cada vez que cambia el valor de la prop...
	let { name } = $props();

  // ...pero `emoji` se fija en la inicialización, por lo que si no se actualiza bien, el DOM perderá coherencia
  // Por eso debemos poner siempre la key a un bucle
  const emoji = emojis[name];
</script>

<p>{emoji} = {name}</p>
