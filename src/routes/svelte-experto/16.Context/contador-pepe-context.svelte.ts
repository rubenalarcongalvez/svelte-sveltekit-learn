/* URGENT: Esta sería la forma soportada de imitar un service en Angular */
import { getContext, setContext } from 'svelte';

class ContadorPepe {
	#nombre = 'El Pepe';
	public contador = $state(0);

	public get nombre(): string {
		return this.#nombre;
	}
}

// IMPORTANT: Función para inicializar (se llamará en el +layout.svelte o en el componente que queramos que sea el máximo)
export function setContextContadorPepe() {
	return setContext(ContadorPepe, new ContadorPepe());
}

// IMPORTANT: Función para obtener (se llamará en los componentes hijos)
export function getContextContadorPepe() {
	return getContext<ContadorPepe>(ContadorPepe);
}