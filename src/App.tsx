// src/App.tsx

import React, { useState } from "react";
import { presets as presetData } from "@/lib/presets"; // Adjust the import path as necessary
import { ThemeProvider } from "./providers/theme-provider";
import Navbar from "./components/navbar";
import LexerComponent from "./components/lexer-component";

const App: React.FC = () => {
  // State to hold the selected preset ID
  const [selectedPresetId, setSelectedPresetId] = useState<string>(
    presetData.find((preset) => preset.name === "default")?.id ||
      presetData[0].id
  );

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="bg-background min-h-screen font-sans antialiased">
        <Navbar
          selectedPresetId={selectedPresetId}
          onSelectPreset={setSelectedPresetId}
          presets={presetData}
        />
        <div className="container mx-auto p-4">
          <LexerComponent presetId={selectedPresetId} />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
