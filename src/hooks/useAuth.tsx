import { useToast } from "@chakra-ui/react";
import router from "next/router";
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
    const data = {
      name: values.fullName,
      email: values.email,
      password: values.password,
    };

    api.post("/auth/register", data).then(async (response) => {
      toastWrapper(toast, response.data.sucess, "Sucesso", "Conta criada");

      setResponseSucess(response.data.sucess);

      router.push("/auth/login");

      return !response.data.sucess;
    });
    return !responseSucess;
  }

  async function login(values: LoginData): Promise<boolean> {
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
      console.log(response.data.data.id);
      localStorage.setItem("id", response.data.data.id);
      localStorage.setItem("name", response.data.data.name);
      localStorage.setItem("email", response.data.data.email);
      localStorage.setItem("address", response.data.data.address);
      localStorage.setItem("phoneNumber", response.data.data.phoneNumber);
      localStorage.setItem("verified", response.data.data.verified);
      localStorage.setItem("admin", response.data.data.admin);
      setResponseSucess(response.data.data.sucess);
      return !response.data.sucess;
    });
    return !responseSucess;
  }

  const objectEmptyUser = {
    data: {
      id: "",
      name: "",
      email: "",
      address: "",
      phoneNumber: "",
      verified: true,
      admin: false,
    },
  };

  async function logout() {
    if (!user) return;
    localStorage.setItem("id", "");
    localStorage.setItem("name", "");
    localStorage.setItem("email", "");
    localStorage.setItem("address", "");
    localStorage.setItem("phoneNumber", "");
    localStorage.setItem("verified", "");
    localStorage.setItem("admin", "");
    toastWrapper(toast, "", "Sucesso", "Logout efetuado!");
    router.push("/auth/login");
    mutate();
  }

  return {
    signUp,
    login,
    logout,
  };
};
