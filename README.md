# decap-cms-oauth proxy para autenticação do DecapCMS no GitHub Pages

Este projeto é um proxy OAuth para autenticação do DecapCMS com backend GitHub, pronto para deploy no Render, Vercel ou Railway.

## Como usar

1. **Clone este repositório**
2. **Configure as variáveis de ambiente** (veja o arquivo `.env.example`)
3. **Faça deploy no Render, Vercel ou Railway**

---

## Estrutura de arquivos
- `server.js` — Servidor Express para proxy OAuth
- `.env.example` — Exemplo de variáveis de ambiente
- `package.json` — Dependências

---

## Variáveis de ambiente necessárias

```
GITHUB_CLIENT_ID=Ov23li71mMHWz1qz8ypt
GITHUB_CLIENT_SECRET=COLE_SEU_SECRET_AQUI
GITHUB_TOKEN_SECRET=uma-string-secreta-aleatoria
BASE_URL=https://SEU-PROXY.onrender.com
```

---

## Deploy rápido no Render
1. Crie uma conta em https://render.com
2. Clique em "New Web Service" e conecte seu GitHub
3. Escolha este repositório
4. Preencha as variáveis de ambiente
5. Deploy!

---

## Deploy rápido no Vercel
1. Crie uma conta em https://vercel.com
2. Clique em "New Project" e conecte seu GitHub
3. Escolha este repositório
4. Preencha as variáveis de ambiente
5. Deploy!

---

## Após deploy
- Use a URL do proxy no seu DecapCMS:
  - `base_url: https://SEU-PROXY.onrender.com`
  - `auth_endpoint: /api/auth`
  - `app_id: Ov23li71mMHWz1qz8ypt`

---

## Código do servidor (server.js)
Veja o arquivo `server.js` neste repositório.
