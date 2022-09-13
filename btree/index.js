const fs = require('fs');
const readline = require('readline');
const { ArbolB } = require("./btree");

(async function () {
  var arbol = new ArbolB(3, ['name', 'dpi']);

  const fileStream = fs.createReadStream('input.csv');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    const elements = line.split(";");
    let json = elements[1];
    json = JSON.parse(json);
    if(elements[0] === "INSERT"){
      arbol.insertar(json);
    }
    else if (elements[0] === "PATCH"){
      arbol.actualizar(json);
    }
    else {
        arbol.eliminar(json);
    }
  };

  // arbol.imprimir();
  var buscar1 = JSON.stringify(arbol.buscarPorLlave({ name: 'diego' }));
  console.log('buscar name: diego', buscar1);
  

  var buscar2 = arbol.buscarPorLlave({ name: 'nicholas' });
  console.log('buscar name: nicholas', JSON.stringify(buscar2));
  const outStream = fs.createWriteStream('./outputs/salida.csv');
  for (var idx = 0; idx < buscar2.length; idx++) {
    outStream.write(JSON.stringify(buscar2[idx]));
    outStream.write('\n\r');
  }
  outStream.close();

  var buscar3 = JSON.stringify(arbol.buscarPorLlave({ name: 'shaylee' }));
  console.log('buscar name: shaylee', buscar3);


  var descargar = arbol.descargarArbol();
  const arbolcsv = fs.createWriteStream('./outputs/arbol.csv');
  for (var idx = 0; idx < descargar.length; idx++) {
    arbolcsv.write(JSON.stringify(descargar[idx]));
    arbolcsv.write('\n');
  }
  arbolcsv.close();
  // recomendaciones para buscar por nombres y apellidos
  // - agregar un campo en el json que se llame "apellidos" al buscar (buscarPorLlave) listaría los que tienen dicho apellido
  // - si en name se coloca nombre y apellido la busqueda se debe modificar cambiando igual por include
})();