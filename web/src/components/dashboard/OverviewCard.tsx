interface OverviewCardProps {
  title: string;
  value: string | number;
}

export default function OverviewCard({ title, value } : OverviewCardProps) {
  return (
    <div className="p-12 rounded-lg bg-white shadow-sm flex items-center justify-between">
        <h5 className="text-2xl font-medium text-muted-foreground">{title}</h5>
        <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
