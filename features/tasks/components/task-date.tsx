import { cn } from "@/lib/utils";
import { differenceInDays, format } from "date-fns";
import React from "react";

interface TaskDateProps {
  value: string;
  className?: string;
}

export default function TaskDate({ value, className }: TaskDateProps) {
  const today = new Date();
  const endDate = new Date(value);
  const diff = differenceInDays(endDate, today);

  let textColor = "text-muted-foreground"

  if (diff <= 3) {
    textColor = "text-red-500"
  } else if (diff <= 7) {
    textColor = "text-orange-500"
  } else if (diff <= 14) {
    textColor = "text-yellow-500"
  }

  return <div className={textColor}>
    <span className={cn("truncate", className)}>
        {format(value, "PPP")}
    </span>
  </div>;
}
