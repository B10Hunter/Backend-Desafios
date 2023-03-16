 const ramdoms = (cant) =>{
    const randoms = Array.from({length : cant}, () => Math.floor(Math.random()* 1001))
    const res = {}
    for (const num of randoms){
        res[num] = res[num] ? res[num]+1 : 1
    }
    return res
  }


process.on('message', (cant) => {
   const number = ramdoms(cant)

    process.send( number);
  });
  
