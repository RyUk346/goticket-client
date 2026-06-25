# GoTicket — Online Ticket Booking Platform

GoTicket is a full-stack MERN platform for browsing and booking transport tickets — **bus, train, launch, and plane** — across Bangladesh. Travellers can search routes, book seats, and pay securely; vendors can list and manage their tickets; and admins moderate the marketplace.

This repository is the **Next.js client**. It talks to a separate Express + MongoDB API.

## 🔗 Live URL

**https://goticket-client.vercel.app/**

- Client repository: https://github.com/RyUk346/goticket-client

## 🎯 Purpose

Booking transport tickets is often spread across many sites and operators. GoTicket brings buses, trains, launches, and flights into one clean, trustworthy booking experience with secure payments, verified vendors, and role-based dashboards — so booking any journey is fast, fair, and transparent.

## ✨ Key Features

- **Browse & search tickets** — search by route, filter by transport type, and sort by price, with pagination.
- **Ticket details** — full trip info, perks, a live **countdown to departure**, and seat/quantity selection.
- **Authentication** — email/password and Google sign-in via BetterAuth (JWT-based), with three roles: **user, vendor, admin**.
- **User dashboard** — profile with stats, booked tickets (pay / cancel / download), and payment history.
- **Stripe payments** — pay for accepted bookings, then download a **PDF e-ticket**.
- **Vendor dashboard** — add/edit/delete tickets with **image upload**, accept/reject booking requests, and view **revenue charts**.
- **Admin dashboard** — approve/reject vendor tickets, **advertise** up to 6 tickets on the homepage, manage users, and flag fraudulent vendors.
- **Polished UI** — responsive layout, dark/light theme, and a consistent design system.

## 🛠 Tech Stack

- **Framework:** Next.js 16 (App Router) + React 19
- **Styling:** Tailwind CSS v4
- **Auth:** BetterAuth (email/password + Google, JWT) with a MongoDB adapter
- **Payments:** Stripe
- **Database:** MongoDB
- **Deployment:** Vercel

## 📦 npm Packages Used

**Core**

- `next`, `react`, `react-dom`

**Styling & theming**

- `tailwindcss`, `@tailwindcss/postcss` — utility-first CSS
- `clsx`, `tailwind-merge` — conditional class composition
- `next-themes` — dark/light mode

**Authentication & database**

- `better-auth` — authentication (email/password + Google, JWT)
- `mongodb` — MongoDB adapter for BetterAuth
- `server-only` — guard server-only modules

**Payments**

- `stripe` — server-side Stripe SDK
- `@stripe/stripe-js`, `@stripe/react-stripe-js` — Stripe Elements checkout

**UI & interaction**

- `react-icons` — icon set
- `react-hook-form` — forms & validation
- `react-hot-toast` — toast notifications
- `swiper` — homepage carousel
- `recharts` — vendor revenue charts

**Documents**

- `jspdf` — generate downloadable PDF tickets

**Image hosting**

- imgbb (used via REST API for ticket image uploads — no npm package)

**Dev**

- `eslint`, `eslint-config-next`


## 👤 Roles

New accounts are **users** by default. Promote an account to `vendor` or `admin` using the API's `set-role.js` script, then sign in again to see the matching dashboard.

- `/` — home (advertised + latest tickets)
- `/tickets` — all approved tickets (search / filter / sort)
- `/tickets/[id]` — ticket details + booking
- `/login`, `/register` — authentication
- `/dashboard` — redirects to your role's dashboard
