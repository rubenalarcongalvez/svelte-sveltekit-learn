/* El nombre del archivo siempre será .svelte.EXTENSIÓN para que pueda obtener las funciones de svelte */

/* IMPORTANT: Muy importante: Para poder aquí mutar objetos y demás, no podemos directamente cambiar si fuera let counter = $state(0). Es por eso que exportamos SIEMPRE constantes, y solo cambiamos propiedades dentro del objeto */
export const counter = $state({
	count: 0
});
