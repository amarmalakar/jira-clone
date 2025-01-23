import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface MemberAvatarProps {
  name: string;
  className?: string;
  fallbackClassName?: string;
}

export default function MemberAvatar({
  name,
  className,
  fallbackClassName
}: MemberAvatarProps) {
  return (
    <Avatar className={cn("size-5 transition border border-neutral-300 rounded-md", className)}>
      <AvatarFallback className={cn(
        "bg-neutral-200 font-medium text-neutral-50 flex items-center",
        fallbackClassName
      )}>
        {name.charAt(0).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
}
