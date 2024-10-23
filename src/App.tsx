import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ThemeProvider } from './providers/theme-provider'
import { ThemeToggle } from './components/theme-toggle'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <div className="bg-background min-h-screen font-sans antialiased">

                <ThemeToggle/>

                <Button onClick={() => setCount((count) => count + 1)}>
                count is {count}
                </Button>
                <p>
                Edit <code>src/App.tsx</code> and save to test HMRaa
                </p>

            </div>

        </ThemeProvider>
    </>
  )
}

export default App
