import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format, addMonths, subMonths } from "date-fns";

interface Props {
  month: Date;
  onChange: (date: Date) => void;
}

export function MonthSelector({ month, onChange }: Props) {
  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onChange(subMonths(month, 1))}>
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <span className="font-display font-medium text-sm min-w-[120px] text-center">
        {format(month, "MMMM yyyy")}
      </span>
      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onChange(addMonths(month, 1))}>
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
