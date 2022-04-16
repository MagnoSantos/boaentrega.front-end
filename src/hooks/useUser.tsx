import useSWR from "swr";
import { fetcher } from "~/lib/api";

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
  }>("auth/73e3217f-faa7-4f7d-84c2-c273d215007d/user", fetcher, {
    revalidateOnFocus: false
  });

  console.log("hookData", user?.data);

  return {
    user: user?.data,
    isLoading: (!user && !error) || isValidating,
    error,
    mutate,
  };
};
