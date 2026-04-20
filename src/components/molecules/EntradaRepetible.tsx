import { TrashIcon } from "@phosphor-icons/react"
import { Button } from "@/components/atoms/Button"

interface EntradaRepetibleProps {
  onEliminar: () => void
  children: React.ReactNode
}

export function EntradaRepetible({
  onEliminar,
  children,
}: EntradaRepetibleProps) {
  return (
    <div className="relative rounded-lg border border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/50 p-4 flex flex-col gap-3">
      <div className="absolute top-3 right-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={onEliminar}
          aria-label="Eliminar entrada"
          className="h-7 w-7 text-zinc-400 dark:text-zinc-500 hover:text-red-600"
        >
          <TrashIcon size={16} />
        </Button>
      </div>
      {children}
    </div>
  )
}
