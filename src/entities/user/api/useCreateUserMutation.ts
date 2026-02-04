import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserResolver } from "./user.resolver";
import type { CreateUserRequestDto } from "@/entities/user/model/create-user-request.dto";
import type { UserResponseDto } from "@/entities/user/model/user-response.dto";

const userResolver = new UserResolver();

export const useCreateUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateUserRequestDto) => await userResolver.create(data),
    onSuccess: (createdUser) => {
      queryClient.setQueryData(["users"], (old: UserResponseDto[] | undefined) =>
        old ? [...old, createdUser] : [createdUser],
      );
    },
  });
};
