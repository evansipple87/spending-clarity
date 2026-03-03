import { Card, CardContent } from "@/components/ui/card";
import { CATEGORIES } from "@/lib/categories";
import { TrendingUp, Layers } from "lucide-react";

interface Props {
  total: number;
  categoryData: { name: string; value: number }[];
  expenseCount: number;
}

export function SummaryCards({ total, categoryData, expenseCount }: Props) {
  const topCategory = categoryData[0];
  const cat = topCategory ? CATEGORIES[topCategory.name] : null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Card className="border-border/50">
        <CardContent className="p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total Spent</p>
              <p className="text-2xl font-bold font-display">${total.toFixed(2)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/50">
        <CardContent className="p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
              <Layers className="h-5 w-5 text-accent-foreground" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Transactions</p>
              <p className="text-2xl font-bold font-display">{expenseCount}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/50">
        <CardContent className="p-5">
          <div className="flex items-center gap-3">
            {cat && (
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${cat.color}15` }}
              >
                <cat.icon className="h-5 w-5" style={{ color: cat.color }} />
              </div>
            )}
            <div>
              <p className="text-xs text-muted-foreground">Top Category</p>
              <p className="text-2xl font-bold font-display">
                {cat?.label || "—"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
