//este archivo es para elegir que base de dato usar

export default function setdb() {
//Acá cambias el string por el nombre de "MongoDB" o "FileSystem"
  const selectedDB = "FileSystem";

  switch (selectedDB) {
    case "MongoDB":
      console.log ("usaremos el servidor de "+ selectedDB);
      return selectedDB
    case "FileSystem": 
    console.log ("usaremos el servidor de "+ selectedDB);
      return selectedDB
    default:
      console.log("Base de datos no válida");
  }}