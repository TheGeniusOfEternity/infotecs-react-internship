import { useQuery } from "@tanstack/react-query";
import { getToken } from "../../../shared/api/token";

export const useAuthQuery = () => {
  return useQuery({
    queryKey: ["auth"],
    queryFn: () => {
      const token = getToken();
      return { isAuthenticated: !!token };
    },
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    retry: false,
  });
};
