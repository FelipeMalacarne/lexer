import { ThemeProvider } from "./providers/theme-provider";
import Navbar from "./components/navbar";
import LexerComponent from "./components/lexer-component";

function App() {
    
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="bg-background min-h-screen font-sans antialiased">
          <Navbar />
            <div className="container mx-auto p-4">
                <LexerComponent />
            </div>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
