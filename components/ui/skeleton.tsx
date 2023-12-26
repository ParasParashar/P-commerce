import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-[#191818] dark:bg-slate-800",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
