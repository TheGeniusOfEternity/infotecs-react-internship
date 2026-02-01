import Resolver from "../../../shared/api/resolver";
import { UserOutputDTO } from "../model/user-output.dto";
import { getToken } from "../../../shared/api/token";

export class UserResolver {
  private apiResolver = new Resolver("users")

  public async getCurrentUser() {
    return getToken();
    // return await this.apiResolver.request<
    //   null,
    //   UserOutputDTO
    // >(
    //   "me",
    //   "GET",
    //   null
    // )
  }
}