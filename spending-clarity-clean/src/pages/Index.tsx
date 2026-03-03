import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useExpenses, useMonthlySummary } from "@/hooks/useExpenses";
import { AddExpenseDialog } from "@/components/AddExpenseDialog";
import { ExpenseList } from "@/components/ExpenseList";
import { SpendingChart } from "@/components/SpendingChart";
import { MonthSelector } from "@/components/MonthSelector";
import { SummaryCards } from "@/components/SummaryCards";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet, LogOut, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { CATEGORIES } from "@/lib/categories";

const Index = () => {
  const { user, loading, signOut } = useAuth();
  const [month, setMonth] = useState(new Date());
  const monthStr = format(month, "yyyy-MM");

  const { expenses, isLoading, addExpense, deleteExpense } = useExpenses(monthStr);
  const { total, categoryData } = useMonthlySummary(expenses);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return <Navigate to="/auth" replace />;

  const handleAdd = async (expense: Parameters<typeof addExpense.mutateAsync>[0]) => {
    await addExpense.mutateAsync(expense);
  };

  const handleDelete = (id: string) => {
    deleteExpense.mutate(id, {
      onSuccess: () => toast.success("Expense deleted"),
      onError: () => toast.error("Failed to delete"),
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
              <Wallet className="h-5 w-5 text-primary" />
            </div>
            <h1 className="text-xl font-bold font-display tracking-tight">SpendLens</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground hidden sm:block">
              {user.email}
            </span>
            <Button variant="ghost" size="icon" onClick={signOut} className="h-9 w-9">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        {/* Month + Add */}
        <div className="flex items-center justify-between">
          <MonthSelector month={month} onChange={setMonth} />
          <AddExpenseDialog onAdd={handleAdd} />
        </div>

        {/* Summary Cards */}
        <SummaryCards total={total} categoryData={categoryData} expenseCount={expenses.length} />

        {/* Chart + List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="border-border/50 lg:col-span-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-display">Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <SpendingChart data={categoryData} total={total} />
              {/* Legend */}
              <div className="mt-4 space-y-2">
                {categoryData.map((item) => {
                  const cat = CATEGORIES[item.name];
                  return (
                    <div key={item.name} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat?.color }} />
                        <span>{cat?.label}</span>
                      </div>
                      <span className="font-medium tabular-nums">${item.value.toFixed(2)}</span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 lg:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-display">Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              ) : (
                <ExpenseList expenses={expenses} onDelete={handleDelete} />
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Index;
