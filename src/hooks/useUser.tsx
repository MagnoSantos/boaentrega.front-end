import useSWR from "swr";

function salvarDadosNaMemoria() {
  const id = typeof window !== "undefined" ? localStorage.getItem("id") : null;
  const name =
    typeof window !== "undefined" ? localStorage.getItem("name") : null;
  const email =
    typeof window !== "undefined" ? localStorage.getItem("email") : null;
  const address =
    typeof window !== "undefined" ? localStorage.getItem("address") : null;
  const phoneNumber =
    typeof window !== "undefined" ? localStorage.getItem("phoneNumber") : null;
  const verified =
    typeof window !== "undefined" ? localStorage.getItem("verified") : null;
  const admin =
    typeof window !== "undefined" ? localStorage.getItem("admin") : null;

  const objectCacheUser = {
    data: {
      id: id,
      name: name,
      email: email,
      address: address,
      phoneNumber: phoneNumber,
      verified: verified,
      admin: admin,
    },
  };

  return objectCacheUser;
}

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
  }>("");

  var userCache = salvarDadosNaMemoria();

  console.log("hookData", user?.data);

  return {
    user: userCache?.data,
    isLoading: false,
    error,
    mutate,
  };
};
