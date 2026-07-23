# The Chefz — RAG Assistant Chat UI

A lightweight, static support page for **The Chefz** that embeds an AI assistant powered by [n8n](https://n8n.io/)'s chat widget. The widget talks to an n8n workflow webhook backed by a Retrieval-Augmented Generation (RAG) pipeline, so customers can ask questions about their orders, delivery, or policies and get answers grounded in The Chefz's own knowledge base.

## Live demo

The app is deployed and publicly accessible at:

🔗 **[https://goldfish-app-4vhzt.ondigitalocean.app/](https://goldfish-app-4vhzt.ondigitalocean.app/)**

Hosted on [DigitalOcean App Platform](https://www.digitalocean.com/products/app-platform).

## What this is

This repo contains **only the front-end shell** — a single HTML page, one stylesheet, and a small configuration script. There is no backend code here; the actual assistant logic (RAG retrieval, prompt orchestration, LLM calls) lives in an n8n workflow that is exposed as a webhook and consumed by the embedded chat widget.

## How it works

1. `index.html` renders a minimal branded landing page (header with logo, welcome message, footer).
2. It loads the [`@n8n/chat`](https://www.npmjs.com/package/@n8n/chat) widget from a CDN, which renders a floating chat bubble/window.
3. `js/widget-config.js` initializes the widget via `createChat(...)`, pointing it at an n8n **webhook URL**. Every message the user sends is posted to that webhook, which triggers the n8n RAG workflow and streams the response back into the widget.
4. `css/style.css` restyles both the page and the chat widget (colors, header, layout) to match The Chefz brand, using the widget's CSS custom properties (`--chat--color-primary`, `--chat--toggle--background`, etc.).

## Project structure

```
.
├── index.html          # Page markup + widget/script includes
├── css/
│   └── style.css       # Page layout + n8n chat widget theming
├── js/
│   └── widget-config.js # n8n chat widget initialization & webhook config
└── Assets/
    └── logo.png         # The Chefz logo
```

## Running locally

No build step or server-side dependencies are required — it's a static site.

```bash
# From the project root, serve the folder with any static file server, e.g.:
npx serve .
# or
python -m http.server 8080
```

Then open the served URL in your browser. The chat bubble will appear in the corner of the page and connect to the configured n8n webhook.

> **Note:** Opening `index.html` directly via `file://` may work for viewing layout, but the chat widget requires the page to be served over `http(s)` for the module script and CDN assets to load reliably.

## Configuration

The assistant's behavior (webhook target, welcome messages, labels) is configured in [`js/widget-config.js`](js/widget-config.js):

| Option | Description |
|---|---|
| `webhookUrl` | The n8n webhook endpoint that receives chat messages and returns assistant responses. |
| `mode` | Chat widget display mode (`window` renders a floating toggleable window). |
| `showWelcomeScreen` | Whether to show an initial greeting screen before the conversation starts. |
| `initialMessages` | Greeting messages shown when the chat opens. |
| `i18n.en` | Text labels (title, subtitle, input placeholder, etc.) for the English locale. |

To point this UI at a different n8n workflow, update `webhookUrl` to your own webhook endpoint.

Branding (colors, fonts, spacing) can be adjusted in [`css/style.css`](css/style.css), including the chat widget's theme via the `--chat--*` CSS custom properties on `:root`.

## Tech stack

- **HTML/CSS** — static page and custom theming, no framework
- **[@n8n/chat](https://www.npmjs.com/package/@n8n/chat)** — pre-built chat widget UI, loaded via CDN
- **n8n** (external) — hosts the webhook and RAG workflow that powers assistant responses
