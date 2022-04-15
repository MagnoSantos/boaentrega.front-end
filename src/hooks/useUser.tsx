import useSWR from "swr";
import { fetcher } from "~/lib/api";
import userJson from "../../user.json";

export const useUser = () => {
  const {
    data: user,
    error,
    mutate,
    isValidating,
  } = useSWR<{
    data?: {
      id: string;
      name: string;
      email: string;
      verified: boolean;
      address: string;
      phoneNumber: string;
      admin: boolean;
    };
  }>(userJson);

  console.log("hookData", user?.data);

  return {
    user: user?.data,
    isLoading: (!user && !error) || isValidating,
    error,
    mutate,
  };
};
