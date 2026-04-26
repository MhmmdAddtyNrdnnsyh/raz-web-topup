## Project Overview

WebTopup is a modern all-in-one top-up web application built using Next.js.
It supports multiple services such as game top-ups, mobile credits, and other digital products.

Target users:

* Students
* General users
* Gamers

Goals:

* Fast and simple user experience
* Feature-rich system
* Mobile-first design

---

## Tech Stack

* Framework: Next.js (App Router)
* Language: TypeScript
* Styling: Tailwind CSS
* UI: shadcn/ui
* Animation: Framer Motion
* Data Fetching: React Query
* Backend: Laravel (REST API)

---

## Core Principles

* Use scalable architecture
* Prioritize simplicity over unnecessary complexity
* Build reusable components aggressively
* Maintain clean and readable code
* Focus on performance and UX

---

## Architecture Rules

### General Structure (Feature-Based)

Organize code by feature, not by type.

Example:

* /app
* /features

  * /topup
  * /auth
  * /transaction
* /components

  * /ui (shared components)
* /lib
* /hooks
* /services

---

### Separation of Concerns

* UI components → rendering only
* Hooks → state & logic
* Services → API calls
* Features → business logic grouping

---

## Frontend Rules

### Components

* Use functional components only
* Keep components small and reusable
* Separate UI and logic (use hooks)
* Avoid prop drilling (use hooks or state management if needed)

---

### Styling

* Use Tailwind CSS ONLY
* Do NOT use inline CSS
* Do NOT use jQuery
* Follow consistent spacing and layout system
* Support both light and dark mode

---

### Animation

* Use Framer Motion for animations
* Keep animations smooth and not excessive
* Focus on UX enhancement, not decoration

---

### Responsive Design

* Mobile-first approach is REQUIRED
* Ensure all components are responsive
* Optimize layout for small screens first

---

## Data Fetching

* Use React Query for all API interactions
* Do NOT use raw fetch directly inside components
* Use custom hooks for data fetching

Example:

* useTopupProducts()
* useTransactionHistory()

---

## API Rules

* Use REST API from Laravel backend
* Centralize API logic inside /services
* Handle errors properly
* Always validate API responses

---

## Feature Flow (Top-Up)

Standard flow MUST follow this order:

1. Select category (game, pulsa, etc)
2. Input user information
3. Select nominal
4. Select payment method
5. Checkout
6. Authentication (login if required)
7. Transaction processing
8. Show result / success page

---

## Features

* Multi-category top-up (game, pulsa, etc)
* User input validation
* Dynamic nominal selection
* Payment method selection
* Checkout system
* Login system (for checkout)
* Transaction history

---

## Naming Convention

* Variables: camelCase
* Functions: camelCase
* Components: PascalCase
* Files: kebab-case
* Hooks: useSomething
* Constants: UPPER_CASE

Examples:

* useTopup.ts
* topup-service.ts
* TransactionCard.tsx

---

## Code Quality

* Write clean and readable code
* Add comments ONLY for complex logic
* Avoid unnecessary abstraction
* Avoid duplicated code (DRY principle)
* Prefer composition over inheritance

---

## Do

* Build reusable components
* Keep logic inside hooks
* Use proper TypeScript typing
* Maintain consistent structure
* Optimize performance when needed

---

## Don't

* Do NOT use jQuery
* Do NOT use inline styles
* Do NOT mix business logic inside UI components
* Do NOT create overly complex architecture
* Do NOT ignore mobile responsiveness

---

## UI/UX Rules

* Design must be modern and clean
* Do NOT copy existing top-up websites
* Focus on originality and innovation
* Maintain consistent design system
* Ensure fast interaction and minimal friction

---

## AI Behavior Instructions

* Always follow the defined architecture
* Always prioritize reusable and scalable solutions
* Do NOT generate messy or inconsistent code
* Prefer simple and clean implementations
* When generating code:

  * Use best practices
  * Keep structure organized
  * Ensure TypeScript safety

---

## Output Preference

* Prefer full file output when generating components
* Include only necessary explanation
* Focus on implementation quality

---
