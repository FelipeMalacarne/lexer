import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeProvider } from "./providers/theme-provider";
import { ThemeToggle } from "./components/theme-toggle";
import Navbar from "./components/navbar";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="bg-background min-h-screen font-sans antialiased">
          <Navbar />

          <ThemeToggle />

          <Button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </Button>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
