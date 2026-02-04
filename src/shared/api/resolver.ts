import axios, {
  type AxiosRequestConfig,
  type AxiosResponse,
  isAxiosError,
} from "axios";
import { apiConf } from "./api.conf";
import { getToken } from "./token";

interface RequestConfig<T> extends AxiosRequestConfig {
  data?: T;
}

class Resolver {
  private readonly endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  async request<U, S>(
    url: string,
    method: string,
    data?: U,
    responseType?: AxiosResponse["request"]["responseType"],
  ): Promise<S> {
    const fullUrl = `${apiConf.endpoint}/${this.endpoint}${url ? `/${url}` : ""}`;
    const jwt = getToken();

    const config: RequestConfig<U> = {
      url: fullUrl,
      method,
      data,
      headers: jwt ? {
        Authorization: `Bearer ${jwt}`,
      } : undefined,
      responseType: (responseType || "json") as never,
    };

    try {
      const response: AxiosResponse<S> = await axios(config);
      return response.data;
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        return {
          msg: error.response?.data.msg
            ? error.response.data.msg
            : error.response?.data
        } as S;
      }
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(String(error));
    }
  }
}

export default Resolver;
