// Separamos la lógica de negocio en una clase reactiva pura
export class Contador {
    // Usamos la Runa $state para hacer la variable reactiva
    cuenta = $state(1);
    
    // $derived se actualiza automáticamente cuando cambia 'cuenta'
    doble = $derived(this.cuenta * 2);

    incrementar() {
        this.cuenta++;
    }
}

/* IMPORTANT: De esta forma, podemos conservar y compartir esto, como si fuera un service */
export const contadorService: Contador = new Contador(); // URGENT: Esto es muy peligroso si usamos SSR, por lo que no es recomendable, y en su lugar, mejor usar setContext y getContext