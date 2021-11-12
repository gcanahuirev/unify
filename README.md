# Unify API v1
Aplicación descentralizada de lado del servidor para intercambio de NFTs
## Descripción

[Nest](https://github.com/nestjs/nest) framework TypeScript.

NOTA: Es obligatorio instalar las dependencias con `yarn`


## Instalación

1. Instalar dependencias

```bash
$ yarn
```

2. Habilite una base de datos **Postgres** y guarde lo siguiente:
```ts
# Variables de base de datos
DB_HOST=
DB_PORT=
DB_USER=
DB_PASS=
DB_NAME=
```

3. Cree un archivo para las variables de entorno(.env.development) y complete.
4. Para ejecutar en modo desarrollo
```bash
$ yarn dev
```
5. Para generar la documentación de todo el proyecto
```bash
$ yarn docs
```