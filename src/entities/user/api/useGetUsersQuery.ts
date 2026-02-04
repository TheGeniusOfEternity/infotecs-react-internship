import { useQuery } from "@tanstack/react-query";
import { UserResolver } from "./user.resolver";

const userResolver = new UserResolver();

export const useGetUsersQuery = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => await userResolver.getAll(),
    staleTime: 2 * 60 * 1000,
    cacheTime: 5 * 60 * 1000,
    retry: 1,
  });
};
