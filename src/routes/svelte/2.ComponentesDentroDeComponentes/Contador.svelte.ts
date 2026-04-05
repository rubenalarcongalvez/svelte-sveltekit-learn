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