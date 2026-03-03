import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Database } from "@/integrations/supabase/types";

type ExpenseCategory = Database["public"]["Enums"]["expense_category"];
type ExpenseRow = Database["public"]["Tables"]["expenses"]["Row"];

export interface ExpenseInsert {
  amount: number;
  category: ExpenseCategory;
  date: string;
  note?: string;
}

export function useExpenses(month?: string) {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["expenses", user?.id, month],
    queryFn: async () => {
      if (!user) return [];
      let q = supabase
        .from("expenses")
        .select("*")
        .eq("user_id", user.id)
        .order("date", { ascending: false });

      if (month) {
        const start = `${month}-01`;
        const endDate = new Date(parseInt(month.split("-")[0]), parseInt(month.split("-")[1]), 0);
        const end = `${month}-${String(endDate.getDate()).padStart(2, "0")}`;
        q = q.gte("date", start).lte("date", end);
      }

      const { data, error } = await q;
      if (error) throw error;
      return data as ExpenseRow[];
    },
    enabled: !!user,
  });

  const addExpense = useMutation({
    mutationFn: async (expense: ExpenseInsert) => {
      if (!user) throw new Error("Not authenticated");
      const { error } = await supabase.from("expenses").insert({
        ...expense,
        user_id: user.id,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
  });

  const deleteExpense = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("expenses").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
  });

  return { expenses: query.data ?? [], isLoading: query.isLoading, addExpense, deleteExpense };
}

export function useMonthlySummary(expenses: ExpenseRow[]) {
  const total = expenses.reduce((sum, e) => sum + Number(e.amount), 0);
  const byCategory = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + Number(e.amount);
    return acc;
  }, {} as Record<string, number>);

  const categoryData = Object.entries(byCategory)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  return { total, categoryData };
}
