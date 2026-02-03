import { useQuery } from "@tanstack/react-query";
import { getToken } from "../../../shared/api/token";

export const useAuthQuery = () => {
  return useQuery({
    queryKey: ["auth"],
    queryFn: () => {
      const token = getToken();
      return { isAuthenticated: !!token };
    },
  });
};
