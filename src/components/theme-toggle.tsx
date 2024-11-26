import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useTheme } from "@/providers/theme-provider"

export function ThemeToggle() {
    const { theme, setTheme } = useTheme()

    const handleToggle = () => {
        theme === "light" ? setTheme("dark") : setTheme("light")
    }

  return (
        <Button variant="outline" size="icon" onClick={handleToggle}>
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
        </Button>
  )
}