"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState, type FormEvent } from "react";
import {
  ArrowRight,
  BadgePercent,
  Banknote,
  CreditCard,
  Minus,
  Phone,
  Plus,
  Smartphone,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { priceLabel, type EventItem } from "@/lib/data";

const SERVICE_FEE = 20000;
const PROMO_CODES: Record<string, number> = {
  EVENT10: 0.1,
  HEMAT25: 0.25,
};

const PAYMENT_METHODS = [
  { id: "card", label: "Credit Card", icon: CreditCard },
  { id: "bank", label: "Bank Transfer", icon: Banknote },
  { id: "wallet", label: "E-Wallet", icon: Smartphone },
] as const;

type PaymentId = (typeof PAYMENT_METHODS)[number]["id"];

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  confirmEmail: string;
  sendTickets: boolean;
  cardNumber: string;
  expiry: string;
  cvc: string;
  cardName: string;
};

const EMPTY_FORM: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  confirmEmail: "",
  sendTickets: true,
  cardNumber: "",
  expiry: "",
  cvc: "",
  cardName: "",
};

export default function CheckoutForm({ event }: { event: EventItem }) {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [payment, setPayment] = useState<PaymentId>("card");
  const [quantity, setQuantity] = useState(1);
  const [promoInput, setPromoInput] = useState("");
  const [promo, setPromo] = useState<{ code: string; rate: number } | null>(null);
  const [promoError, setPromoError] = useState("");
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>(
    {}
  );

  const totals = useMemo(() => {
    const subTotal = event.price * quantity;
    const discount = promo ? Math.round(subTotal * promo.rate) : 0;
    return {
      subTotal,
      discount,
      fee: SERVICE_FEE,
      total: subTotal - discount + SERVICE_FEE,
    };
  }, [event.price, quantity, promo]);

  const update = (key: keyof FormState, value: string | boolean) => {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const applyPromo = () => {
    const code = promoInput.trim().toUpperCase();
    if (!code) return;
    const rate = PROMO_CODES[code];
    if (rate === undefined) {
      setPromo(null);
      setPromoError("Invalid promo code. Try EVENT10.");
      return;
    }
    setPromoError("");
    setPromo({ code, rate });
  };

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormState, string>> = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.firstName.trim()) next.firstName = "First name is required";
    if (!form.lastName.trim()) next.lastName = "Last name is required";
    if (!emailPattern.test(form.email)) next.email = "Enter a valid email address";
    if (form.confirmEmail !== form.email)
      next.confirmEmail = "Emails do not match";
    if (!form.sendTickets) next.sendTickets = "Please accept the terms of service";

    if (payment === "card") {
      if (form.cardNumber.replace(/\D/g, "").length < 12)
        next.cardNumber = "Enter a valid card number";
      if (!/^\d{2}\s*\/\s*\d{2}$/.test(form.expiry.trim()))
        next.expiry = "Use MM / YY";
      if (!/^\d{3,4}$/.test(form.cvc.trim())) next.cvc = "3 or 4 digits";
      if (!form.cardName.trim()) next.cardName = "Name on card is required";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (submitEvent: FormEvent) => {
    submitEvent.preventDefault();
    if (!validate()) return;

    const params = new URLSearchParams({
      qty: String(quantity),
      name: `${form.firstName} ${form.lastName}`.trim(),
      email: form.email,
      payment:
        PAYMENT_METHODS.find((method) => method.id === payment)?.label ??
        "Credit Card",
      total: String(totals.total),
      ...(promo ? { promo: promo.code } : {}),
    });

    router.push(`/checkout/${event.slug}/confirmation?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="mt-8 grid gap-6 lg:grid-cols-3"
    >
      {/* ---------------- Attendee details + payment ---------------- */}
      <section className="rounded-3xl border border-border bg-card p-6 lg:col-span-2 md:p-8">
        <h2 className="text-lg font-bold text-foreground">Attendee Details</h2>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <Field
            id="first-name"
            label="First Name"
            placeholder="Enter first name"
            value={form.firstName}
            onChange={(value) => update("firstName", value)}
            error={errors.firstName}
          />
          <Field
            id="last-name"
            label="Last Name"
            placeholder="Enter last name"
            value={form.lastName}
            onChange={(value) => update("lastName", value)}
            error={errors.lastName}
          />
          <Field
            id="email"
            label="Email Address"
            placeholder="Your email"
            type="email"
            value={form.email}
            onChange={(value) => update("email", value)}
            error={errors.email}
          />
          <Field
            id="confirm-email"
            label="Confirm Email"
            placeholder="Confirm email"
            type="email"
            value={form.confirmEmail}
            onChange={(value) => update("confirmEmail", value)}
            error={errors.confirmEmail}
          />
        </div>

        <div className="mt-4">
          <label className="flex cursor-pointer items-start gap-2.5 text-sm text-muted-foreground">
            <input
              type="checkbox"
              checked={form.sendTickets}
              onChange={(e) => update("sendTickets", e.target.checked)}
              className="mt-0.5 size-4 shrink-0 accent-blue-500"
            />
            <span>
              Send tickets to this email address. I accept the{" "}
              <Link href="/host" className="text-blue-500 underline underline-offset-2">
                terms of service
              </Link>
              .
            </span>
          </label>
          {errors.sendTickets && (
            <p className="mt-1.5 text-xs font-medium text-destructive">
              {errors.sendTickets}
            </p>
          )}
        </div>

        <h2 className="mt-8 border-t border-border pt-6 text-lg font-bold text-foreground">
          Payment Method
        </h2>

        <div className="mt-4 grid grid-cols-3 gap-2 rounded-xl bg-muted p-1.5">
          {PAYMENT_METHODS.map((method) => {
            const Icon = method.icon;
            const active = payment === method.id;
            return (
              <button
                key={method.id}
                type="button"
                onClick={() => setPayment(method.id)}
                aria-pressed={active}
                className={`flex items-center justify-center gap-2 rounded-lg px-2 py-2.5 text-xs font-semibold transition-colors md:text-sm ${
                  active
                    ? "bg-background text-blue-500 shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="size-4 shrink-0" />
                <span className="truncate">{method.label}</span>
              </button>
            );
          })}
        </div>

        {payment === "card" ? (
          <div className="mt-5 grid gap-4">
            <Field
              id="card-number"
              label="Card Number"
              placeholder="0000 0000 0000 0000"
              inputMode="numeric"
              icon={<CreditCard className="size-4 text-muted-foreground" />}
              value={form.cardNumber}
              onChange={(value) =>
                update(
                  "cardNumber",
                  value
                    .replace(/\D/g, "")
                    .slice(0, 16)
                    .replace(/(.{4})/g, "$1 ")
                    .trim()
                )
              }
              error={errors.cardNumber}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                id="expiry"
                label="Expiry Date"
                placeholder="MM / YY"
                inputMode="numeric"
                value={form.expiry}
                onChange={(value) => {
                  const digits = value.replace(/\D/g, "").slice(0, 4);
                  const formatted =
                    digits.length > 2
                      ? `${digits.slice(0, 2)} / ${digits.slice(2)}`
                      : digits;
                  update("expiry", formatted);
                }}
                error={errors.expiry}
              />
              <Field
                id="cvc"
                label="CVC / CVV"
                placeholder="123"
                inputMode="numeric"
                type="password"
                value={form.cvc}
                onChange={(value) =>
                  update("cvc", value.replace(/\D/g, "").slice(0, 4))
                }
                error={errors.cvc}
              />
            </div>
            <Field
              id="card-name"
              label="Name on Card"
              placeholder="Name on card"
              value={form.cardName}
              onChange={(value) => update("cardName", value)}
              error={errors.cardName}
            />
          </div>
        ) : payment === "bank" ? (
          <div className="mt-5 rounded-xl border border-border bg-muted/60 p-4 text-sm leading-relaxed text-muted-foreground">
            Transfer the total amount to{" "}
            <span className="font-semibold text-foreground">
              Event. — Bank Central Asia 1234567890
            </span>
            . Your tickets are issued once the payment is verified (usually
            within 15 minutes).
          </div>
        ) : (
          <div className="mt-5 rounded-xl border border-border bg-muted/60 p-4 text-sm leading-relaxed text-muted-foreground">
            You&apos;ll be redirected to your e-wallet app to approve the
            payment of{" "}
            <span className="font-semibold text-foreground">
              {priceLabel(totals.total)}
            </span>{" "}
            after tapping Complete Purchase.
          </div>
        )}
      </section>

      {/* ---------------- Order summary ---------------- */}
      <aside className="lg:col-span-1">
        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl">
            <Image
              src={event.image}
              alt={event.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="object-cover"
            />
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3 pt-8 text-sm font-bold text-white">
              {event.title}
            </span>
          </div>

          <h2 className="mt-5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Order Summary
          </h2>

          <div className="mt-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 rounded-lg border border-border">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                  className="grid size-8 place-items-center text-muted-foreground transition-colors hover:text-foreground disabled:opacity-40"
                  disabled={quantity <= 1}
                >
                  <Minus className="size-3.5" />
                </button>
                <span className="w-6 text-center text-sm font-bold text-foreground">
                  {quantity}
                </span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() => setQuantity((value) => Math.min(10, value + 1))}
                  className="grid size-8 place-items-center text-muted-foreground transition-colors hover:text-foreground disabled:opacity-40"
                  disabled={quantity >= 10}
                >
                  <Plus className="size-3.5" />
                </button>
              </div>
              <span className="text-sm font-medium text-foreground">
                General Admission
              </span>
            </div>
            <span className="text-sm font-bold text-foreground">
              {priceLabel(totals.subTotal)}
            </span>
          </div>

          {/* Promo code */}
          <div className="mt-4 flex items-center gap-2 rounded-xl border border-border bg-background p-1 pl-3">
            <BadgePercent className="size-4 shrink-0 text-muted-foreground" />
            <input
              value={promoInput}
              onChange={(e) => {
                setPromoInput(e.target.value);
                setPromoError("");
              }}
              placeholder="Promo Code"
              aria-label="Promo code"
              className="w-full min-w-0 bg-transparent py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground"
            />
            <button
              type="button"
              onClick={applyPromo}
              className="shrink-0 rounded-lg px-3 py-2 text-sm font-semibold text-blue-500 transition-colors hover:bg-blue-50"
            >
              Apply
            </button>
          </div>
          {promoError && (
            <p className="mt-1.5 text-xs font-medium text-destructive">
              {promoError}
            </p>
          )}
          {promo && (
            <p className="mt-1.5 text-xs font-medium text-green-600">
              {promo.code} applied — {Math.round(promo.rate * 100)}% off.
            </p>
          )}

          <dl className="mt-5 space-y-2.5 border-t border-border pt-5 text-sm">
            <Row label="Sub Total" value={priceLabel(totals.subTotal)} />
            <Row label="Service Fees" value={priceLabel(totals.fee)} />
            {totals.discount > 0 && (
              <Row
                label={`Discount (${promo?.code})`}
                value={`- ${priceLabel(totals.discount)}`}
                valueClassName="text-green-600"
              />
            )}
            <div className="flex items-center justify-between border-t border-border pt-4">
              <dt className="text-base font-bold text-foreground">Total</dt>
              <dd className="text-lg font-bold text-foreground">
                {priceLabel(totals.total)}
              </dd>
            </div>
          </dl>

          <button
            type="submit"
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-blue-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-600"
          >
            Complete Purchase
            <ArrowRight className="size-4" />
          </button>

          <p className="mt-3 text-center text-xs text-muted-foreground">
            You won&apos;t be charged until the last step.
          </p>
        </div>

        {/* Need help */}
        <div className="mt-5 flex items-start gap-3 rounded-3xl border border-blue-100 bg-blue-50 p-5">
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-blue-500 text-white">
            <Phone className="size-4" />
          </span>
          <div>
            <p className="text-sm font-bold text-foreground">Need Help ?</p>
            <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
              Contact our support team at{" "}
              <a
                href="mailto:supportevent@gmail.com"
                className="font-medium text-blue-500 underline underline-offset-2"
              >
                supportevent@gmail.com
              </a>{" "}
              or call{" "}
              <span className="font-medium text-blue-500">
                +62 (800) 123-4567
              </span>
              .
            </p>
          </div>
        </div>
      </aside>
    </form>
  );
}

function Row({
  label,
  value,
  valueClassName = "",
}: {
  label: string;
  value: string;
  valueClassName?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className={`font-semibold text-foreground ${valueClassName}`}>
        {value}
      </dd>
    </div>
  );
}

function Field({
  id,
  label,
  placeholder,
  value,
  onChange,
  error,
  type = "text",
  inputMode,
  icon,
}: {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  inputMode?: "numeric" | "text" | "email";
  icon?: React.ReactNode;
}) {
  return (
    <div>
      <Label htmlFor={id} className="mb-2 text-sm font-semibold text-foreground">
        {label}
      </Label>
      <div className="relative">
        {icon && <span className="absolute left-3 top-1/2 -translate-y-1/2">{icon}</span>}
        <Input
          id={id}
          type={type}
          inputMode={inputMode}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={Boolean(error)}
          className={`h-11 rounded-xl border-border bg-muted/60 px-3.5 focus-visible:border-blue-500 focus-visible:ring-blue-500/30 ${
            icon ? "pl-9" : ""
          } ${error ? "border-destructive" : ""}`}
        />
      </div>
      {error && (
        <p className="mt-1.5 text-xs font-medium text-destructive">{error}</p>
      )}
    </div>
  );
}
