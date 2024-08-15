import { cn } from "@/lib/utils"
import * as React from "react"

export interface DivProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const Card = React.forwardRef<HTMLDivElement, DivProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn(
          "bg-white_secondary rounded-[20px] xl:rounded-[30px] 2xl:rounded-[50px] px-5 lg:px-[50px] xl:px-[100px] 2xl:px-[143px] py-[40px] xl:py-[60px] 2xl:py-[80px]",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Card.displayName = "Card"

export { Card }
