import { Line } from "react-chartjs-2";
import "./js/chartjs-setup";
import { usePriceAnalytics } from "../../context/PriceAnalyticsContext";

export default function PriceChart() {
  const { labels, values } = usePriceAnalytics();

  const data = {
    labels,
    datasets: [
      {
        label: "Potato Prices (DZD/kg)",
        data: values,
        borderWidth: 2,
        tension: 0.25,
        backgroundColor: "rgba(59,130,246,0.08)",
        borderColor: "rgb(59,130,246)",
        pointRadius: 3,
      },
    ],
  };

  const options: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { mode: "index", intersect: false },
    },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { opacity: 0.06 } },
    },
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm border h-64">
      <h3 className="text-lg font-semibold mb-2">Price Trends</h3>
      <div className="w-full h-[calc(100%-2rem)]">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
