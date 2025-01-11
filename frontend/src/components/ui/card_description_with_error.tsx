import { cn } from "@/lib/utils"
import {
  CardDescription,
} from "@/components/ui/card"


interface DescriptionProps
extends React.ComponentPropsWithoutRef<"div">
{
  isError: boolean
}



export function CardDescriptionWithError({
  className,
  isError,
  ...props
}: DescriptionProps) {
  let descriptionClassName = ""

  if (isError) {
    descriptionClassName = " text-red-600 "
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <CardDescription>
            <p className={descriptionClassName}>{props.children}</p>
      </CardDescription>
    </div>
  )
}
