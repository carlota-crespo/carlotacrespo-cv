# Carlota Crespo Suárez — CV web

Sitio personal bilingüe (español e inglés) de una sola página: Business Analyst y Product Owner especializada en Compliance, Corporate Governance y productos digitales globales.

## Desarrollo

```bash
npm install
cp .env.example .env.local
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000). El middleware redirige a `/es` o `/en` según el idioma del navegador (español por defecto) y recuerda la elección en una cookie.

## Variables de entorno

| Variable | Uso |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | URL canónica para SEO (`hreflang`, sitemap, JSON-LD). |
| `CONTACT_API_URL` | Endpoint receptor del formulario. Si está vacío, el envío responde 503 y la UI no simula un éxito. |
| `NEXT_PUBLIC_ANALYTICS_ENDPOINT` | Endpoint opcional de eventos. Si está vacío, `track()` no hace nada. Nunca envía nombre, email ni mensaje. |

## Formulario

La UI llama a `submitContactForm(payload)` y hace `POST /api/contact` con:

```json
{
  "name": "string",
  "email": "string",
  "message": "string",
  "locale": "es | en",
  "createdAt": "ISO-8601",
  "source": "personal-cv-web"
}
```

Para conectar un servicio posterior, define `CONTACT_API_URL`. No hace falta cambiar el formulario.
