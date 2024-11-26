import { usePresets } from "@/providers/preset-provider";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { NewPresetDialog } from "./new-preset-dialog";

export function ActivePresetCard() {
  const { selectedPreset } = usePresets();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Preset:</CardTitle>
        <CardDescription>{selectedPreset.name}</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-60">
            {selectedPreset.tokens.map((token) => (
              <>
                <div key={token} className="text-sm">
                  {token}
                </div>
                <Separator className="my-2" />
              </>
            ))}
        </ScrollArea>

      </CardContent>
      <CardFooter>
        <NewPresetDialog/>
      </CardFooter>
    </Card>
  );
}
