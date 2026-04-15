import { useId } from "react"
import { cn } from "@/components/ui/cn"

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  error?: string
}

export function Textarea({
  label,
  error,
  className,
  id,
  ...props
}: TextareaProps) {
  const autoId = useId()
  const textareaId = id ?? autoId

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={textareaId}
        className="text-sm font-medium text-zinc-700"
      >
        {label}
      </label>
      <textarea
        id={textareaId}
        className={cn(
          "min-h-[80px] rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none resize-y",
          error && "border-red-500 focus:border-red-500 focus:ring-red-500",
          className,
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  )
}
