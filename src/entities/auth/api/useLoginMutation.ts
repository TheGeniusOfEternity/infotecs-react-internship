import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { LoginRequestDto } from "../model/login-request.dto";
import { AuthResolver } from "./auth.resolver";
import { setToken } from "../../../shared/api/token";
import { useNavigate } from "react-router-dom";

const authResolver = new AuthResolver();

export const useLoginMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: LoginRequestDto) => await authResolver.login(data),
    onSuccess: (token) => {
      setToken(token);
      queryClient.removeQueries({ queryKey: ["auth"] });
      navigate("/users", { replace: true });
    },
  });
}