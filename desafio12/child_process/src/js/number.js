 const ramdoms = (cant) =>{
    const resultados = {};
    for (let i = 0; i < cant; i++) {
      const numero = Math.floor(Math.random() * 1000) + 1;
      resultados[numero] = (resultados[numero] || 0) + 1;
    }
    return resultados;
  }


process.on('message', (cant) => {
   

    process.send( cant);
  });
  
