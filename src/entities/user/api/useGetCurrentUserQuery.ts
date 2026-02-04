import { useQuery } from "@tanstack/react-query";
import { UserResolver } from "./user.resolver";

const userResolver = new UserResolver();

export const useGetCurrentUserQuery = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () =>  await userResolver.getCurrentUser()
  });
};
