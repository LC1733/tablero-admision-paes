# Geometría PAES M1 · Entrenador (v2.0)

App de estudio del eje Geometría de la PAES de Competencia Matemática 1, alineada al
temario oficial DEMRE de la PAES Regular, Admisión 2027.

## Archivos

| Archivo | Qué es |
|---|---|
| `index.html` | La aplicación completa |
| `preguntas.json` | Banco de 76 preguntas. **Aquí se edita el contenido**, no en el HTML |
| `manifest.json` | Datos de instalación como app |
| `sw.js` | Service worker: hace que funcione sin internet |
| `icon-192.png`, `icon-512.png`, `icon-maskable.png` | Íconos |

## Publicar en GitHub Pages

1. Crear el repositorio y subir los siete archivos a la raíz.
2. Settings → Pages → Branch: `main`, carpeta `/ (root)`.
3. Abrir la URL en el teléfono y usar "Agregar a pantalla de inicio". Queda como app y
   funciona sin conexión.

Requiere HTTPS o `localhost`. Si abres `index.html` haciendo doble clic desde el disco,
el navegador bloquea la lectura de `preguntas.json` y la app avisa en pantalla. Para
probar en el computador: `python3 -m http.server` dentro de la carpeta y entrar a
`http://localhost:8000`.

## Editar o agregar preguntas

Cada pregunta en `preguntas.json`:

```json
{
  "id": "g077",
  "u": "cuerpos",
  "t": "Área de superficie",
  "q": "Enunciado de la pregunta",
  "o": ["alternativa A", "B", "C", "D"],
  "r": 2,
  "s": "Desarrollo paso a paso de la solución"
}
```

- `u` es la unidad del temario: `figuras`, `cuerpos`, `isometricas`, `semejanza` o
  `extra` (contenido que **no** entra en M1 este proceso).
- `r` es el índice de la alternativa correcta, contando desde 0. En el ejemplo, `2` es la C.
- `id` debe ser único.

**Importante:** después de editar `preguntas.json`, subir el número de versión en la
primera línea de `sw.js` (`geo-m1-v2-0` → `geo-m1-v2-1`). Si no, los teléfonos que ya
instalaron la app seguirán mostrando el banco antiguo.

## Cobertura del temario

Unidades oficiales del eje Geometría en M1 Regular, Admisión 2027:

- Figuras geométricas — 17 preguntas
- Cuerpos geométricos — 10
- Transformaciones isométricas — 13
- Semejanza y proporcionalidad — 13
- Fuera del temario (opcional, se activa con el interruptor) — 23

El ensayo arma 25 preguntas distintas cada vez, repartidas entre las unidades activas.
El resultado se informa como logro en el eje Geometría, no como puntaje PAES: la prueba
M1 tiene 65 preguntas repartidas en cuatro ejes.

## Datos guardados

Todo queda en el `localStorage` del dispositivo, con prefijo `geo2_`: respuestas de
ejercicios, tareas del plan marcadas, historial de ensayos y la preferencia de contenido
extra. El botón "Borrar mi progreso" en Inicio elimina solo esas claves.
