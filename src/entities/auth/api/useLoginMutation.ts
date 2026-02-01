import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { LoginRequestDto } from "../model/login-request.dto";
import { AuthResolver } from "./auth.resolver";
import { setToken } from "../../../shared/api/token";

export const useLoginMutation = () => {
  const queryClient = useQueryClient();
  const authResolver = new AuthResolver();

  return useMutation({
    mutationFn: async (data: LoginRequestDto) => await authResolver.login(data),
    onSuccess: async (token) => {
      setToken(token);
      await queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
  });
}