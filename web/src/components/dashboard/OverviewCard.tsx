interface OverviewCardProps {
  title: string;
  value: string | number;
}

export default function OverviewCard({ title, value } : OverviewCardProps) {
  return (
    <div className="p-4 rounded-lg border bg-white shadow-sm flex items-center justify-between">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
