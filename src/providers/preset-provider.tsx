import React, { createContext, useContext, useState, ReactNode } from "react";
import { Preset, presets as presetData } from "@/lib/presets"; // Adjust the import path as necessary

interface PresetsContextType {
  selectedPresetId: string;
  setSelectedPresetId: (id: string) => void;
  presets: Preset[];
}

const PresetsContext = createContext<PresetsContextType | undefined>(undefined);

export const usePresets = () => {
  const context = useContext(PresetsContext);
  if (!context) {
    throw new Error("usePresets must be used within a PresetsProvider");
  }
  return context;
};

interface PresetsProviderProps {
  children: ReactNode;
}

export const PresetsProvider: React.FC<PresetsProviderProps> = ({ children }) => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>(
    presetData[0]?.id || ""
  );

  return (
    <PresetsContext.Provider value={{ selectedPresetId, setSelectedPresetId, presets: presetData }}>
      {children}
    </PresetsContext.Provider>
  );
};
