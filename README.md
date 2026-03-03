# Spending Clarity

A modern expense tracking application that helps you understand and manage your spending habits with visual insights and detailed analytics.

## Features

- **Track Expenses**: Easily add and categorize your expenses
- **Visual Charts**: Interactive charts to visualize your spending patterns
- **Monthly Overview**: Browse expenses by month with a convenient month selector
- **Expense Analytics**: Summary cards showing key spending metrics
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Secure Authentication**: User authentication via Supabase
- **Real-time Data**: Instant updates and synchronization

## Tech Stack

- **Frontend**:
  - [React 18](https://react.dev) - UI library
  - [TypeScript](https://www.typescriptlang.org) - Type safety
  - [Vite](https://vitejs.dev) - Build tool and dev server
  - [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework
  - [Shadcn UI](https://ui.shadcn.com) - High-quality React components
  - [Recharts](https://recharts.org) - Charting library

- **Backend**:
  - [Supabase](https://supabase.com) - PostgreSQL database and authentication

- **Development**:
  - [Vitest](https://vitest.dev) - Unit testing framework
  - [ESLint](https://eslint.org) - Code linting
  - [React Hook Form](https://react-hook-form.com) - Form handling
  - [React Router](https://reactrouter.com) - Client-side routing

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- bun, npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/spending-clarity.git
cd spending-clarity
```

2. Install dependencies:
```bash
bun install
# or
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory and add your Supabase credentials:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server:
```bash
bun run dev
```

The application will open at `http://localhost:5173`

## Available Scripts

- `bun run dev` - Start the development server
- `bun run build` - Build for production
- `bun run build:dev` - Build for development
- `bun run lint` - Run ESLint
- `bun run preview` - Preview production build locally
- `bun run test` - Run tests once
- `bun run test:watch` - Run tests in watch mode

## Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Shadcn UI components
│   ├── AddExpenseDialog.tsx
│   ├── ExpenseList.tsx
│   ├── MonthSelector.tsx
│   ├── SpendingChart.tsx
│   ├── SummaryCards.tsx
│   └── NavLink.tsx
├── pages/              # Page components
│   ├── Auth.tsx
│   ├── Index.tsx
│   └── NotFound.tsx
├── hooks/              # Custom React hooks
│   ├── useAuth.tsx
│   ├── useExpenses.tsx
│   └── use-mobile.tsx
├── integrations/       # Third-party integrations
│   └── supabase/      # Supabase client setup
├── lib/                # Utilities and helpers
│   ├── categories.ts
│   └── utils.ts
└── test/               # Test files
```

## Usage

1. **Sign In**: Create an account or sign in with your existing credentials
2. **Add Expense**: Click the "Add Expense" button to record a new expense with category and amount
3. **View Expenses**: See all your expenses in the expense list organized by date
4. **Analyze**: Check out the spending charts and summary cards for insights into your spending patterns
5. **Filter by Month**: Use the month selector to view expenses for specific time periods

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you encounter any issues or have questions, please open an issue on GitHub.
