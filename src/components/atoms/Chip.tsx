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
        "inline-flex items-center gap-1 rounded-full bg-zinc-100 px-3 py-1 text-sm text-zinc-700",
        className,
      )}
    >
      {children}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="ml-0.5 rounded-full p-0.5 text-zinc-400 hover:bg-zinc-200 hover:text-zinc-600 transition-colors cursor-pointer"
          aria-label="Eliminar"
        >
          <XIcon size={14} weight="bold" />
        </button>
      )}
    </span>
  )
}
