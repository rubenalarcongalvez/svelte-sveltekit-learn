export async function roll() {
	// Obtener un número aleatorio del 1 al 6
  // (con una pausa, para que podamos verlo)
	return new Promise((fulfil, reject) => {
		setTimeout(() => {
      // simular una red inestable
			if (Math.random() < 0.3) {
				reject(new Error('Request failed'));
				return;
			}

			fulfil(Math.floor(Math.random() * 6) + 1);
		}, 1000);
	});
}
