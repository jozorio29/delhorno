"use client";

import { useState } from "react";

const Contacto = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  // Honeypot
  const [company, setCompany] = useState("");

  const [status, setStatus] = useState<null | {
    type: "ok" | "error";
    text: string;
  }>(null);
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus(null);

    if (!name.trim() || !phone.trim() || !message.trim()) {
      setStatus({
        type: "error",
        text: "Por favor, completa todos los campos.",
      });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, phone, message, company }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "No se puede enviar el mensaje");
      }

      setStatus({ type: "ok", text: "¡Gracias por su mensaje! Te contactaremos pronto." });
      setName("");
      setPhone("");
      setMessage("");
      setCompany("");
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Error inesperado";
      setStatus({ type: "error", text: errorMessage });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contacto" className="container-shell reveal py-16 md:py-20">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="reveal reveal-1">
          <p className="text-xs font-bold tracking-[0.2em] text-[#ad4f2b]">
            RESERVAS Y CONTACTO
          </p>
          <h2 className="section-title mt-2">Hablemos de tu pedido</h2>
          <p className="mt-3 max-w-prose text-sm text-[var(--muted)] md:text-base">
            Consulta rapida o reserva de mesa. Escribinos y te respondemos en
            minutos.
          </p>
          <div className="mt-6 space-y-2 text-sm text-[#5f4b3f]">
            <p>📍 14 de Mayo, Encarnación</p>
            <p>⏰ Mar–Jue: 09:30–13:30 / 19:00–23:00</p>
            <p>⏰ Vie–Sab: 09:30–13:30 / 19:00–00:00</p>
            <p>⏰ Dom: 19:00–23:00 · Lunes cerrado</p>
            <p>☎️ 0982 000 763</p>
          </div>
        </div>
        <form
          onSubmit={onSubmit}
          className="glass-surface reveal reveal-2 rounded-3xl p-6 md:p-7"
        >
          {/* honeypot (escondido visualmente) */}

          <label className="sr-only">
            Empresa{" "}
            <input
              tabIndex={-1}
              autoComplete="off"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="hidden"
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label htmlFor="name" className="flex flex-col gap-1 text-sm">
              <span>Nombre</span>
              <input
                id="name"
                name="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="rounded-lg border border-[#e8cdb8] bg-[#fffaf4] px-3 py-2 text-zinc-900 outline-none ring-[#f2bf99] focus:ring-4"
              />
            </label>

            <label htmlFor="phone" className="flex flex-col gap-1 text-sm">
              <span>Teléfono</span>
              <input
                id="phone"
                name="phone"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="rounded-lg border border-[#e8cdb8] bg-[#fffaf4] px-3 py-2 text-zinc-900 outline-none ring-[#f2bf99] focus:ring-4"
              />
            </label>
          </div>

          <label htmlFor="message" className="mt-4 flex flex-col gap-1 text-sm">
            <span>Mensaje</span>
            <textarea
              id="message"
              name="message"
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="rounded-lg border border-[#e8cdb8] bg-[#fffaf4] px-3 py-2 text-zinc-900 outline-none ring-[#f2bf99] focus:ring-4"
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full rounded-xl bg-[var(--brand)] px-4 py-3 text-sm font-semibold text-white shadow transition hover:bg-[#a34726] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Enviando..." : "Enviar"}
          </button>

          {status && (
            <div
              className={`mt-3 rounded-lg px-3 py-2 text-sm ${
                status.type === "ok"
                  ? "bg-emerald-100 text-emerald-800"
                  : "bg-rose-100 text-rose-800"
              }`}
            >
              {status.text}
            </div>
          )}
        </form>
      </div>
    </section>
  );
};

export default Contacto;
