
//Se hace llamado al archivo de datos a la constante datafile
const datafile = require('./data.js');
//console.log(datafile);

//Se crea el array llamado "arraydata" este array contendra la informacion del archivo data.js se usa el split para la separacion por cada salto de linea.
let arraydata = [];
arraydata = datafile.split("\n");
//console.log(arraydata);


//Se filtra de los objetos del array "arraydata" solo aquellos que contienen la palabra FlexBox, estos datos filtrados se guardan en un array nuevo llamado "arraydataflexbox".
const textToSearch = 'Flexbox';
let arraydataflexbox = [];
arraydataflexbox = arraydata.filter(arraydata => arraydata.includes(textToSearch));
//console.log(arraydataflexbox);

//Armado de array que contiene los tiempos de duracion de los videos FlexBox en crudo
let arraytiempos = [];
arraytiempos = arraydataflexbox.map(function (arraydataflexbox) {
    return arraydataflexbox.split("<li data-time=")[1]
            .split(">")[0]
            .split("\"")[1];
});
//console.log(arraytiempos);

//A partir array con los tiempos en crudo se arma un array que contiene los minutos y se los multiplica por 60 para pasarlos a segundos
let arrayminutos = [];
arrayminutos = arraytiempos.reduce((sum,string) => arraytiempos.map(function (arraytiempos) {
    return arraytiempos.split(":")[0]*60
}));
//console.log(arrayminutos);

//A partir del array con los tiempos en crudo se arma un array que contiene los segundos
let arraysegundos = [];
arraysegundos = arraytiempos.reduce((sum,string) => arraytiempos.map(function (arraytiempos) {
    return arraytiempos.split(":").map(n => parseInt(n))[1];
}));
//console.log(arraysegundos);

//Se contactenan los array de minutos (convertidos a segundos) y segundos y se forma un unico array.
let arrayacumulado = arrayminutos.concat(arraysegundos);
//console.log(arrayacumulado);

//Suma de todos los datos del array generado en el paso anterior dando como resultado la duracion total de los videos tipo FlexBox.
let totalduracionflexbox = arrayacumulado.reduce((acumulado, actual) => acumulado + actual);

console.log("La duracion total del video tipo FlexBox registrado en el archivo data.js en segundos es de:");
console.log(totalduracionflexbox + " segundos");



    



