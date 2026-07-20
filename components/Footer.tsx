export default function Footer() {
  return (
    <footer className="border-t border-white/5 px-6 py-8 md:px-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 font-mono text-[12px] uppercase tracking-wide text-fog/35 sm:flex-row">
        <span>UB Studio © {new Date().getFullYear()}</span>
        <span>Bishkek, Kyrgyzstan</span>
      </div>
    </footer>
  );
}
