import React, { createContext, useContext, useState, ReactNode } from "react";
import { Preset, presets as presetData } from "@/lib/presets"; // Adjust the import path as necessary

interface PresetsContextType {
  selectedPreset: Preset;
  setSelectedPreset: (id: Preset) => void;
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
  const [selectedPreset, setSelectedPreset] = useState<Preset>(
    presetData[0]
  );

  return (
    <PresetsContext.Provider value={{ selectedPreset, setSelectedPreset, presets: presetData }}>
      {children}
    </PresetsContext.Provider>
  );
};
