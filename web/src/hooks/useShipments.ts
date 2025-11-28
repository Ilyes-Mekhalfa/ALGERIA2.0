import { useQuery } from "@tanstack/react-query";
import api from "../services/api";

type Shipment = {
  id: number;
  orderId?: number;
  transporter?: string;
  status?: string;
  pickup?: string;
  dropoff?: string;
};

export function useShipments() {
  return useQuery<Shipment[]>({
    queryKey: ["shipments"],
    queryFn: async () => {
      const res = await api.getShipments();
      return res.data;
    },
  });
}

export default useShipments;
