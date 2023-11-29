# Guía de Usuario

## Inicialización de Proyecto

### Recomendaciones

- Dado que se trata de un proyecto en el que se trabaja en conjunto tanto en el cliente como en el servidor, se recomienda abrir al menos dos terminales en el IDE donde se va a instalar. Un terminal se utilizará para los comandos necesarios para el servidor, y otro se utilizará para lanzar el cliente.

- Asegúrese de tener instalado **"Node.js"** junto con su gestor de paquetes **"npm"**.

- Asegúrese de tener instalado algún **sistema de gestión de bases de datos compatible con MySQ**L, junto con la versión más reciente de MySQL.

### Pasos

1. Deberemos de crear una base de datos con el nombre que desee en su SGDB.

2. Cuando tengamos el proyecto descomprimido y abierto en nuestro IDE, realizaremos los siguientes pasos para poner el servidor en marcha.

   - `cd backend/api_joyeria/`   Nos dirigimos a la carpeta donde se encuentran los archivos del servidor.

   - `composer update`           Descargamos todas las dependencias especificadas en el documento 'composer.json'.

   - Creamos un archivo '.env' donde introduciremos los datos necesarios para la conexión con la base de datos.
     (Puede ayudarse del archivo '.env.example' que por defecto se genera al realizar el anterior comando)

   - `php artisan migrate`       Lanzará las migraciones instalando las tablas necesarias para el almacenamiento y persistencia de datos.

   - `php artisan db:seed`       Lanzará los seeders sobre las tablas creadas anteriormente, introduciendo los datos mínimos imprescindibles para el primer inicio.

   - `php artisan serve`         Lanza el servidor al cual realizaremos las peticiones.

3. Una vez lanzado el cliente de forma que quede conectado con la base de datos, lanzaremos el cliente con los siguientes comandos:

   **En el segundo terminal:**
   - `npm update`                Descargamos todas las dependencias especificadas en el documento 'package.json'.

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


## Tipos

### Consultar Tipos
- **Ruta:** `http://127.0.0.1:8000/api/tipos`

- **Método:** `GET`

- **Descripción:** Obtiene la lista de todos los tipos de componentes.


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

- **Ruta:** `http://127.0.0.1:8000/api/administrador/modificar/componente`

- **Método:** `PUT`

- **Parámetros:**
  - `{id}`: ID del componente.
  - `{nombre}`: nombre del componente.
  - `{cantidad}`: Cantidad del componete.

- **Descripción:** Creamos un nuevo componente, desde nuestro administrador.

- **JSON:**
  ```json
    {
        "id": 1,
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

