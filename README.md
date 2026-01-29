# Form Builder

Plataforma de criação de formulários com editor drag-and-drop, publicação por link e dashboard de estatísticas de submissões.

## Tech Stack

**Framework:** Next.js (App Router), TypeScript

**Auth:** Clerk

**Database:** Prisma (PostgreSQL)

**UI:** Shadcn UI (Radix), Tailwind CSS, DnD Kit (drag-and-drop)

**Forms & Validação:** React Hook Form, Zod

## Funcionalidades

- Editor visual drag-and-drop para criação de formulários
- Campos disponíveis: texto, número, checkbox, select, data, textarea, subtítulo, parágrafo, separador, espaçador
- Publicação de formulários por URL compartilhável
- Página pública de submissão de respostas
- Dashboard com estatísticas de formulários (visitas, submissões, taxa de conversão)
- Listagem de submissões por formulário
- Autenticação e multi-tenancy via Clerk
- Tema dark/light

## Arquitetura

```
actions/
  Form/               # Server Actions (CRUD de formulários, publicação, submissão)
  Stats/              # Server Actions (estatísticas)

app/
  (auth)/             # Páginas de login/registro (Clerk)
  (dashboard)/
    builder/[id]/     # Editor drag-and-drop do formulário
    forms/[id]/       # Detalhes e submissões do formulário
    page.tsx          # Dashboard com cards de estatísticas
  submit/[formUrl]/   # Página pública de submissão

components/
  fields/             # Componentes de cada tipo de campo (TextField, DateField, CheckboxField, etc.)
  CreateFormBtn.tsx   # Botão de criação de novo formulário
  FormElements.tsx    # Registry de elementos disponíveis
```

## Como Rodar

### Pré-requisitos
- Node.js 18+
- PostgreSQL
- Conta no [Clerk](https://clerk.com)

### Setup

```bash
npm install
cp example.env .env         # configure Clerk keys e DATABASE_URL
npx prisma migrate dev      # cria as tabelas
npm run dev                 # inicia em http://localhost:3000
```

## Autor

**Lucas Silva** - [LinkedIn](https://www.linkedin.com/in/lucashs94/) | [GitHub](https://github.com/lucashs94) | h7.lucas@gmail.com
