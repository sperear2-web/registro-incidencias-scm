# Sistema de registro de incidencias

Aplicación web sencilla (HTML, CSS y JavaScript, sin base de datos ni servidor) para registrar incidencias reportadas por los usuarios y consultarlas. Los datos se guardan en el navegador (`localStorage`).

Proyecto de la práctica grupal **Gestión de versiones y automatización del despliegue de una aplicación mediante GitHub** — asignatura *Gestión de la Configuración del Software*, Universidad Estatal de Milagro (UNEMI).

## Funcionalidades

- Registrar una incidencia (título, descripción y quién la reporta).
- Listar las incidencias registradas con su estado.
- Filtrar incidencias por estado y cambiar el estado de cada una *(desde v1.1.0)*.

## Ejecutar la aplicación localmente

No requiere instalación. Opción 1: abrir `index.html` con el navegador (doble clic).

Opción 2: levantar un servidor estático:

```bash
python -m http.server 8000
# abrir http://localhost:8000
```

## Ejecutar las pruebas

Requiere Node.js 18 o superior:

```bash
npm test
```

## Estructura del proyecto

```
├── index.html                 # Interfaz
├── css/styles.css             # Estilos
├── js/incidencias.js          # Lógica de negocio (también usada en las pruebas)
├── js/app.js                  # Interacción con el DOM y localStorage
├── tests/incidencias.test.js  # Pruebas automáticas
└── .github/workflows/deploy.yml  # Validación + despliegue en GitHub Pages
```

## Flujo de trabajo (SCM)

- Rama `main`: versión estable; cada push dispara el workflow.
- Ramas de trabajo: `feature/<tema>` para funcionalidades, `fix/<tema>` para correcciones.
- Todo cambio entra a `main` mediante *pull request*.
- Versionamiento semántico `MAJOR.MINOR.PATCH` con un *release* de GitHub por versión.

## Versiones

| Versión | Descripción |
|---------|-------------|
| v1.0.0  | Versión inicial: registro y listado de incidencias. |
| v1.1.0  | Filtro de incidencias por estado y cambio de estado. |

## Despliegue automático

El workflow `.github/workflows/deploy.yml` ejecuta las pruebas y, si pasan, publica la aplicación en GitHub Pages al hacer push a `main`.

## Integrantes

_(completar con nombres y usuarios de GitHub del grupo)_
