// src/components/Navbar.tsx

import React from "react";
import { PresetSelector } from "./preset-selector";
import { ThemeToggle } from "./theme-toggle";
import { Preset } from "@/lib/presets";

interface NavbarProps {
  selectedPresetId: string;
  onSelectPreset: (presetId: string) => void;
  presets: Preset[];
}

const Navbar: React.FC<NavbarProps> = ({
  selectedPresetId,
  onSelectPreset,
  presets,
}) => {
  return (
    <div className="flex-col flex">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <h1 className="text-lg font-semibold">Lexer</h1>

          <div className="ml-auto flex items-center space-x-4">
            <PresetSelector
              presets={presets}
              selectedPresetId={selectedPresetId}
              onSelectPreset={onSelectPreset}
            />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
