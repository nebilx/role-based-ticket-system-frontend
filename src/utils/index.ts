import axios from "axios";

export const handleRequestError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    return {
      status: error.response?.status || 500,
      message:
        error.response?.data?.error?.message || "An unexpected error occurred",
    };
  }
  return {
    status: 500,
    message: "A network error occurred. Please try again.",
  };
};
