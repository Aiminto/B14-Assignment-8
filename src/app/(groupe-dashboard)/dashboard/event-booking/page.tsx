"use client";

import { Save, Trash2 } from "lucide-react";
import Link from "next/link";
import { type FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const categories = [
  "Beach",
  "Mountain",
  "Cultural",
  "Adventure",
  "Luxury",
  "Honeymoon",
];

type FormState = {
  name: string;
  country: string;
  category: string;
  price: string;
  duration: string;
  departureDate: string;
  imageUrl: string;
  description: string;
};

const emptyForm: FormState = {
  name: "",
  country: "",
  category: "",
  price: "",
  duration: "",
  departureDate: "",
  imageUrl: "",
  description: "",
};

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label>{label}</Label>
      {children}
    </div>
  );
}

export default function AddDestinationPage() {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [submitted, setSubmitted] = useState(false);

  const setField = (field: keyof FormState) => (value: string | null) =>
    setForm((prev) => ({ ...prev, [field]: value ?? "" }));

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Only NEXT_PUBLIC_* vars are inlined into the client bundle, so this
    // must be process.env.NEXT_PUBLIC_BASE_URL_SERVER (not BASE_URL_SERVER).
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_SERVER;

    if (!baseUrl) {
      console.error(
        "NEXT_PUBLIC_BASE_URL_SERVER is not set — restart the dev server after editing .env"
      );
      return;
    }

    console.log("Form:", form);

    try {
      const res = await fetch(`${baseUrl}/event-booking`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      console.log("Status:", res.status);

      const data = await res.json();
      console.log("response from server", data);

      if (!res.ok) {
        console.error("Server rejected the payload:", data);
        return;
      }

      console.log("New travel package:", form);
      setSubmitted(true);
      setForm(emptyForm);
    } catch (error) {
      // fetch itself failed (server down, wrong URL, CORS, or non-JSON body)
      console.error("Failed to submit travel package:", error);
    }
  }


  return (
    <main className="min-h-screen bg-white px-6 py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-4xl tracking-tight sm:text-5xl">
          Add New Travel Package
        </h1>
        {submitted ? (
          <p className="mt-2 text-sm text-brand">Travel package added.</p>
        ) : null}
      </div>

      <Card className="mx-auto mt-10 max-w-xl rounded-md py-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 px-8">
          <Field label="Destination Name">
            <Input
              required
              className="h-9"
              placeholder="Bali Paradise"
              value={form.name}
              onChange={(e) => setField("name")(e.target.value)}
            />
          </Field>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Country">
              <Input
                required
                className="h-9"
                placeholder="Indonesia"
                value={form.country}
                onChange={(e) => setField("country")(e.target.value)}
              />
            </Field>

            <Field label="Category">
              <Select
                value={form.category}
                onValueChange={(value) => setField("category")(value)}
              >
                <SelectTrigger className="h-9 w-full rounded-lg">
                  <SelectValue>
                    {form.category ? (
                      form.category
                    ) : (
                      <span className="text-muted-foreground">Beach</span>
                    )}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            <Field label="Price (USD)">
              <Input
                required
                type="number"
                min="0"
                className="h-9"
                placeholder="e.g., 1299"
                value={form.price}
                onChange={(e) => setField("price")(e.target.value)}
              />
            </Field>

            <Field label="Duration">
              <Input
                className="h-9"
                placeholder="e.g., 7 Days/6 Nights"
                value={form.duration}
                onChange={(e) => setField("duration")(e.target.value)}
              />
            </Field>
          </div>

          <Field label="Departure Date">
            <Input
              type="date"
              className="h-9"
              value={form.departureDate}
              onChange={(e) => setField("departureDate")(e.target.value)}
            />
          </Field>

          <Field label="Image URL">
            <Input
              type="url"
              className="h-9"
              placeholder="https://example.com/image.jpg"
              value={form.imageUrl}
              onChange={(e) => setField("imageUrl")(e.target.value)}
            />
          </Field>

          <Field label="Description">
            <Textarea
              rows={5}
              className="min-h-24"
              placeholder="Describe the travel experience..."
              value={form.description}
              onChange={(e) => setField("description")(e.target.value)}
            />
          </Field>

          <div className="mt-3 flex items-center justify-end gap-3">
            <Button
              type="submit"
              className="gap-1.5 bg-brand text-black hover:bg-brand/90"
            >
              <Save /> Add Travel Package
            </Button>
            <Button
              type="button"
              variant="outline"
              render={<Link href="/" />}
              className="gap-1.5 border-red-300 text-red-500 hover:border-red-300 hover:bg-red-50 hover:text-red-600"
            >
              <Trash2 /> Cancel
            </Button>

          </div>
        </form>
      </Card>
    </main>
  );
}
