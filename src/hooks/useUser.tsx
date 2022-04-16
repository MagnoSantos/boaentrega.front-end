import useSWR from "swr";

function salvarDadosNaMemoria() {
  const id = typeof window !== "undefined" ? localStorage.getItem("id") : null;
  const idAux = id?.toString();
  const name =
    typeof window !== "undefined" ? localStorage.getItem("name") : null;
  const nameAux = name?.toString();
  const email =
    typeof window !== "undefined" ? localStorage.getItem("email") : null;
  const emailAux = email?.toString();
  const address =
    typeof window !== "undefined" ? localStorage.getItem("address") : null;
  const addressAux = address?.toString();
  const phoneNumber =
    typeof window !== "undefined" ? localStorage.getItem("phoneNumber") : null;
  const phoneNumberAux = phoneNumber?.toString();
  const verified =
    typeof window !== "undefined" ? localStorage.getItem("verified") : null;
  const verifiedAux = verified?.toString();
  const admin =
    typeof window !== "undefined" ? localStorage.getItem("admin") : null;
  const adminAux = admin?.toString();

  const objectCacheUser = {
    data: {
      id: idAux,
      name: nameAux,
      email: emailAux,
      address: addressAux,
      phoneNumber: phoneNumberAux,
      verified: verifiedAux,
      admin: adminAux,
    },
  };

  return objectCacheUser;
}

export const useUser = () => {
  const {
    data: userr,
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

  var user = salvarDadosNaMemoria();

  return {
    user: user.data,
    isLoading: false,
    error,
    mutate,
  };
};
