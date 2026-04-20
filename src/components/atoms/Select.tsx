import { useId } from "react"
import { cn } from "@/components/ui/cn"

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  opciones: { valor: string; etiqueta: string }[]
}

export function Select({
  label,
  opciones,
  className,
  id,
  ...props
}: SelectProps) {
  const autoId = useId()
  const selectId = id ?? autoId

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={selectId} className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
        {label}
      </label>
      <select
        id={selectId}
        className={cn(
          "h-10 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-900 px-3 text-sm text-zinc-900 dark:text-zinc-100 transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none",
          className,
        )}
        {...props}
      >
        {opciones.map((o) => (
          <option key={o.valor} value={o.valor}>
            {o.etiqueta}
          </option>
        ))}
      </select>
    </div>
  )
}
