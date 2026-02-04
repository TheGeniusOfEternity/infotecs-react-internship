import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserResolver } from "./user.resolver";
import type { UpdateUserRequestDto } from "@/entities/user/model/update-user-request.dto";
import type { UserResponseDto } from "@/entities/user/model/user-response.dto";
import type { ErrorResponseDto } from "@/shared/api/model/error-response.dto";

const userResolver = new UserResolver();

export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateUserRequestDto) => await userResolver.updateById(data),
    onSuccess: async (response) => {
      const user = response as UserResponseDto;
      if (user.id) {
        queryClient.setQueryData<UserResponseDto[]>(["users"], (oldUsers) => {
          return oldUsers
            ? oldUsers.map((u) => (u.id === user.id ? user : u))
            : oldUsers;
        });
      } else throw new Error((response as ErrorResponseDto).msg);
    }
  });
};
