import Resolver from "../../../shared/api/resolver";
import type { LoginRequestDto } from "../model/login-request.dto";
import { apiConf } from "../../../shared/api/api.conf";

export class AuthResolver {
  private apiResolver = new Resolver("auth")

  public async login(data: LoginRequestDto) {
    // return await this.apiResolver.request<
    //   LoginRequestDto,
    //   string
    // >(
    //   "",
    //   "POST",
    //   data
    // )
    return new Promise<string>((resolve, reject) => {
      setTimeout(() => {
        if (data.login === apiConf.admin.login &&
          data.password === apiConf.admin.password
        ) resolve("token")
        reject(new Error("Пароль должен содержать не менее 8 символов"));
      }, 2000)
    })
  }
}