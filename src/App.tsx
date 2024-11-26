import React from "react";
import { ThemeProvider } from "./providers/theme-provider";
import { PresetsProvider } from "./providers/preset-provider";
import Navbar from "./components/navbar";
import LexerComponent from "./components/lexer-component";
import { Toaster } from "./components/ui/toaster";

const App: React.FC = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <PresetsProvider> {/* Wrap app with PresetsProvider */}
        <div className="bg-background min-h-screen font-sans antialiased">
          <Navbar />
          <div className="container mx-auto p-4">
            <LexerComponent />
          </div>
        </div>
        <Toaster />
      </PresetsProvider>
    </ThemeProvider>
  );
};

export default App;