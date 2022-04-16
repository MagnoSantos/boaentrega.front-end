import { Heading } from "@chakra-ui/layout";
import { Tooltip } from "@chakra-ui/react";
import { useRouter } from "next/router";

export const Logo = () => {
  const router = useRouter();
  return (
    <Tooltip
      hasArrow
      label="Melhor empresas de entrega! Nós sabemos 😘"
      bg="gray.100"
      color="gray.500"
    >
      <Heading
        marginRight={10}
        as="h1"
        color="purple.500"
        fontWeight="800"
        cursor="pointer"
        size="lg"
        onClick={() => router.push("/")}
      >
        Boa Entrega
      </Heading>
    </Tooltip>
  );
};

export default Logo;
