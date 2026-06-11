import React from "react";

const Footer = () => {
  return (
    <footer className="border-t border-[var(--line)] bg-[rgba(255,248,241,0.9)] py-10 text-sm backdrop-blur">
      <div className="container-shell">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div className="flex items-center gap-2">
            {/* <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-[#d26b3f] to-[#8f3420] text-white">
              🍕
            </span> */}
            <span className="font-semibold">Del Horno | Pizza</span>
          </div>
          <p className="text-[var(--muted)]">
            © {new Date().getFullYear()} Encarnación, Paraguay
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
