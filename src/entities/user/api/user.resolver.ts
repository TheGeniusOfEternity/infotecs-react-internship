import Resolver from "../../../shared/api/resolver";
import type { UserResponseDto } from "../model/user-response.dto";
import type { UserRequestDto } from "../model/user-request.dto";

export class UserResolver {
  private apiResolver = new Resolver("users");

  public async create(user: UserRequestDto) {
    return await this.apiResolver.request<
      UserRequestDto,
      UserResponseDto
    >(
      "",
      "POST",
      user
    )
  }

  public async getCurrentUser() {
    return await this.apiResolver.request<
      null,
      UserResponseDto
    >(
      "me",
      "GET",
      null
    );
  }

  public async getAll() {
    return await this.apiResolver.request<
      null,
      UserResponseDto[]
    >(
      "",
      "GET",
      null,
    )
  }
}