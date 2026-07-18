# 🐇 Lebre de Junho - Frontend

Este é o repositório do frontend da **Lebre de Junho**, desenvolvido utilizando **Nuxt** e **Tailwind CSS**. A aplicação consome a [API](https://github.com/saymonp/lebre-de-junho-api) do ecossistema para gerenciamento e exibição do catálogo, painéis administrativos e dashboards.

---

## Design & Prototipagem

O design de interface, componentes e experiência do usuário (UX/UI) estão centralizados no Figma do projeto.

**[Acessar Protótipo no Figma](https://www.figma.com/design/pMVWfYoWE9tg3wCVuQRZNm/Lebre-de-Junho?node-id=0-1&t=5K0eu4QVEUZwyldO-1)**

---

## Tecnologias Utilizadas

*   **Nuxt** - Framework SSR/SSG baseado em Vue
*   **Tailwind CSS** - Estilização baseada em classes utilitárias
*   **TypeScript** - Superset JavaScript para tipagem estática e segurança no código

---

## API / Backend

O frontend se conecta a um ecossistema robusto de autenticação segura via tokens e integrações com serviços externos (como o MELHOR ENVIO).

**[Acessar Repositório da API](https://github.com/saymonp/lebre-de-junho-api)**

*   **Tecnologias do Backend:** Desenvolvido em **Laravel**, utilizando bancos de dados relacionais e controle de autenticação via API Tokens.
*   **Comunicação:** O frontend consome os endpoints REST estruturados nessa API para alimentar as views reativas.

---

## Instalação e Execução

Certifique-se de ter o **Node.js** instalado em sua máquina.

### 1. Clonar o repositório e instalar as dependências
```bash
git clone [https://github.com/seu-usuario/lebre-de-junho-frontend.git](https://github.com/seu-usuario/lebre-de-junho-frontend.git)
cd lebre-de-junho-frontend
npm install

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
