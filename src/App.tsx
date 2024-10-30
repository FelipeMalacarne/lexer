import { ThemeProvider } from "./providers/theme-provider";
import Navbar from "./components/navbar";

function App() {

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="bg-background min-h-screen font-sans antialiased">
          <Navbar />

        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
