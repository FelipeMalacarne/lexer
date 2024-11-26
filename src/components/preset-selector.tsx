// src/components/ui/preset-selector.tsx

import * as React from "react";
import { PopoverProps } from "@radix-ui/react-popover";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CheckIcon, LucideChevronsDownUp } from "lucide-react";
import { usePresets } from "@/providers/preset-provider";

export function PresetSelector({
  ...props
}) {
  const { presets, selectedPreset, setSelectedPreset } = usePresets();
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen} {...props}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-label="Load a preset..."
          aria-expanded={open}
          className="flex-1 justify-between md:max-w-[200px] lg:max-w-[300px]"
        >
          {presets.find((p) => p.id === selectedPreset.id)?.name ??
            "Load a preset..."}
          <LucideChevronsDownUp className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search presets..." />
          <CommandList>
            <CommandEmpty>No presets found.</CommandEmpty>
            <CommandGroup heading="Presets">
              {presets.map((preset) => (
                <CommandItem
                  key={preset.id}
                  onSelect={() => {
                    setSelectedPreset(preset);
                    setOpen(false);
                  }}
                >
                  {preset.name}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      selectedPreset === preset
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
