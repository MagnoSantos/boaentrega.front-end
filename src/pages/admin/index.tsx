import { Box, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const AdminIndex: React.FC = () => {
  const userAdmin =
    typeof window !== "undefined" ? localStorage.getItem("admin") : null;
  const userAdminAux = userAdmin?.toString();
  const router = useRouter();
  useEffect(() => {
    userAdminAux == "admin" ? router.replace("/admin/sellers") : null;
  }, []);
  return (
    <>
      <Flex
        width="100%"
        alignItems="center"
        justifyContent="center"
        marginTop={10}
      >
        <Box maxWidth={620}>
        <Text textAlign="center" fontSize={20} color="red">
          Você não tem autorização para acessar essa pagina! Por favor, entre em
          contato com o administrador do sistema.
        </Text>
        </Box>
      </Flex>
    </>
  );
};

export default AdminIndex;
