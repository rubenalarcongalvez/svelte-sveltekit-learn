/* Solo es un ejemplo, que podemos interconectar "formularios" si queremos */
export function tamanoMinimo(nombre: string, tieneDNI: boolean = false) {
  return tieneDNI ? true : nombre?.length >= 12;
}