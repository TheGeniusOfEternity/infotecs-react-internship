import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { LoginRequestDto } from "../model/login-request.dto";
import { AuthResolver } from "./auth.resolver";
import { setToken } from "../../../shared/api/token";

const authResolver = new AuthResolver();

export const useLoginMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: LoginRequestDto) => await authResolver.login(data),
    onSuccess: async (token) => {
      setToken(token);
      await queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
  });
}