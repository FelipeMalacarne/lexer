import React from "react";
import { PresetSelector } from "./preset-selector";
import { usePresets } from "@/providers/preset-provider";

const Navbar: React.FC = () => {
  const { selectedPresetId, setSelectedPresetId, presets } = usePresets();

  return (
    <div className="flex-col flex">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <h1 className="text-lg font-semibold">Lexer</h1>

          <div className="ml-auto flex items-center space-x-4">
            <PresetSelector
              presets={presets}
              selectedPresetId={selectedPresetId}
              onSelectPreset={setSelectedPresetId}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
