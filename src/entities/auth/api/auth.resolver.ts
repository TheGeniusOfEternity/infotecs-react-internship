import Resolver from "../../../shared/api/resolver";
import type { LoginRequestDto } from "../model/login-request.dto";

export class AuthResolver {
  private apiResolver = new Resolver("auth")

  public async login(data: LoginRequestDto) {
    return await this.apiResolver.request<
      LoginRequestDto,
      boolean
    >(
      "",
      "POST",
      data
    )
  }
}