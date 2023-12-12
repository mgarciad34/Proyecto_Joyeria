# Guía de Usuario

## Inicialización de Proyecto

### Recomendaciones

- Dado que se trata de un proyecto en el que se trabaja en conjunto tanto en el cliente como en el servidor, se recomienda abrir al menos dos terminales en el IDE donde se va a instalar. Un terminal se utilizará para los comandos necesarios para el servidor, y otro se utilizará para lanzar el cliente.

- Asegúrese de tener instalado **"Node.js"** junto con su gestor de paquetes **"npm"**.

- Asegúrese de tener instalado algún **sistema de gestión de bases de datos compatible con MySQL**, junto con la versión más reciente de MySQL.

### Pasos

1. Deberemos de crear una base de datos con el nombre que desee en su SGDB.

2. Cuando tengamos el proyecto descomprimido y abierto en nuestro IDE, realizaremos los siguientes pasos para poner el servidor en marcha.

   - `cd backend/api_joyeria/`   Nos dirigimos a la carpeta donde se encuentran los archivos del servidor.

   - `composer update`           Descargamos todas las dependencias especificadas en el documento 'composer.json'.

   - Creamos un archivo '.env' donde introduciremos los datos necesarios para la conexión con la base de datos.
     (Puede ayudarse del archivo '.env.example' que por defecto se genera al realizar el anterior comando).
     
**De ser proporcionado un fichero .env debe pegarse en el directorio 'api_joyas' a la misma altura que el fichero de ejemplo**


   - `php artisan migrate`       Lanzará las migraciones instalando las tablas necesarias para el almacenamiento y persistencia de datos.

   - `php artisan db:seed`       Lanzará los seeders sobre las tablas creadas anteriormente, introduciendo los datos mínimos imprescindibles para el primer inicio.

   **DE NO FUNCIONAR EL COMANDO 'php artisan db:seed' SE DEBE REALIZAR EL SIGUIETE:**

    - `php artisan db:seed --class=AuxiliarSeeder`       


  
  - `php artisan key:generate`       Generara la key para que funcionen los tokens de control de acceso.


   - `php artisan serve`         Lanza el servidor al cual realizaremos las peticiones.


**DE NO FUNCIONAR EL BUCKET S3 DE AWS SE DEBE INGRESAR LOS SIGUIENTES COMANDOS:**

  - `php artisan composer require aws/aws-sdk-php`      
  Instala el paquete AWS SDK para PHP utilizando Composer.

   - `php artisan composer require aws/aws-sdk-laravel`      
  Instala el paquete AWS SDK para LARAVEL utilizando Composer.

3. Una vez lanzado el cliente de forma que quede conectado con la base de datos, lanzaremos el cliente con los siguientes comandos:

   **En el segundo terminal:**
   - `npm install`               Descargamos todas las dependencias especificadas en el documento 'package.json'.

   - `npm run build`             Construirá la carpeta 'dist' donde se ubicarán los archivos js comprimidos asociados a los html.

   - `npm run config`            Lanzará el complemento 'dev-server' de webpack con los parámetros indicados en webpack.config.js.

   - `{opcional} npm run watch`  Sobrescribirá los archivos js comprimidos a medida que modifiquemos los originales.

### Acceso con usuarios predefinidos

Una vez ejecutados los comandos de migraciones y seeders, en la base de datos se creará un usuario destinado a cada uno de los roles:

**Administrador**
- Nombre: Administrador - Email: administrador@jawas.com - Contraseña: administrador

**Clasificador**
- Nombre: Clasificador  - Email: clasificador@jawas.com  - Contraseña: clasificador

**Diseñador**
- Nombre: Diseñador     - Email: diseñador@jawas.com     - Contraseña: diseñador

**Colaborador**
- Nombre: Colaborador   - Email: colaborador@jawas.com   - Contraseña: colaborador

#
<br>

# Endpoints API REST

## Lotes

### Insertar Lote
- **Ruta:** `http://127.0.0.1:8000/api/lotes`
- **Método:** `POST`
- **Descripción:** Permite insertar un nuevo lote.
- **JSON de Ejemplo:**

  ```json
  {
    "id_empresa": "XXXX",
    "ubicacion": "XXXX",
    "estado": "XXXX"
  }

### Modificar Estado de un Lote
- **Ruta:** `http://127.0.0.1:8000/api/lotes/modificar/estado/{id}`

- **Método:** `PUT`

- **Parámetros:**
  - `{id}`: ID del lote.

- **Descripción:** Modifica el estado de un lote específico.

- **JSON de Ejemplo:**
  ```json
  {
    "estado": "XXXX"
  }
 .
  ### Consultar Lotes

- **Ruta:** `http://127.0.0.1:8000/api/lotes`

- **Método:** `GET`

- **Descripción:** Obtiene la lista de todos los lotes.


### Consultar Lotes Entregados

- **Ruta:** `http://127.0.0.1:8000/api/lotes/entregados`

- **Método:** `GET`

- **Descripción:** Obtiene la lista de lotes que han sido entregados.


### Consultar Lotes Entregados por ID de usuario

- **Ruta:** `http://127.0.0.1:8000/api/lotes/entregados/{id}`

- **Método:** `GET`

- **Descripción:** Obtiene la lista de lotes que han sido entregados por el id del usuario.


### Consultar Lotes Clasificados

- **Ruta:** `http://127.0.0.1:8000/api/lotes/clasificados`

- **Método:** `GET`

- **Descripción:** Obtiene la lista de lotes que han sido clasificados.


### Consultar Lote por ID

- **Ruta:** `http://127.0.0.1:8000/api/lotes/{id}`

- **Método:** `GET`

- **Parámetros:**
  - `{id}`: ID del lote.

- **Descripción:** Obtiene información  de un lote específico.




## Despieces

### Obtener Todos los Despieces

- **Ruta:** `http://127.0.0.1:8000/api/despieces`

- **Método:** `GET`

- **Descripción:** Obtiene la lista de todos los componentes clasificados.

### Obtener Despiece de un Lote

- **Ruta:** `http://127.0.0.1:8000/api/despieces/lote/{id}`

- **Método:** `GET`

- **Parámetros:**
  - `{id}`: ID del del lote al que pertenece el despiece.

- **Descripción:** Obtiene el despiece de un lote específico.

### Clasificar Elementos de un Lote
- **Ruta:** `http://127.0.0.1:8000/api/despieces/lote/clasificar/{id}`

- **Método:** `POST`

- **Parámetros:**
  - `{id}`: ID del lote del cual sale el despiece.

- **JSON:**
  ```json
  {
    "usuario": "xxxx",
    "lista": [
      {"tipo": 0, "cantidad": 0, "descripcion": "xxxx"},
      {"tipo": 0, "cantidad": 0, "descripcion": "xxxx"}
    ]
  }
,
  ### Consultar Tipos
- **Ruta:** `http://127.0.0.1:8000/api/despiece/tipos`

- **Método:** `GET`

- **Descripción:** Obtiene la lista de todos los tipos de componentes desde un perfil clasificador.


## Insertar nuevo componente desde el clasificador

- **Ruta:** `http://127.0.0.1:8000/api/despiece/tipos`

- **Método:** `POST`

- **Descripción:** Creamos un nuevo componente desde un perfil clasificador.

- **JSON:**
  ```json
    {
        "nombre": "Memoria RAM",
        "cantidad": 30
    }

## Joyas

### Nueva Joya

- **Ruta:** `http://127.0.0.1:8000/api/joyas/nueva`

- **Método:** `POST`

- **Descripción:** Registra una nueva joya junto con sus receta.

- **JSON:**
  ```json
  {
    "nombre": "XXXX",
    "foto": "XXXX",
    "id_usuario": "XXXX",
    "detalle": [
      {"tipo": 0, "cantidad": 0},
      {"tipo": 0, "cantidad": 0}
    ]
  }

## Fabricar Joya

- **Ruta:** `http://127.0.0.1:8000/api/joyas/fabricar/{id}`

- **Método:** `PUT`

- **Parámetros:**
  - `{id}`: ID de la joya.

- **Descripción:** Fabricara una joya guardando el registro en el historial y consumiendo los recursos.

- **JSON:**
  ```json
  {
    "id_usuario": "XXXX"
  }


## Obtener Todas las Joyas

- **Ruta:** `http://127.0.0.1:8000/api/joyas`

- **Método:** `GET`

- **Descripción:** Obtiene la lista de todas las joyas.


## Obtener Joyas de un Usuario

- **Ruta:** `http://127.0.0.1:8000/api/joyas/usuario/{id}`

- **Método:** `GET`

- **Parámetros:**
  - `{id}`: ID del usuario.

- **Descripción:** Obtiene la lista de joyas pertenecientes a un usuario específico.


## Obtener Todo el Historial de Joyas

- **Ruta:** `http://127.0.0.1:8000/api/joyas/historial`

- **Método:** `GET`

- **Descripción:** Obtiene todo el historial de fabricación de joyas.


## Eliminar Joya

- **Ruta:** `http://127.0.0.1:8000/api/joyas/{id}`

- **Método:** `DELETE`

- **Parámetros:**
  - `{id}`: Identificador único de la joya.

- **Descripción:** Elimina una joya y el detalle de su receta.

## Obtener Joya por ID

- **Ruta:** `http://127.0.0.1:8000/api/joyas/{id}`

- **Método:** `GET`

- **Parámetros:**
  - `{id}`: ID de la joya.

- **Descripción:** Obtiene la información de una joya específica.


## Actualizar Joya

- **Ruta:** `http://127.0.0.1:8000/api/joyas/{id}`

- **Método:** `PUT`

- **Parámetros:**
  - `{id}`: ID de la joya.

- **Descripción:** Evalua los cambios y modifica los atributos de la joya y evalua los cambios y modifica el detalle de su receta .

- **JSON:**
  ```json
  {
    "joya_original": {"nombre": "XXXX", "foto": "XXX", "detalle": [...]},
    "joya": {"nombre": "XXXX", "foto": "XXXX", "detalle": [...]}
  }


## Verificar si el Usuario Es Propietario de la Joya

- **Ruta:** `http://127.0.0.1:8000/api/joyas/owner/{id}/{id_usuario}`
`
- **Método:** `GET`

- **Parámetros:**
  - `{id}`: Identificador único de la joya.

  - `{id_usuario}`: Identificador único del usuario.

- **Descripción:** Verifica si el usuario es propietario de la joya.

## Obtener Joyas con fabricación Disponible

- **Ruta:** `http://127.0.0.1:8000/api/joyas/disponibles/lista`

- **Método:** `GET`

- **Descripción:** Obtiene la lista de joyas disponibles para fabricación.

## Obtener Joyas con fabricación Disponible Recomendadas

- **Ruta:** `http://127.0.0.1:8000/api/joyas/disponibles/recomendaciones/{parametro}`

- **Método:** `GET`

- **Parámetros:**
  - `{parametro}`: Indica la preferencia del orden .

- **Descripción:** Obtiene la lista de joyas disponibles para fabricación ordenada en base a un parametro especificado.

 ### Consultar Tipos
- **Ruta:** `http://127.0.0.1:8000/api/joyas/tipos`

- **Método:** `GET`

- **Descripción:** Obtiene la lista de todos los tipos de componentes desde un perfil diseñador.

 ### Generar Receta
- **Ruta:** `http://127.0.0.1:8000/api/joyas/generador`

- **Método:** `GET`

- **Descripción:** Obtiene una lista de elementos para una posible receta obtenida a través de un algoritmo

 ### Cargar una Foto
- **Ruta:** `http://127.0.0.1:8000/api/joyas/foto/{id}`

- **Método:** `POST`

**SE DEBE DE SUBIR UNA FOTO EN EL BODY DE LA PETICION**

- **Descripción:** Actualiza la foto de la joya o la inserta si no lo ha hecho aún.


- **Parámetros:**
  - `{id}`: Identificador único de la joya.

## Registro

- **Ruta:** `http://127.0.0.1:8000/usuarios`

- **Método:** `POST`

- **Parámetros:**
  - `{name}`: Nombre del usuario.
  - `{email}`: Correo electronico del usurio.
  - `{password}`: Contraseña del usuario.

- **Descripción:** Registramos a un nuevo usuario.

- **JSON:**
  ```json
    {
        "name": "Usuario4",
        "email": "usuario4@gmail.com",
        "password": "123456"
    }

## Login

- **Ruta:** `http://127.0.0.1:8000/api/login`

- **Método:** `POST`

- **Parámetros:**
  - `{email}`: Correo electronico del usurio.
  - `{password}`: Contraseña del usuario.

- **Descripción:** Registramos a un nuevo usuario.

- **JSON:**
  ```json
    {
        "email": "usuario@correo.com",
        "password": "contrasena"
    }

## Agregar nuevos usuarios desde el administrador

- **Ruta:** `http://127.0.0.1:8000/api/administrador/crear/usuario`

- **Método:** `POST`

- **Parámetros:**
  - `{name}`: Nombre del usuario.
  - `{email}`: Correo electronico del usurio.
  - `{password}`: Contraseña del usuario.
  - `{rol}`: Rol del usuario.

- **Descripción:** Registramos a un nuevo usuario desde el administrador, aqui podemos establecerle el rol que queramos desde el servidor pero en la interfaz de usuario esta establecida por defecto.

- **JSON:**
  ```json
    {
        "name": "Usuario4",
        "email": "usuario4@gmail.com",
        "password": "123456",
        "rol": 4
    }

## Consultar usuarios desde el administrador

- **Ruta:** `http://127.0.0.1:8000/api/administrador/usuarios`

- **Método:** `GET`

- **Descripción:** Consultamos desde el administrador todos los usuarios que hay en nuestro SGDB.


## Eliminar usuario desde el administrador

- **Ruta:** `http://127.0.0.1:8000/api/administrador/eliminar/usuario/{id}`

- **Método:** `DELETE`

- **Parámetros:**
  - `{id}`: ID del usuario.

- **Descripción:** Eliminamos un usuario de nuestro SGDB mediante su ID.

## Modificar usuario desde el administrador

- **Ruta:** `http://127.0.0.1:8000/api/administrador/modificar/usuario/{id}`

- **Método:** `PUT`

- **Parámetros:**
  - `{id}`: ID del usuario.

- **Descripción:** Modificamos un usuario de nuestro SGDB desde el administrador mediante su ID.

- **JSON:**
  ```json
    {
        "name": "NuevoNombre",
        "email": "nuevo@email.com"
    }

## Agregar nuevo rol al usuario desde el administrador

- **Ruta:** `http://127.0.0.1:8000/api/administrador/agregar/rol/usuario`

- **Método:** `POST`

- **Parámetros:**
  - `{idUsuario}`: ID del usuario.
  - `{idRol}`: Id del rol del usuario.

- **Descripción:** Asignamos un nuevo rol a un usuario, desde nuestro administrador.

- **JSON:**
  ```json
    {
        "idUsuario": 44,
        "idRol": 3
    }

## Elimina rol al usuario desde el administrador

- **Ruta:** `http://127.0.0.1:8000/api/administrador/eliminar/rol/usuario`

- **Método:** `DELETE`

- **Parámetros:**
  - `{idUsuario}`: ID del usuario.
  - `{idRol}`: Id del rol del usuario.

- **Descripción:** Asignamos un nuevo rol a un usuario, desde nuestro administrador.

- **JSON:**
  ```json
    {
        "idUsuario": 44,
        "idRol": 1
    }

## Insertar nuevo componente desde el administrador

- **Ruta:** `http://127.0.0.1:8000/api/administrador/crear/componente`

- **Método:** `POST`

- **Parámetros:**
  - `{nombre}`: nombre del componente.
  - `{cantidad}`: Cantidad del componete.

- **Descripción:** Creamos un nuevo componente, desde nuestro administrador.

- **JSON:**
  ```json
    {
        "nombre": "Memoria RAM",
        "cantidad": 30
    }

## Modificamos componente desde el administrador

- **Ruta:** `http://127.0.0.1:8000/api/administrador/modificar/componente/{id}`

- **Método:** `PUT`

- **Parámetros:**
  - `{id}`: ID del componente.
  - `{nombre}`: nombre del componente.
  - `{cantidad}`: Cantidad del componete.

- **Descripción:** Creamos un nuevo componente, desde nuestro administrador.

- **JSON:**
  ```json
    {
        "nombre": "Memoria RAM",
        "cantidad": 80
    }

## Obtener componentes desde el administrador

- **Ruta:** `http://127.0.0.1:8000/api/administrador/consultar/componentes`

- **Método:** `GET`

- **Descripción:** Obtienemos todos los componentes, desde nuestro administrador.

## Eliminar componente desde el administrador

- **Ruta:** `http://127.0.0.1:8000/api/administrador/eliminar/componente/{id}`

- **Método:** `PUT`

- **Parámetros:**
  - `{id}`: ID del componente.
  - `{nombre}`: nombre del componente.
  - `{cantidad}`: Cantidad del componete.

- **Descripción:** Creamos un nuevo componente, desde nuestro administrador.

## Obtener roles del usuario (Para la pantalla que redirige)

- **Ruta:** `http://127.0.0.1:8000/api/obtener/roles/{idUsuario}`

- **Método:** `GET`

- **Descripción:** Obtienemos todos roles del usuario.




## Usuarios

### Cargar imagen

- **Ruta:** `http://127.0.0.1:8000/api/usuarios/foto/{id}`

- **Método:** `POST`

- **Parámetros:**
  - `{id}`: Identificador único del usuario.


- **Descripción:** Actualiza la imagen de perfil

**SE DEBE DE SUBIR UNA FOTO EN EL BODY DE LA PETICION**



### Actualizar Email

- **Ruta:** `http://127.0.0.1:8000/api/usuarios/email/{id}`

- **Método:** `PUT`

- **Parámetros:**
  - `{id}`: Identificador único del usuario.


- **Descripción:** Actualiza el email del usuario 

- **JSON:**
  ```json
  {
    "email": "XXXX"
  }
,


### Actualizar Contraseña

- **Ruta:** `http://127.0.0.1:8000/api/usuarios/email/{id}`

- **Método:** `PUT`

- **Parámetros:**
  - `{id}`: Identificador único del usuario.


- **Descripción:** Actualiza la contraseña del usuario 

- **JSON:**
  ```json
  {
    "password": "XXXX"
  }
,

### Obtener roles para las peticiones

- **Ruta:** `http://127.0.0.1:8000/api/usuarios/roles/{id}`

- **Método:** `GET`

- **Parámetros:**
  - `{id}`: Identificador único del usuario.


- **Descripción:** Devuelve los roles que el usuario tiene asignados y los que no para su clasificación en las distintas peticiones posibles.

### Obtener peticiones realizadas por el usuario 

- **Ruta:** `http://127.0.0.1:8000/api/usuarios/{id}/peticiones`

- **Método:** `GET`

- **Parámetros:**
  - `{id}`: Identificador único del usuario.


- **Descripción:** Devuelve todas las peticiones realizadas por un usuario.


### Insertar peticiones realizadas por el usuario 

- **Ruta:** `http://127.0.0.1:8000/api/usuarios/{id}/peticiones`

- **Método:** `POST`

- **Parámetros:**
  - `{id}`: Identificador único del usuario.


- **Descripción:** Inserta una peticion en la base de datos.

**NO PUEDE HABER DOS PETICIONES IGUALES POR UN MISMO USUARIO EN ESTADO 'PENDIENTE'**


