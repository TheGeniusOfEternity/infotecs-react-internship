import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserResolver } from "./user.resolver";
import type { UpdateUserRequestDto } from "@/entities/user/model/update-user-request.dto";
import type { UserResponseDto } from "@/entities/user/model/user-response.dto";
import type { ErrorResponseDto } from "@/shared/api/model/error-response.dto";

const userResolver = new UserResolver();

export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateUserRequestDto) => await userResolver.update(data),
    onSuccess: async (response) => {
      if ((response as UserResponseDto).id) {
        await queryClient.invalidateQueries({ queryKey: ["users"] })
      } else throw new Error((response as ErrorResponseDto).msg);
    }
  });
};
