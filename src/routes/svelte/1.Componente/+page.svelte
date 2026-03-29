<!-- Podemos separar el ts, de esta forma -->
<script lang="ts">
  /* IMPORTANT: De esta forma podemos enlazar las imágenes, que deben estar en la carpeta static, ya que es la ruta por defecto */
  let nombreSaludar: string = 'Caracola';
  let rutaImagenOjo: string = '/images/1-componente/imagen-ojo.png';
  let src: string = '/images/1-componente/rick.png'; // Si ponemos por ejemplo el mismo nombre a la variable que la directiva que usaremos, lo podemos usar directamente
  let name: string = 'Rick Astley';

  /* Al igual que antes, podemos poner el mismo nombre a la variable que la directiva que usaremos */
  let width: number = 500;
  let height: number = 400;
</script>

<!-- Podemos separar el css, de esta forma -->
<style>
  h1 {
    color: darkblue;
    text-align: center;
  }
  img {
    border-radius: 5px;
  }
</style>

<!-- Podemos separar el HTML (por defecto, sin poner nada) -->
<!-- IMPORTANT: Podemos llamar al TS, mediante {} en nuestro HTML -->
<h1>Hola {nombreSaludar.toUpperCase() + ', ¿cómo estás?'}</h1>
<!-- IMPORTANT: Lo podemos llamar directamente si la propiedad tiene el mismo nombre que la directiva. Si no, usaremos el = -->
<img src={rutaImagenOjo} alt="Ojo en color" {width} {height}/>
<img {src} alt="{name} el bailongo." {width} {height}/>
