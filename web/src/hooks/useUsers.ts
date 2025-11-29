import { useQuery } from "@tanstack/react-query";
import api from "../services/api";

type User = {
  id: number;
  name: string;
  role?: string;
  phone?: string;
  email?: string;
};

// Mock data fallback for when backend users endpoint is not yet available
const mockUsers: User[] = [
  { id: 1, name: "Ahmed Boumediene", role: "Farmer", phone: "+213 661 234 567", email: "ahmed@farm.dz" },
  { id: 2, name: "Fatima El Zahra", role: "Buyer", phone: "+213 664 456 789", email: "fatima@agro.dz" },
  { id: 3, name: "Mohammed Karim", role: "Distributor", phone: "+213 668 123 456", email: "karim@dist.dz" },
  { id: 4, name: "Layla Hassan", role: "Farmer", phone: "+213 679 234 567", email: "layla@farm.dz" },
  { id: 5, name: "Ibrahim Mansouri", role: "Logistics Manager", phone: "+213 671 345 678", email: "ibrahim@logis.dz" },
  { id: 6, name: "Aisha Medjahed", role: "Buyer", phone: "+213 682 456 789", email: "aisha@buy.dz" },
  { id: 7, name: "Youssef Rachid", role: "Farmer", phone: "+213 693 567 890", email: "youssef@farm.dz" },
  { id: 8, name: "Nadia Soufi", role: "Quality Inspector", phone: "+213 674 678 901", email: "nadia@quality.dz" },
  { id: 9, name: "Hassan Bouchama", role: "Buyer", phone: "+213 657 789 012", email: "hassan@buy.dz" },
  { id: 10, name: "Zahra Amrani", role: "Farmer", phone: "+213 688 890 123", email: "zahra@farm.dz" },
];

export function useUsers() {
  return useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      try {
        const res = await api.getUsers();
        return res.data && Array.isArray(res.data) ? res.data : mockUsers;
      } catch {
        // Fallback to mock data if backend users endpoint doesn't exist
        return mockUsers;
      }
    },
  });
}

export default useUsers;
