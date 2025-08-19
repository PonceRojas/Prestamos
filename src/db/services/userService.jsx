//<Metodo anterior para la coneccion con la Base de datos> 
//import FirebaseUserService from './firebaseUserService';
//const userService = new FirebaseUserService(); // ← Aquí cambias de backen
//import MySQLUserService from './mysqlUserService';
//const userService = new MySQLUserService();
//export default userService;
//import MongoUserService from './mongoUserService';

//<Nuevo metodo de coneccion con la base de datos mas comodo desde el .env>
import MySQLUserService from "./mysqlUserService";
import FirebaseUserService from "./firebaseUserService";

let userService;

if (process.env.REACT_APP_BACKEND === "mysql") {
  userService = new MySQLUserService();
} else {
  userService = new FirebaseUserService();
}

export default userService;

