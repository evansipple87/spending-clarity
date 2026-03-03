import { Database } from "@/integrations/supabase/types";
import { CATEGORIES } from "@/lib/categories";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

type ExpenseRow = Database["public"]["Tables"]["expenses"]["Row"];

interface Props {
  expenses: ExpenseRow[];
  onDelete: (id: string) => void;
}

export function ExpenseList({ expenses, onDelete }: Props) {
  if (expenses.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p className="text-lg font-display">No expenses yet</p>
        <p className="text-sm mt-1">Add your first expense to start tracking.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {expenses.map((expense) => {
        const cat = CATEGORIES[expense.category];
        const Icon = cat?.icon;
        return (
          <div
            key={expense.id}
            className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border/50 hover:border-border transition-colors group"
          >
            <div
              className="flex items-center justify-center w-10 h-10 rounded-lg shrink-0"
              style={{ backgroundColor: `${cat?.color}15` }}
            >
              {Icon && <Icon className="h-5 w-5" style={{ color: cat?.color }} />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2">
                <span className="font-medium text-sm">{cat?.label}</span>
                {expense.note && (
                  <span className="text-xs text-muted-foreground truncate">{expense.note}</span>
                )}
              </div>
              <span className="text-xs text-muted-foreground">
                {format(new Date(expense.date), "MMM d, yyyy")}
              </span>
            </div>
            <span className="font-display font-semibold tabular-nums">
              ${Number(expense.amount).toFixed(2)}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 text-muted-foreground hover:text-destructive"
              onClick={() => onDelete(expense.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        );
      })}
    </div>
  );
}
