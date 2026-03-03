import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { CATEGORIES } from "@/lib/categories";

interface Props {
  data: { name: string; value: number }[];
  total: number;
}

export function SpendingChart({ data, total }: Props) {
  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-[240px] text-muted-foreground text-sm">
        No data to display
      </div>
    );
  }

  return (
    <div className="relative h-[240px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={65}
            outerRadius={95}
            paddingAngle={3}
            dataKey="value"
            strokeWidth={0}
          >
            {data.map((entry) => (
              <Cell
                key={entry.name}
                fill={CATEGORIES[entry.name]?.color || "hsl(215, 15%, 55%)"}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) => [`$${value.toFixed(2)}`, ""]}
            labelFormatter={(label) => CATEGORIES[label as string]?.label || label}
            contentStyle={{
              borderRadius: "0.75rem",
              border: "1px solid hsl(214, 20%, 90%)",
              fontSize: "0.875rem",
              fontFamily: "Inter, sans-serif",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-xs text-muted-foreground">Total</span>
        <span className="text-2xl font-bold font-display">${total.toFixed(2)}</span>
      </div>
    </div>
  );
}
