# Crypto Portfel

**Version:** `0.1.1`

> _in development_

[![Vercel](https://img.shields.io/badge/Crypto-ITDextra-red.svg)](https://crypto-itdextra.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16.0.0-black.svg)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38bdf8.svg)](https://tailwindcss.com)
[![React](https://img.shields.io/badge/React-19.2.0-61dafb.svg)](https://reactjs.org)
[![Redux](https://img.shields.io/badge/Redux_Toolkit-2.9.2-764abc.svg)](https://redux-toolkit.js.org)
[![Radix UI](https://img.shields.io/badge/Radix_UI-1.4.3-191919.svg)](https://www.radix-ui.com)
[![DnD Kit](https://img.shields.io/badge/DnD_Kit-6.3.1-ff6b6b.svg)](https://dndkit.com)

## О проекте

`crypto-portfel` - это современное веб-приложение для управления криптовалютным портфелем.
Построено на **Next.js 16 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS 4** и следует архитектуре **Feature-Sliced Design (FSD)**.

## Технологии

- **Next.js 16** (App Router)
- **React 19** + **React DOM**
- **TypeScript 5**
- **Tailwind CSS 4** + `tw-animate-css`
- **FSD (Feature-Sliced Design)** - модульная, масштабируемая архитектура
- **Redux Toolkit** + **React Redux** - управление состоянием
- **React Hook Form** + **Zod** - валидация форм
- **@tanstack/react-table** - таблицы
- **@dnd-kit** - drag & drop (перемещение активов)
- **GSAP** + **Framer Motion** - анимации
- **Radix UI** + **Base UI Components** - доступные примитивы

## Структура проекта (FSD)

```
src/
├── app/                # Next.js App Router
├── pages/              # (если используются)
├── entities/           # Бизнес-сущности (Asset, Portfolio, User)
├── features/           # Фичи (AddAsset, EditPortfolio, DragSorting)
├── widgets/            # Составные UI-блоки (PortfolioTable, DashboardHeader)
└── shared/             # Переиспользуемые утилиты, UI, lib
    ├── ui/             # Компоненты (В том числе самописные)
    ├── lib/            # Хелперы, API, данные
    ├── config/         # Роутинг
    └── constants       # Константы
```

## Установка и запуск

```bash
# Клонирование (если нужно)
git clone <repo-url>
cd crypto-portfel

# Установка зависимостей
npm install
# или
yarn
# или
pnpm install

# Запуск в dev-режиме
npm run dev
```

Открыть: [http://localhost:3000](http://localhost:3000)

## Скрипты

| Скрипт          | Описание                     |
| --------------- | ---------------------------- |
| `npm run dev`   | Запуск dev-сервера           |
| `npm run build` | Сборка продакшена            |
| `npm run start` | Запуск собранного приложения |
| `npm run lint`  | Запуск ESLint                |

## Что дальше?

- [ ] Подключение реального API (CoinGecko / Binance)
- [ ] Аутентификация (NextAuth / Clerk)
- [ ] Графики (Chart.js / Recharts)
- [ ] Экспорт/импорт портфеля
- [ ] PWA + оффлайн-режим
- [ ] Тёмная тема (уже в процессе)

## 📄 Лицензия

Проект закрытый (`private: true`).
Для внутреннего использования / дальнейшей разработки.

[MIT](https://itdextra.ru) © ITDextra

> **Warning:** Это тестовая версия. Не используйте в продакшене.
