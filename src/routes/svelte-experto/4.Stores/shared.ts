import { writable } from 'svelte/store';

export const count = writable(0); // IMPORTANT: Aquí, simplemente hubiéramos puesto $state(0) y listo, sin importar nada