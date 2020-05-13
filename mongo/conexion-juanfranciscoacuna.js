const mongoclient = require('mongodb').MongoClient;
const chalk = require('chalk');

const uri = "mongodb+srv://admin:betp2@cluster0-zdy6w.mongodb.net/test?retryWrites=true&w=majority";
const client = new mongoclient(uri, {useNewUrlParser:true, useUnifiedTopology:true});

client.connect((err, result) =>{
    if(!err){
        console.log(chalk.blue('Cliente conectado'));
        let collection = result.db("sample_betp2").collection("inventors");
        collection.find().limit(20).toArray((err, result) => {
            console.log(result);

            // insertar un nuevo inventor
            const nuevoInventor = {
                first: "Pedro",
                last: "Perez",
                year: 1987
            }

//Definicion de las promesas

            //Insert Inventor
                const insertInventor = new Promise((resolve,reject) =>{
                    resolve(collection.insertOne(nuevoInventor));
                    reject("No se pudo insertar el inventor o ya existe en la coleccion");
                });

            //Update Inventor
                const updateInventor = new Promise((resolve,reject) => {
                    resolve(collection.updateOne({last:"Perez"}, {$set: {year:2000}}));
                    reject("No se pudo actualizar inventor");
                })

            //Delete Inventor
                const deleteInventor = new Promise((resolve,reject) =>{
                    resolve(collection.deleteOne({last:"Perez"}));
                    reject("No se pudo eliminar inventor");
                    });    

//Invocacion de promesas que conforman el CRUD en funcion asyncCall()

async function asyncCall(){

            //Insert Inventor
                insertInventor
                .then((result) => {
                    console.log(chalk.yellow("Inventor insertado correctamente"));
                })
                .catch((error => {
                    console.log("Error!",error);
                }));

             //Update Inventor
                updateInventor
                .then((result) => {
                    console.log(chalk.yellow("Inventor editado correctamente"));
                })
                .catch((error => {
                    console.log("Error!",error);
                }));           

             //Delete Inventor
                deleteInventor
                .then((result) => {
                    console.log(chalk.yellow("Inventor eliminado correctamente"));
                })
                .catch((error => {
                    console.log("Error!",error);
                }));
            }

//Llamado a ejecucion de funcion asyncCall() que ejecutara el CRUD

asyncCall();

        });
    } else {
        console.log(chalk.red(err));
    }

});
