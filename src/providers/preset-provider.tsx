import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Preset, presets as presetData } from "@/lib/presets";
import { v4 as uuidv4 } from "uuid";

interface PresetsContextType {
  selectedPreset: Preset;
  setSelectedPreset: (preset: Preset) => void;
  presets: Preset[];
  addPreset: (name: string, tokens: string[]) => void;
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

export const PresetsProvider: React.FC<PresetsProviderProps> = ({
  children,
}) => {
  const localStorageKey = "presets";

  const [presets, setPresets] = useState<Preset[]>(() => {
    const storedPresets = localStorage.getItem(localStorageKey);
    return storedPresets ? JSON.parse(storedPresets) : presetData;
  });

  const [selectedPreset, setSelectedPreset] = useState<Preset>(() => {
    const storedPresets = localStorage.getItem(localStorageKey);
    const initialPresets: Preset[] = storedPresets
      ? JSON.parse(storedPresets)
      : presetData;
    return (
      initialPresets.find(
        (preset) => preset.name.toLowerCase() === "default"
      ) || initialPresets[0]
    );
  });

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(presets));
  }, [presets]);

  const addPreset = (name: string, tokens: string[]) => {
    if (
      presets.some((preset) => preset.name.toLowerCase() === name.toLowerCase())
    ) {
      alert("Preset with this name already exists.");
      return;
    }

    const newPreset: Preset = {
      id: uuidv4(),
      name,
      tokens,
    };

    setPresets((prevPresets) => [...prevPresets, newPreset]);
    setSelectedPreset(newPreset);
  };

  return (
    <PresetsContext.Provider
      value={{ selectedPreset, setSelectedPreset, presets, addPreset }}
    >
      {children}
    </PresetsContext.Provider>
  );
};
