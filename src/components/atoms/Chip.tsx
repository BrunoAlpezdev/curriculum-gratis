import { XIcon } from "@phosphor-icons/react"
import { cn } from "@/components/ui/cn"

interface ChipProps {
  children: React.ReactNode
  onRemove?: () => void
  className?: string
}

export function Chip({ children, onRemove, className }: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full bg-zinc-100 dark:bg-zinc-800 px-3 py-1 text-sm text-zinc-700 dark:text-zinc-300",
        className,
      )}
    >
      {children}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="ml-0.5 rounded-full p-0.5 text-zinc-400 dark:text-zinc-500 hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors cursor-pointer"
          aria-label="Eliminar"
        >
          <XIcon size={14} weight="bold" />
        </button>
      )}
    </span>
  )
}
