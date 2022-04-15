import { useToast } from "@chakra-ui/react";
import { useState } from "react";
import api from "services/api/backend";
import { fetcher } from "~/lib/api";
import { toastWrapper } from "~/lib/toast";
import { LoginData, SignUpData } from "../types";
import { useUser } from "./useUser";

export const useAuth = () => {
  const { user, mutate } = useUser();
  const toast = useToast();
  const [responseSucess, setResponseSucess] = useState(true);

  async function signUp(values: SignUpData): Promise<boolean> {
    if (user) return false;
    const data = {
      name: values.fullName,
      email: values.email,
      password: values.password,
    };

    api.post("/auth/register", data).then(async (response) => {
      toastWrapper(
        toast,
        response.data.sucess,
        "Sucesso",
        "Conta criada"
      );
      setResponseSucess(response.data.sucess);
      return !response.data.sucess;
    });
    return !responseSucess;
  }

  async function login(values: LoginData): Promise<boolean> {
    if (user) return false;
    const data = {
      name: "",
      email: values.email,
      password: values.password,
    };
    api.post("/auth/login", data).then(async (response) => {
      toastWrapper(
        toast,
        response.data.sucess,
        "Sucesso",
        "Login realizado com sucesso"
      );
      mutate(response.data);
      setResponseSucess(response.data.sucess);
      return !response.data.sucess;
    });
    return !responseSucess;
  }

  async function logout() {
    if (!user) return;
    const { data, error } = await fetcher("auth/logout");
    toastWrapper(toast, error, "Sucesso", "Saiu com suceso!");
    mutate();
  }

  return {
    signUp,
    login,
    logout,
  };
};
