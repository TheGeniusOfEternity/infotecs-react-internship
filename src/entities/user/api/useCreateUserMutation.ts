import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserResolver } from "./user.resolver";
import type { CreateUserRequestDto } from "@/entities/user/model/create-user-request.dto";
import type { User } from "@/entities/user/api/types";
import type { UserResponseDto } from "@/entities/user/model/user-response.dto";
import type { ErrorResponseDto } from "@/shared/api/model/error-response.dto";

const userResolver = new UserResolver();

export const useCreateUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateUserRequestDto) => await userResolver.create(data),
    onSuccess: (response) => {
      const createdUser = (response as UserResponseDto)
      if (createdUser.id) {
        const user = { ...createdUser, id: Number(createdUser.id) };
        queryClient.setQueryData<User[]>(["users"], (old: User[] | undefined) =>
          old ? [...old, user] : [user],
        );
      } else throw new Error((response as ErrorResponseDto).msg);
    },
  });
};
