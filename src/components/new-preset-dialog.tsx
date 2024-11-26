import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { usePresets } from "@/providers/preset-provider";

export function NewPresetDialog() {
  const { addPreset } = usePresets();
  const [newPresetName, setNewPresetName] = useState<string>("");
  const [newPresetTokens, setNewPresetTokens] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleAddPreset = () => {
    const name = newPresetName.trim();
    const tokens = newPresetTokens
      .split(",")
      .map((token) => token.trim())
      .filter((token) => token !== "");

    if (name === "" || tokens.length === 0) {
      alert("Por favor, insira um nome válido e pelo menos um token.");
      return;
    }

    addPreset(name, tokens);
    setNewPresetName("");
    setNewPresetTokens("");
    setIsOpen(false); // Close the dialog
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setIsOpen(true)}>
          Add New Preset
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Preset</DialogTitle>
          <DialogDescription>Add new preset to your list.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4 w-full">
            <Label htmlFor="name" className="text-right">
              Preset Name
            </Label>

            <Input
              type="text"
              value={newPresetName}
              onChange={(e) => setNewPresetName(e.target.value)}
              placeholder="Nome do Preset"
              className="border p-2 mb-2 w-full col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Tokens</Label>

            <Input
              type="text"
              value={newPresetTokens}
              onChange={(e) => setNewPresetTokens(e.target.value)}
              placeholder="Tokens (separados por vírgula)"
              className="border p-2 mb-2 w-full col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant={"outline"} onClick={handleAddPreset}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}