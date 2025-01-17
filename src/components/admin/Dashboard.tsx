import {
  Box,
  Flex,
  Spinner,
  Stack,
  useColorModeValue as mode,
  useToast,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { ReactElement, useEffect } from "react";
import {
  IoBag,
  IoCart,
  IoCash,
  IoCheckmarkCircle,
  IoList,
} from "react-icons/io5";
import { MobileMenuButton } from "~/components/MobileMenuButton";
import Page from "~/components/Page";
import { ScrollArea } from "~/components/ScrollArea";
import { SidebarLink } from "~/components/SidebarLink";
import { UserInfo } from "~/components/UserInfo";
import { useMobileMenuState } from "~/hooks/useMobileMenuState";
import { useUser } from "~/hooks/useUser";
import { fetcher } from "~/lib/api";

const Admin: NextPage<{ children: ReactElement }> = ({ children }) => {
  const { isOpen, toggle } = useMobileMenuState();
  const router = useRouter();
  const { user, isLoading } = useUser();
  const toast = useToast();
  const unauthToast = () =>
    toast({
      position: "top",
      title: "Unauthorized",
      description: "You are not logged in as an admin",
      status: "error",
      duration: 3000,
      isClosable: true,
    });

  useEffect(() => {
    if (user && !isLoading)
      fetcher(`users/${user.id}`, "GET").then((res) => {
        if (res.data && !res.data.adminProfile) {
          unauthToast();
          router.push("/");
        }
      });
    if (!isLoading && (!user || !user.admin)) {
      unauthToast();
      router.push("/auth/login");
    }
  }, [user, isLoading]);

  if (isLoading || !user) {
    return (
      <Page>
        <Flex alignItems="center" justifyContent="center">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="purple.500"
            size="xl"
          />
        </Flex>
      </Page>
    );
  }

  return (
    <Flex
      height="100vh"
      bg={mode("purple.800", "gray.800")}
      overflow="hidden"
      sx={{ "--sidebar-width": "16rem" }}
    >
      <Box
        as="nav"
        display="block"
        flex="1"
        width="var(--sidebar-width)"
        left="0"
        py="5"
        px="3"
        color="gray.200"
        position="fixed"
      >
        <Box fontSize="sm" lineHeight="tall">
          <Box
            as="a"
            href="#"
            p="3"
            display="block"
            transition="background 0.1s"
            rounded="xl"
            _hover={{ bg: "whiteAlpha.200" }}
            whiteSpace="nowrap"
          >
            <UserInfo name={user.name} email={user.email} />
          </Box>
          <ScrollArea pt="5" pb="6">
            <Stack pb="6">
              <NextLink href="/admin/sellers" passHref>
                <SidebarLink icon={<IoBag />}>Clientes</SidebarLink>
              </NextLink>

              <NextLink href="/admin/products" passHref>
                <SidebarLink icon={<IoCart />}>Produtos</SidebarLink>
              </NextLink>
              <NextLink href="/admin/orders" passHref>
                <SidebarLink icon={<IoCash />}>Ordens de Compras</SidebarLink>
              </NextLink>
            </Stack>
          </ScrollArea>
        </Box>
      </Box>
      <Box
        flex="1"
        p={{ base: "0", md: "6" }}
        marginStart={{ md: "var(--sidebar-width)" }}
        position="relative"
        left={isOpen ? "var(--sidebar-width)" : "0"}
        transition="left 0.2s"
      >
        <Box
          maxW="2560px"
          bg={mode("white", "gray.700")}
          height="100%"
          pb="6"
          rounded={{ md: "lg" }}
        >
          <Flex direction="column" height="full">
            <Flex
              w="full"
              py="4"
              justify="space-between"
              align="center"
              px="10"
            >
              <Flex align="center" minH="8">
                <MobileMenuButton onClick={toggle} isOpen={isOpen} />
              </Flex>
            </Flex>
            {children}
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
};

export default Admin;
