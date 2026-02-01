import { useQuery } from "@tanstack/react-query";
import { UserResolver } from "./user.resolver";

export const useUserQuery = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const userResolver = new UserResolver();
      return await userResolver.getCurrentUser()
    }
  });
};
