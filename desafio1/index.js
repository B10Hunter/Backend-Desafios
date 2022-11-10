class Usario {
    constructor(nombre,apellido,libros=[], mascota=[]){
        this.nombre = nombre,
        this.apellido= apellido,
        this.libros = libros,
        this.mascota = mascota
    };
        getFullName() {
                console.log(`su nombre es ${this.nombre} y apellido es ${this.apellido}`)
            }
        addMascota(name){
                this.mascota.push(name);
            }
        countPets(){
                return this.mascota.length
            }
        addBook(nombre, author){
                this.libros.push({nombre : nombre, author : author});
                void this.libros
            }
        getBookNames(){
                let bookNames = [];
                this.libros.forEach(book => bookNames.push(book.nombre));
                return bookNames
            }
}

const usuario1 = new Usario ('Marcos','Rios')
console.warn('Nuevo usario creado')
console.log(usuario1)
console.warn('Nuevas mascotas agregadas')
usuario1.addMascota('Perro')
usuario1.addMascota('Gato')
usuario1.addMascota('Pez')
console.log(usuario1)
console.log(`Cantidad de mascotas : ${usuario1.countPets()}`)
console.warn('Nuevos Libros Agregados')
usuario1.addBook('Aprendiendo Javascript', 'Carlos Azaustre')
usuario1.addBook('Carlos Azaustre', 'Nicholas Zakas')
usuario1.addBook('Creando Progressive Web Apps', 'Tal Ater')
console.log(usuario1)
console.log(`Nombres de Libros agregados : ${usuario1.getBookNames()}`)