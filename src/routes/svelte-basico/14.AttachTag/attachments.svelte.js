import { on } from 'svelte/events';

/* IMPORTANT: Usamos el nodo (elemento al que hacemos el @attach) como elemento HTML */
export function trapFocus(node) {
	const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;

	function focusable() {
		return Array.from(node.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'));
	}

	function handleKeydown(event) {
		if (event.key !== 'Tab') return;

		const current = document.activeElement;

		const elements = focusable();
		const first = elements.at(0);
		const last = elements.at(-1)

		if (event.shiftKey && current === first) {
			last.focus();
			event.preventDefault();
		}

		if (!event.shiftKey && current === last) {
			first.focus();
			event.preventDefault();
		}
	}

	focusable()[0]?.focus();
	/* IMPORTANT: Añadimos un eventListener (el on ya crea el eventListener pero devolviendo el resultado para que podamos hacer cleanup) */
	/* Le pasamos el nodo HTML, el evento que queremos que ejecute la acción y la acción que queramos */
	const off = on(node, 'keydown', handleKeydown);

	/* Por último, necesitamos hacer el cleanup, por lo que devolvemos el resultado del eventListener y devolvemos el focus al anterior elemento en el que estábamos */
	return () => {
		off();
		previous.focus();
	};
}
