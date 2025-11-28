import { useQuery } from "@tanstack/react-query";
import api from "../services/api";

type User = {
  id: number;
  name: string;
  role?: string;
  phone?: string;
  email?: string;
};

export function useUsers() {
  return useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await api.getUsers();
      return res.data;
    },
  });
}

export default useUsers;
