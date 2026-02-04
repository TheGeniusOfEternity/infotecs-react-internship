import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserResolver } from "./user.resolver";
import type { UserResponseDto } from "@/entities/user/model/user-response.dto";
import type { ErrorResponseDto } from "@/shared/api/model/error-response.dto";
import type { User } from "@/entities/user/api/types";

const userResolver = new UserResolver();

export const useDeleteUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => await userResolver.deleteById(id),
    onSuccess: (response) => {
      const deletedId = (response as UserResponseDto).id
      if (deletedId) {
        queryClient.setQueryData<User[]>(["users"], (old: User[] | undefined) =>
            old?.filter((user) => user.id !== Number(deletedId)),
        );
      } else throw Error((response as ErrorResponseDto).msg)
    },
  });
};
