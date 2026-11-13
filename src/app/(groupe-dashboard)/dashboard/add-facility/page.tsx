"use client";

import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { CheckCircle2, ImageIcon } from "lucide-react";

const FACILITY_TYPES = [
  "Banquet Hall",
  "Conference Room",
  "Auditorium",
  "Party Hall",
  "Outdoor Venue",
  "Meeting Room",
  "Sports Arena",
];

type FormState = {
  name: string;
  type: string;
  imageUrl: string;
  location: string;
  pricePerHour: string;
  capacity: string;
  description: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const INITIAL_STATE: FormState = {
  name: "",
  type: "",
  imageUrl: "",
  location: "",
  pricePerHour: "",
  capacity: "",
  description: "",
};

const isValidUrl = (value: string) => {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
};

const validate = (values: FormState): FormErrors => {
  const errors: FormErrors = {};

  if (!values.name.trim()) errors.name = "Facility name is required.";
  if (!values.type) errors.type = "Please select a facility type.";

  if (!values.imageUrl.trim()) {
    errors.imageUrl = "Image URL is required.";
  } else if (!isValidUrl(values.imageUrl.trim())) {
    errors.imageUrl = "Enter a valid URL starting with http(s)://.";
  }

  if (!values.location.trim()) errors.location = "Location is required.";

  const price = Number(values.pricePerHour);
  if (!values.pricePerHour.trim()) {
    errors.pricePerHour = "Price per hour is required.";
  } else if (!Number.isFinite(price) || price <= 0) {
    errors.pricePerHour = "Price must be a number greater than 0.";
  }

  const capacity = Number(values.capacity);
  if (!values.capacity.trim()) {
    errors.capacity = "Capacity is required.";
  } else if (!Number.isInteger(capacity) || capacity <= 0) {
    errors.capacity = "Capacity must be a whole number greater than 0.";
  }

  if (!values.description.trim()) {
    errors.description = "Description is required.";
  } else if (values.description.trim().length < 20) {
    errors.description = "Description must be at least 20 characters.";
  }

  return errors;
};

const FieldError = ({ message }: { message?: string }) => {
  if (!message) return null;
  return (
    <p role="alert" className="mt-1.5 text-xs font-medium text-destructive">
      {message}
    </p>
  );
};

const page = () => {
  const [values, setValues] = useState<FormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const setField = (field: keyof FormState, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
    setSubmitted(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setSubmitted(false);
      return;
    }

    // No backend wired up yet — payload is logged so it can be
    // sent to an API route later on.
    console.log("Add facility payload:", {
      ...values,
      pricePerHour: Number(values.pricePerHour),
      capacity: Number(values.capacity),
    });

    setSubmitted(true);
    setValues(INITIAL_STATE);
  };

  const previewUrl = isValidUrl(values.imageUrl.trim())
    ? values.imageUrl.trim()
    : "";

  return (
    <div className="mx-auto w-full max-w-3xl">
      <h1 className="text-2xl font-bold tracking-tight text-foreground">
        Add Facility
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Fill in the details below to list a new facility for event bookings.
      </p>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Facility Details</CardTitle>
          <CardDescription>
            All fields are required unless noted otherwise.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {submitted && (
            <Alert className="mb-6" variant="default">
              <CheckCircle2 className="size-4" />
              <AlertTitle>Facility added</AlertTitle>
              <AlertDescription>
                Your facility was submitted successfully.
              </AlertDescription>
            </Alert>
          )}
{/* form start */}
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="facility-name">Facility Name</Label>
                <Input
                  id="facility-name"
                  placeholder="Grand Harmony Hall"
                  value={values.name}
                  onChange={(event) => setField("name", event.target.value)}
                  aria-invalid={Boolean(errors.name)}
                />
                <FieldError message={errors.name} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="facility-type">Facility Type</Label>
                <Select
                  value={values.type}
                  onValueChange={(value) => setField("type", String(value))}
                >
                  <SelectTrigger
                    id="facility-type"
                    className="w-full"
                    aria-invalid={Boolean(errors.type)}
                  >
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                  <SelectContent>
                    {FACILITY_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FieldError message={errors.type} />
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="image-url">Image URL</Label>
                <Input
                  id="image-url"
                  type="url"
                  placeholder="https://example.com/hall.jpg"
                  value={values.imageUrl}
                  onChange={(event) => setField("imageUrl", event.target.value)}
                  aria-invalid={Boolean(errors.imageUrl)}
                />
                <FieldError message={errors.imageUrl} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="Dhaka, Bangladesh"
                  value={values.location}
                  onChange={(event) => setField("location", event.target.value)}
                  aria-invalid={Boolean(errors.location)}
                />
                <FieldError message={errors.location} />
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="price-per-hour">Price per Hour</Label>
                <Input
                  id="price-per-hour"
                  type="number"
                  min={0}
                  step="any"
                  placeholder="150"
                  value={values.pricePerHour}
                  onChange={(event) =>
                    setField("pricePerHour", event.target.value)
                  }
                  aria-invalid={Boolean(errors.pricePerHour)}
                />
                <FieldError message={errors.pricePerHour} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="capacity">Capacity of Hallroom (people)</Label>
                <Input
                  id="capacity"
                  type="number"
                  min={1}
                  step={1}
                  placeholder="300"
                  value={values.capacity}
                  onChange={(event) => setField("capacity", event.target.value)}
                  aria-invalid={Boolean(errors.capacity)}
                />
                <FieldError message={errors.capacity} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                rows={4}
                placeholder="Describe the hall, amenities, parking, and anything a renter should know…"
                value={values.description}
                onChange={(event) =>
                  setField("description", event.target.value)
                }
                aria-invalid={Boolean(errors.description)}
              />
              <FieldError message={errors.description} />
            </div>

            {previewUrl && (
              <div className="space-y-2">
                <Label>Image Preview</Label>
                <div className="relative flex h-48 w-full items-center justify-center overflow-hidden rounded-lg border border-border bg-muted">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={previewUrl}
                    alt="Facility preview"
                    className="h-full w-full object-cover"
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
                  />
                </div>
              </div>
            )}

            <div className="flex justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setValues(INITIAL_STATE);
                  setErrors({});
                  setSubmitted(false);
                }}
              >
                Reset
              </Button>
              <Button type="submit">Add Facility</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
