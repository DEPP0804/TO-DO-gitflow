# 🧪 Laboratorio: GitFlow vs Trunk-Based Development

## 📌 Descripción

Este proyecto consiste en una aplicación simple de gestión de tareas (TODO) desarrollada en TypeScript, cuyo objetivo principal es comparar dos estrategias de ramificación en Git:

* 🌿 GitFlow
* 🌳 Trunk-Based Development

Ambas versiones implementan la misma lógica, pero difieren en la forma en que se gestionan las ramas y los commits.

---

## 🧱 Estructura del Proyecto

```
src/
 ├── models/        # Definición de la entidad Task
 ├── services/      # Lógica de negocio
 ├── utils/         # Persistencia en archivo (storage)
 └── index.ts       # Punto de entrada (CLI)
```

---

## 🌿 GitFlow

### 📍 Rama principal utilizada

* `main`
* `develop`
* `feature/*`
* `release/*`
* `hotfix/*`

### 🔄 Flujo aplicado

1. Se crea una rama `develop` desde `main`
2. Cada funcionalidad se desarrolla en una rama `feature/*`
3. Las features se integran en `develop`
4. Se crea una rama `release/1.0`
5. Se hace merge a `main`
6. Se aplican correcciones con `hotfix/*`

### ✅ Características

* Estructura organizada
* Separación clara de ambientes
* Ideal para equipos grandes

### ❌ Desventajas

* Más complejo
* Mayor número de merges
* Más lento para cambios pequeños

---

## 🌳 Trunk-Based Development

### 📍 Rama principal utilizada

* `main` (o en este caso `trunk-version`)

### 🔄 Flujo aplicado

1. Cambios pequeños y frecuentes
2. Commits directos a la rama principal
3. Opcionalmente ramas cortas de vida corta

### ✅ Características

* Flujo simple
* Integración continua
* Menos conflictos

### ❌ Desventajas

* Requiere disciplina
* Riesgo si no se prueba correctamente

---

## ⚖️ Comparación

| Característica  | GitFlow 🌿      | Trunk-Based 🌳 |
| --------------- | --------------- | -------------- |
| Complejidad     | Alta            | Baja           |
| Ramas           | Muchas          | Pocas          |
| Velocidad       | Media           | Alta           |
| Integración     | Por etapas      | Continua       |
| Uso recomendado | Equipos grandes | Equipos ágiles |

---

## 🚀 Ejecución del Proyecto

### Instalar dependencias

```
npm install
```

### Ejecutar

```
npx ts-node src/index.ts
```

---

## 💾 Persistencia

El proyecto guarda las tareas en un archivo `tasks.json` utilizando el módulo `fs` de Node.js.

---

## 🎯 Conclusión

GitFlow ofrece una estructura robusta y organizada, ideal para proyectos grandes con múltiples entornos.

Trunk-Based Development es más simple y rápido, favoreciendo la integración continua y la entrega frecuente.

La elección depende del contexto del equipo y del tipo de proyecto.

---

## 👨‍💻 Autor

Proyecto realizado como laboratorio de DevOps.
