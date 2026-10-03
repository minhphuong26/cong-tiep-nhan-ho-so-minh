# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Project context

DuHoc24, a sample "Cổng Tiếp Nhận Hồ Sơ Du Học" (study-abroad application intake portal) for a 6-week programming course. The current state is **Week 1 static UI plus the Week 2 chatbot**. All data except the chatbot is hard-coded in `lib/mock-data.ts`. There is no database or auth yet. `README.md` holds the week-by-week roadmap (Gemini chatbot in week 2, Supabase plus a quote form and admin dashboard in week 3, Gemini document extraction in week 4, Make.com emails in week 5, Supabase magic-link auth and RLS in week 6). Keep new work scoped to the week being implemented. For example, `/login` is deliberately not built yet.

All user-facing copy is Vietnamese (`<html lang="vi">`, Be Vietnam Pro font with the `vietnamese` subset). Keep new UI text in Vietnamese.

## Commands

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run lint     # ESLint 9 flat config (next/core-web-vitals + next/typescript)
```

There is no test framework or test script. `npm run build` is the type check.

Env vars aren't needed yet. `.env.example` lists the ones planned for later weeks (Supabase URL and anon key, `NEXT_PUBLIC_SITE_URL`). Copy it to `.env.local` when wiring the backend.

## Stack notes

- Next.js 16.3 (App Router), React 19.2, TypeScript strict, Tailwind CSS v4. Tailwind has no config file: theme tokens live in `app/globals.css` (`@theme inline` plus oklch CSS variables, light theme). As AGENTS.md says, check `node_modules/next/dist/docs/` before relying on Next.js APIs from memory. For example, the root layout uses the global `LayoutProps<"/">` type.
- shadcn/ui with the **`base-nova` style, built on Base UI (`@base-ui/react`), not Radix**. Primitives in `components/ui/` wrap Base UI components, so their props and composition differ from Radix-based shadcn examples. The landing visuals come from the Tailark registry (`@tailark-oss`, configured in `components.json`). Add components with `npx shadcn add <name>`.
- Path alias `@/*` maps to the repo root.
- `next.config.ts` whitelists `images.unsplash.com` for `next/image`.

## Architecture

- **Routes**:
  - `/` is the landing page: hero, quote form, chat widget, highlights.
  - `/portal` is the student portal: document upload status, extracted info, matching against school minimum scores.
  - `/admin/*` is the dashboard with a shared sidebar layout (`app/admin/layout.tsx`). `/admin` redirects to `/admin/requests`.
- **Data layer**: `lib/mock-data.ts` is the single source of both the domain types and the mock records: `School`, `AdmissionRequest`, `StudentProfile`, `Conversation`, `currentStudent` and others. Pages import directly from it. These types and arrays are what later weeks replace with Supabase tables (`requests`, `schools`, `conversations`/`messages`, `student_profiles`), so keep their shapes aligned with that plan when editing.
- **Status enums** use Vietnamese snake_case string literals (`DocStatus`: `chua_nop | dang_xu_ly | hop_le | can_nop_lai`; `RequestStatus`: `cho_duyet | da_duyet | tu_choi`; `ServicePackage`: `co_ban | toan_dien`). `components/status-badge.tsx` maps each value to its Vietnamese label, color tone and icon. Add any new status there instead of styling badges inline.
- **Chatbot**: `components/landing/chat-widget.tsx` keeps the conversation in React state and POSTs the full history to `app/api/chat/route.ts`, which calls Gemini (`@google/genai`, model `GEMINI_MODEL`) with `GEMINI_API_KEY` from `.env`. The bot must answer only from the fixed QnA in `lib/chatbot.ts`, which is injected as the `systemInstruction`. To change what the bot knows, edit `qnaList` there.
- **Server vs client**: pages are Server Components. `"use client"` is limited to interactive leaves: `chat-widget`, `quote-form`, `site-header`, the admin `sidebar` (uses `usePathname` for active state) and the Base UI wrappers that need it.
- Components are grouped by surface: `components/landing/`, `components/portal/`, `components/admin/`, with shared pieces (`site-header`, `site-footer`, `logo`, `status-badge`) at the top level.

## Quy tắc Git

- Luôn hỏi xác nhận trước khi push lên Github
- Không bao giờ commit file .env hoặc bất kỳ file chứa API key
