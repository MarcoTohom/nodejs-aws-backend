# API de Autenticación de Usuario

## Descripción del Proyecto
Este proyecto es una aplicación backend en Node.js que proporciona una API RESTful para la autenticación de usuarios. Permite a los usuarios registrarse, iniciar sesión y ver su perfil. La autenticación se maneja utilizando JSON Web Tokens (JWT).

## Funcionalidades
- Registro de usuario con nombre de usuario y contraseña
- Inicio de sesión de usuario y generación de JWT
- Encriptación segura de contraseñas usando bcrypt
- Ruta protegida para obtener el perfil del usuario
- Documentación de la API utilizando Swagger

## Endpoints de la API

La API proporciona los siguientes endpoints para la autenticación de usuarios:

### Autenticación (`/auth`)

#### 1. Registrar Usuario
*   **Método:** `POST`
*   **Ruta:** `/auth/register`
*   **Descripción:** Registra un nuevo usuario en el sistema.
*   **Cuerpo de la Solicitud:**
    ```json
    {
      "username": "your_username",
      "password": "your_password"
    }
    ```
*   **Respuestas:**
    *   `201 Created`: Usuario registrado con éxito.
        ```json
        {
          "message": "User registered successfully",
          "userId": 1
        }
        ```
    *   `400 Bad Request`: El nombre de usuario ya existe o no se proporcionó el nombre/contraseña.
        ```json
        {
          "message": "Username already exists" 
        }
        ```
        ```json
        {
          "message": "Username and password are required"
        }
        ```
    *   `500 Internal Server Error`: Error al registrar al usuario.
        ```json
        {
          "message": "Error registering user"
        }
        ```

#### 2. Iniciar Sesión de Usuario
*   **Método:** `POST`
*   **Ruta:** `/auth/login`
*   **Descripción:** Inicia sesión un usuario existente y retorna un JWT.
*   **Cuerpo de la Solicitud:**
    ```json
    {
      "username": "your_username",
      "password": "your_password"
    }
    ```
*   **Respuestas:**
    *   `200 OK`: Inicio de sesión exitoso.
        ```json
        {
          "token": "your_jwt_token"
        }
        ```
    *   `400 Bad Request`: Nombre de usuario o contraseña inválidos, o no proporcionados.
        ```json
        {
          "message": "Invalid username or password"
        }
        ```
        ```json
        {
          "message": "Username and password are required"
        }
        ```
    *   `500 Internal Server Error`: Error al iniciar sesión.
        ```json
        {
          "message": "Error logging in"
        }
        ```

#### 3. Obtener Perfil de Usuario
*   **Método:** `GET`
*   **Ruta:** `/auth/profile`
*   **Descripción:** Obtiene el perfil del usuario autenticado. Esta es una ruta protegida y requiere un JWT en el encabezado Authorization.
*   **Encabezados:**
    *   `Authorization`: `Bearer your_jwt_token`
*   **Respuestas:**
    *   `200 OK`: Datos del perfil de usuario.
        ```json
        {
          "id": 1,
          "username": "your_username"
        }
        ```
    *   `401 Unauthorized`: No se proporcionó el token, el token es inválido o ha expirado.
        ```json
        {
          "message": "Unauthorized - No token provided"
        }
        ```
        ```json
        {
          "message": "Unauthorized - Invalid or expired token"
        }
        ```
    *   `404 Not Found`: Usuario no encontrado.
        ```json
        {
          "message": "User not found"
        }
        ```
    *   `500 Internal Server Error`: Error al obtener el perfil.
        ```json
        {
          "message": "Error retrieving profile"
        }
        ```

## Esquema de la Base de Datos

La aplicación utiliza una base de datos PostgreSQL gestionada por Prisma. El esquema incluye los siguientes modelos:

### `User`
Representa un usuario en el sistema.

*   `id`: Int (Clave primaria, autoincremental) - Identificador único del usuario.
*   `username`: String (Único) - Nombre de usuario elegido por el usuario.
*   `password`: String - Contraseña encriptada del usuario.
*   `createdAt`: DateTime (Por defecto: `now()`) - Marca de tiempo de creación del usuario. Mapeado como `created_at` en la base de datos.

Este modelo está definido en `prisma/schema.prisma` y se mapea con la tabla `users` en la base de datos.

## Requisitos

La aplicación depende de las siguientes dependencias principales:

*   `express`: Framework web rápido, minimalista y sin opiniones para Node.js.
*   `bcryptjs`: Librería para encriptación de contraseñas.
*   `jsonwebtoken`: Librería para generar y verificar JSON Web Tokens (JWT).
*   `@prisma/client`: Prisma Client para acceso a la base de datos (generado desde tu esquema de Prisma).
*   `dotenv`: Módulo para cargar variables de entorno desde un archivo `.env`.
*   `swagger-jsdoc`: Genera especificaciones Swagger/OpenAPI a partir de comentarios JSDoc.
*   `swagger-ui-express`: Sirve la documentación Swagger UI generada automáticamente.

## Requisitos de Desarrollo

Para el desarrollo, se utilizan las siguientes dependencias:

*   `prisma`: Herramienta de línea de comandos para Prisma ORM (migraciones, generación de cliente, etc.).

## Configuración y Ejecución del Proyecto

Para poner en marcha la aplicación en tu máquina local, sigue estos pasos:

1.  **Clona el repositorio:**
    ```bash
    git clone <repository_url>
    cd <repository_directory>
    ```

2.  **Instala las dependencias:**
    ```bash
    npm install
    ```

3.  **Configura las variables de entorno:**
    Crea un archivo `.env` en la raíz del proyecto. Este archivo almacenará información sensible y configuraciones. Añade las siguientes variables:
    ```env
    DATABASE_URL="postgresql://YOUR_DB_USER:YOUR_DB_PASSWORD@YOUR_DB_HOST:YOUR_DB_PORT/YOUR_DB_NAME?schema=public"
    JWT_SECRET="YOUR_SUPER_SECRET_KEY_FOR_JWT"
    ```
    *   Reemplaza `YOUR_DB_USER`, `YOUR_DB_PASSWORD`, `YOUR_DB_HOST`, `YOUR_DB_PORT` y `YOUR_DB_NAME` con tus credenciales reales de la base de datos PostgreSQL.
    *   Reemplaza `YOUR_SUPER_SECRET_KEY_FOR_JWT` con una clave secreta fuerte y única para firmar los JWT.

4.  **Ejecuta las migraciones de base de datos:**
    Prisma utiliza migraciones para gestionar el esquema de la base de datos. Aplica las migraciones pendientes:
    ```bash
    npx prisma migrate dev
    ```
    Este comando también creará la base de datos si no existe (dependiendo de tu configuración) y generará el Prisma Client.

5.  **Inicia la aplicación:**
    ```bash
    npm start
    ```
    El servidor debería estar en funcionamiento, normalmente en el puerto 3000 (si `index.js` o la variable de entorno lo define, de lo contrario, se usa el puerto por defecto de Express).

## Documentación de la API

Esta API está documentada usando Swagger/OpenAPI. Puedes acceder a la documentación interactiva (Swagger UI) cuando el servidor esté en ejecución.

*   **Ruta de Swagger UI:** `/api-docs`

Navega a `http://localhost:<PORT>/api-docs` en tu navegador para ver la documentación, donde `<PORT>` es el puerto en el que se ejecuta la aplicación (típicamente 3000).
