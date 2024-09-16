"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TypographyH5, TypographyP } from "@/components/ui/typography";
import type { Database } from "@/lib/schema";
import Image from "next/image";
import { useState } from "react";

// Define species type
type Species = Database["public"]["Tables"]["species"]["Row"];

export default function LearnMoreDialog({ species }: { species: Species }) {
  //const router = useRouter();

  // Control open/closed state of the dialog
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mt-3 w-full">Learn More</Button>
      </DialogTrigger>
      <DialogContent className="max-h-screen overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Learn More</DialogTitle>
          <DialogDescription>Here, you can view a detailed description of the species!</DialogDescription>
          {species.image && (
            <div className="relative h-80 w-full">
              <Image src={species.image} alt={species.scientific_name} fill style={{ objectFit: "cover" }} />
            </div>
          )}
          <TypographyH5>Scientific Name</TypographyH5>
          <TypographyP>This species&apos; scientific name is {species.scientific_name}</TypographyP>
          <TypographyH5>Common Name</TypographyH5>
          <TypographyP>This species&apos; common name is {species.common_name}</TypographyP>
          <TypographyH5>Total Population</TypographyH5>
          <TypographyP>The total population of this species is approximately {species.total_population}</TypographyP>
          <TypographyH5>Kingdom</TypographyH5>
          <TypographyP>This species is part of kingdom {species.kingdom}</TypographyP>
          <TypographyH5>Description</TypographyH5>
          <TypographyP>{species.description}</TypographyP>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
