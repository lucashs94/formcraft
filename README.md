# Form Builder

A form creation platform featuring a drag-and-drop editor, shareable link publishing, and a submission statistics dashboard.

## Tech Stack

**Framework:** Next.js (App Router), TypeScript

**Auth:** Clerk

**Database:** Prisma (PostgreSQL)

**UI:** Shadcn UI (Radix), Tailwind CSS, DnD Kit (drag-and-drop)

**Forms & Validation:** React Hook Form, Zod

## Features

- Visual drag-and-drop editor for building forms
- Available field types: text, number, checkbox, select, date, textarea, subtitle, paragraph, separator, spacer
- Form publishing via shareable URL
- Public submission page for collecting responses
- Dashboard with form statistics (visits, submissions, conversion rate)
- Submission listing per form
- Authentication and multi-tenancy via Clerk
- Dark/light theme

## Architecture

```
actions/
  Form/               # Server Actions (form CRUD, publishing, submission)
  Stats/              # Server Actions (statistics)

app/
  (auth)/             # Login/register pages (Clerk)
  (dashboard)/
    builder/[id]/     # Drag-and-drop form editor
    forms/[id]/       # Form details and submissions
    page.tsx          # Dashboard with statistics cards
  submit/[formUrl]/   # Public submission page

components/
  fields/             # Field type components (TextField, DateField, CheckboxField, etc.)
  CreateFormBtn.tsx   # New form creation button
  FormElements.tsx    # Available elements registry
```

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL
- [Clerk](https://clerk.com) account

### Setup

```bash
npm install
cp example.env .env         # configure Clerk keys and DATABASE_URL
npx prisma migrate dev      # create the tables
npm run dev                 # starts at http://localhost:3000
```