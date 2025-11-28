export default function Topbar() {
  return (
    <header className="w-full border-b bg-white px-6 py-3 flex items-center justify-between shadow-sm">
      <h2 className="text-xl font-semibold">Admin Dashboard</h2>

      <div className="flex items-center gap-4">
        <button className="text-sm text-muted-foreground hover:text-primary">
          Notifications
        </button>

        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
          <span className="text-primary font-bold">A</span>
        </div>
      </div>
    </header>
  );
}
