import { useQuery } from "@tanstack/react-query";
import { UserResolver } from "./user.resolver";
import type { User } from "@/entities/user/api/types";

const userResolver = new UserResolver();

export const useGetUsersQuery = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => (await userResolver.getAll()).map(user => {
      return {
        ...user,
        id: Number(user.id),
      } as User
    }),
    staleTime: 2 * 60 * 1000,
    cacheTime: 5 * 60 * 1000,
    retry: 1,
  });
};
