import { axiosInstance } from "../lib/axios";

const axiosBaseQuery =
  () =>
  async ({ url, method, data, params, headers }) => {
    try {
      const result = await axiosInstance({
        url: url,
        method,
        data,
        params,
        headers,
      });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError;
      return {
        error: {
          status: err.response?.status || 500,
          data: err.response?.data || { message: err.message },
        },
      };
    }
  };

export default axiosBaseQuery;
