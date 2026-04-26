<!-- IMPORTANT: El contenido está en TodoList.svelte -->
<script>
	import TodoList from './TodoList.svelte';

	const todos = $state([
		{ id: 1, done: false, description: 'preparar la presentación del lunes' },
		{ id: 2, done: false, description: 'escribir ideas para el próximo vídeo' },
		{ id: 3, done: true, description: 'comprar fruta para la semana' },
		{ id: 4, done: false, description: 'ordenar el escritorio' },
		{ id: 5, done: false, description: 'regar las plantas del balcón' },
		{ id: 6, done: false, description: 'revisar mensajes pendientes' }
	]);

	let uid = todos.length + 1;

	function remove(todo) {
		const index = todos.indexOf(todo);
		todos.splice(index, 1);
	}
</script>

<div class="board">
	<input
		placeholder="Añade cualquier cosa"
		onkeydown={(e) => {
			if (e.key !== 'Enter') return;

			todos.push({
				id: uid++,
				done: false,
				description: e.currentTarget.value
			});

			e.currentTarget.value = '';
		}}
	/>

	<div class="todo">
		<h2>TO-DO</h2>
		<TodoList todos={todos.filter((t) => !t.done)} {remove} />
	</div>

	<div class="done">
		<h2>HECHO</h2>
		<TodoList todos={todos.filter((t) => t.done)} {remove} />
	</div>
</div>

<style>
	.board {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-column-gap: 1em;
		max-width: 36em;
		margin: 0 auto;
	}

	.board > input {
		font-size: 1.4em;
		grid-column: 1/3;
		padding: 0.5em;
		margin: 0 0 1rem 0;
	}

	h2 {
		font-size: 2em;
		font-weight: 200;
	}
</style>
