import Resolver from "@/shared/api/resolver";
import type { UserResponseDto } from "@/entities/user/model/user-response.dto";
import type { CreateUserRequestDto } from "@/entities/user/model/create-user-request.dto";
import type { UpdateUserRequestDto } from "@/entities/user/model/update-user-request.dto";
import type { ErrorResponseDto } from "@/shared/api/model/error-response.dto";

export class UserResolver {
  private apiResolver = new Resolver("users");

  public async create(user: CreateUserRequestDto) {
    return await this.apiResolver.request<CreateUserRequestDto, UserResponseDto>(
      "",
      "POST",
      user,
    );
  }

  public async update(user: UpdateUserRequestDto) {
    return await this.apiResolver.request<
      UpdateUserRequestDto,
      UserResponseDto | ErrorResponseDto
    >(user.id.toString(), "PUT", user);
  }

  public async getCurrentUser() {
    return await this.apiResolver.request<null, UserResponseDto>(
      "me",
      "GET",
      null,
    );
  }

  public async getAll() {
    return await this.apiResolver.request<null, UserResponseDto[]>(
      "",
      "GET",
      null,
    );
  }
}