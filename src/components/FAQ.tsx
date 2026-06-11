const FAQ = () => {
  const items = [
    {
      q: "¿Hacen masa sin gluten?",
      a: "Si. Tenemos opciones sin gluten preparadas con separacion de utensilios para reducir contaminacion cruzada.",
    },
    {
      q: "¿Cual es la zona de entrega?",
      a: "Encarnacion y zonas cercanas. Delivery sin costo desde Gs. 80.000.",
    },
    {
      q: "¿Que medios de pago aceptan?",
      a: "Efectivo, tarjetas y billeteras digitales.",
    },
  ];

  return (
    <section id="faq" className="container-shell reveal py-16 md:py-20">
      <div className="mx-auto max-w-3xl reveal reveal-1">
        <p className="text-center text-xs font-bold tracking-[0.2em] text-[#ad4f2b]">
          PREGUNTAS FRECUENTES
        </p>
        <h2 className="section-title mt-2 text-center">Todo claro antes de pedir</h2>
        <div className="stagger-grid mt-8 space-y-3">
          {items.map((item) => (
            <details
              key={item.q}
              className="glass-surface group rounded-2xl p-5 open:bg-[#fff3e6]"
            >
              <summary className="cursor-pointer list-none pr-8 text-base font-semibold">
                {item.q}
              </summary>
              <p className="mt-3 text-sm text-[var(--muted)]">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
