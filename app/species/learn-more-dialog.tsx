"use client";

// import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  // DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TypographyH5, TypographyP } from "@/components/ui/typography";
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Textarea } from "@/components/ui/textarea";
// import { toast } from "@/components/ui/use-toast";
// import { createBrowserSupabaseClient } from "@/lib/client-utils";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useRouter } from "next/navigation";
import { useState } from "react"; //add type BaseSyntheticEvent later
// import { useForm } from "react-hook-form";
// import { z } from "zod";
import type { Database } from "@/lib/schema";
import Image from "next/image";

// We use zod (z) to define a schema for the "Add species" form.
// zod handles validation of the input values with methods like .string(), .nullable(). It also processes the form inputs with .transform() before the inputs are sent to the database.

// Define kingdom enum for use in Zod schema and displaying dropdown options in the form
// const kingdoms = z.enum(["Animalia", "Plantae", "Fungi", "Protista", "Archaea", "Bacteria"]);

// Define species type
type Species = Database["public"]["Tables"]["species"]["Row"];

// Use Zod to define the shape + requirements of a Species entry; used in form validation
// const speciesSchema = z.object({
//   scientific_name: z
//     .string()
//     .trim()
//     .min(1)
//     .transform((val) => val?.trim()),
//   common_name: z
//     .string()
//     .nullable()
//     // Transform empty string or only whitespace input to null before form submission, and trim whitespace otherwise
//     .transform((val) => (!val || val.trim() === "" ? null : val.trim())),
//   kingdom: kingdoms,
//   total_population: z.number().int().positive().min(1).nullable(),
//   image: z
//     .string()
//     .url()
//     .nullable()
//     // Transform empty string or only whitespace input to null before form submission, and trim whitespace otherwise
//     .transform((val) => (!val || val.trim() === "" ? null : val.trim())),
//   description: z
//     .string()
//     .nullable()
//     // Transform empty string or only whitespace input to null before form submission, and trim whitespace otherwise
//     .transform((val) => (!val || val.trim() === "" ? null : val.trim())),
// });

// type FormData = z.infer<typeof speciesSchema>;

// Default values for the form fields.
/* Because the react-hook-form (RHF) used here is a controlled form (not an uncontrolled form),
fields that are nullable/not required should explicitly be set to `null` by default.
Otherwise, they will be `undefined` by default, which will raise warnings because `undefined` conflicts with controlled components.
All form fields should be set to non-undefined default values.
Read more here: https://legacy.react-hook-form.com/api/useform/
*/
// const defaultValues: Partial<FormData> = {
//   scientific_name: "",
//   common_name: null,
//   kingdom: "Animalia",
//   total_population: null,
//   image: null,
//   description: null,
// };

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
