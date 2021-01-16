# Examen-1B-TE-Chat

La presente aplicacion esta construida en los lenguajes Ionic, Angular y está desplegada con la base de datos Firebase, con Realtime Database y Firebase Storage.

La aplicación consta de 3 modulos principales:

- Login Module

En este modulo tenemos toda la configuracion relacionada al Login. Aqui hacemos uso de las funciones que nos otorga el Auth de Firebase para poder realizar la verificacion de credenciales para el ingreso a nuestra aplicacion. 
Utilizamos la funcion sing-in del Auth para enviarle como parametros al email y contraseña del usuario, de esta forma, el sistema verificara si este usuario consta en el Authentication de Firebase, devolviendonos una promesa y permitiendo el acceso o no al sistema.
En la vista de este modulo, crearemos el formulario que estará implementado junto con las validaciones respectivas para que los datos que se ingresen en el mismo sean congruentes.

- Register Module

El modulo de registro será el primer paso en caso de que no se cuente con credenciales para el acceso a la aplicación. En este modulo se ejecutará la función register del Authentication de Firebase, la cual recibirá como parámetros al email y contraseña ingresadas en el formulario y que en caso de que no existan todavía, se creen como un nuevo usuario habilitado.
En la vista del modulo se implementa un formulario con caracteristicas identicas a las del login, debido a que se manejan el mismo tipo de datos. En este sentido, se hacen las validaciones para el correo y la contraseña antes de enviarlas como parametros a nuestra funcion.

- Chats Module

Este es el nucleo de nuestra aplicacion, aqui se implementan las funciones que permitiran el guardado y consulta de mensajes en nuestra base de datos. En el controlador comenzamos especificando las variables que utilizaremos en nuestros metodos, ademas de especificar los servicios que se consumir desde éstos. A continuacion especificaremos las acciones a ejecutar apenas se carga nuestra pagina, en la funcion ngOnInit, aqui vamos a ejecutar el metodo de consulta de los datos de los mensajes en nuestra base, para que apenas se cargue la pagina podamos observar los mensajes. Para que esto funcione de manera correcta hay que realizar validaciones de forma que los daos obtenidos esten fomateados correctamente.

A continuacion especificamos los metodos para poder realizar la captura de imagenes desde la camara de nuestro SmartPhone, para esto utilizamos el plugin de camara de ionic-native, el cual nos permite interactuar y obtener los permisos respectivos. El archivo obtenido en nuestro telefono deberá ser transformado a un formato aceptado por el storage de firebase. Para esto transformamos nuestro archivo en un URL Base64 para poder subirlo a nuestro bucket. Una vez que hemos guardado nuestro dato, lo obtenemos de vuelta para poder registrarlo como mensaje en nuestra base de datos.

Tanto para los mensajes de texto como las imagenes se implementaron metodos de encriptacion que ayudan a proteger estos datos de forma que gente no autorizada no tenga acceso a ellos de ninguna forma.

Tambien se implementaron reglas en la base de datos para que solo los usuarios autenticado puedan realizar consultas y escrituras en el storage y nuestra base de datos.

Finalmente, a continuacion se encuentra el link del video demostrativo de funcionalidad de la aplicacion:

 https://youtu.be/GoYdQ2TNICY

Espero que la aplicacion sea de su agrado. Adiós :D 
