<script>
	import { flip } from "svelte/animate";
	import { receive, send } from "./transition";

	let { todos, remove } = $props();
</script>

<ul class="todos">
	{#each todos as todo (todo.id)}
		<li
			class={{ done: todo.done }}
      // IMPORTANT: Gracias a recieve y send, podemos poner la transición de cuando un elemento se añade o se quita de una lista
      in:receive={{ key: todo.id }}
	    out:send={{ key: todo.id }}
      animate:flip={{ duration: 200 }} // IMPORTANT: Gracias a animate:flip, podemos hacer que cuando un elemento cambie de posición, transicione. También podemos crear nuestra propia transición para animate
		>
			<label>
				<input type="checkbox" bind:checked={todo.done}/>
				<span>{todo.description}</span>
				<button onclick={() => remove(todo)} aria-label="Remove"></button>
			</label>
		</li>
	{/each}
</ul>

<style>
	label {
		width: 100%;
		height: 100%;
		display: flex;
	}

	span {
		flex: 1;
	}

	button {
		background: url(./remove.svg) no-repeat;
    border: none;
    cursor: pointer;
	}
</style>
