import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserResolver } from "./user.resolver";
import type { UserRequestDto } from "../model/user-request.dto";
import type { UserResponseDto } from "../model/user-response.dto";

const userResolver = new UserResolver();

export const useCreateUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UserRequestDto) => await userResolver.create(data),
    onSuccess: (createdUser) => {
      queryClient.setQueryData(["users"], (old: UserResponseDto[] | undefined) =>
        old ? [...old, createdUser] : [createdUser],
      );
    },
  });
};
