import { Button } from "@/components/ui/button"

interface ButtonWithUrlProps 
{
  url: string
}

export function ButtonWithUrl({
  className,
  children,
  url,
  ...props
}: ButtonWithUrlProps & React.ComponentPropsWithoutRef<typeof Button>){

    const redirectUser = () => {
        location.replace(url)
    }
  return (
    <Button 
    className={className} 
    onClick={redirectUser} 
    {...props}
    >
        {children}
    </Button>
  )
}
