import useSWR from "swr";
import { fetcher } from "~/lib/api";
import userJson from "../../user.json"

export const useUser = () => {
  const userData = userJson;
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
  }>("auth/user", fetcher, {
    revalidateOnFocus: false,
  });

  return {
    user: userData?.data,
    isLoading: (!user && !error) || isValidating,
    error,
    mutate,
  };
};
