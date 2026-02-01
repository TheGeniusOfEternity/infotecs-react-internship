import { useQuery } from "@tanstack/react-query";
import { getToken } from "../../../shared/api/token";

export const useAuthQuery = () => {
  return useQuery({
    queryKey: ["auth"],
    queryFn: async () => {
      const token = getToken();
      return { isAuthenticated: !!token };
    }
  });
};
