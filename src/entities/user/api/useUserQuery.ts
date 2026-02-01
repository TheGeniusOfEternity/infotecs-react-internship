import { useQuery } from "@tanstack/react-query";
import { UserResolver } from "./user.resolver";

const userResolver = new UserResolver();

export const useUserQuery = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () =>  await userResolver.getCurrentUser()
  });
};
