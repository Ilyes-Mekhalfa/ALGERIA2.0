interface OverviewCardProps {
  title: string;
  value: string | number;
}

export default function OverviewCard({ title, value } : OverviewCardProps) {
  return (
    <div className="p-4 rounded-lg border bg-white shadow-sm flex items-center justify-between">
      <div>
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <p className="mt-2 text-2xl font-bold">{value}</p>
      </div>

      <div className="ml-4 w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold">
        {String(value).charAt(0)}
      </div>
    </div>
  );
}
