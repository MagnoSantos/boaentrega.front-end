import { SearchIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useToast,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuth } from "~/hooks/useAuth";
import { useUser } from "~/hooks/useUser";
import Logo from "./Logo";
import { fetcher } from "~/lib/api";
import { toastWrapper } from "~/lib/toast";

interface Props {}

const Header = (props: Props) => {
  const [loggingOut, setLoggingOut] = useState<boolean>(false);
  const { user, isLoading } = useUser();
  const [searchvalue, setValue] = useState("");
  const { logout } = useAuth();
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    fetcher("", "GET");
    if (!localStorage.getItem("ecstacy-cookie-policy")) {
      toastWrapper(
        toast,
        undefined,
        "Política de cookies",
        "Ao continuar acessando o site, você concorda com a política de cookies e de privacidade para melhor experiência.",
        true
      );
      localStorage.setItem("ecstacy-cookie-policy", "agreed");
    }
  }, []);

  const onLogout = async () => {
    setLoggingOut(true);
    await logout();
    setLoggingOut(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setValue(event.target.value);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && searchvalue.length > 0) {
      router.push(`/search/${searchvalue.replace(/\s/g, "%20")}`);
    }
  };

  return (
    <Box borderBottom="1px" borderColor="gray.200">
      <Container maxW="container.lg" py="5">
        <Flex alignItems="center" justifyContent="space-between">
          <Logo />
          <InputGroup maxW="lg" marginX="3">
            <InputLeftElement
              pointerEvents="none"
              children={<SearchIcon color="gray.400" />}
            />
            <Input
              variant="filled"
              marginRight="12"
              type="search"
              value={searchvalue}
              onChange={handleChange}
              onKeyPress={handleKeyDown}
            />
          </InputGroup>
          <HStack
            spacing="10"
            alignItems="center"
            justifyContent="space-between"
          >
            <NextLink href="/" passHref>
              <Link fontSize="md" color="gray.700" fontWeight="medium">
                Área do Cliente
              </Link>
            </NextLink>
            <NextLink href="/seller/dashboards" passHref>
              <Link fontSize="md" color="gray.700" fontWeight="medium">
                Área do Vendedor
              </Link>
            </NextLink>
            {user.name?.length !== 0 ? (
              <>
                <Button
                  colorScheme="red"
                  size="sm"
                  onClick={onLogout}
                  isLoading={isLoading || loggingOut}
                >
                  Sair
                </Button>
                <Menu>
                  <MenuButton>
                    <Avatar size="md" name={user.name} cursor="pointer" />
                  </MenuButton>
                  <MenuList>
                    <MenuItem fontSize="sm">
                      <NextLink href="/profile">Perfil</NextLink>
                    </MenuItem>
                    <MenuItem fontSize="sm">
                      <NextLink href="/orders">Minhas ordens</NextLink>
                    </MenuItem>
                  </MenuList>
                </Menu>
              </>
            ) : (
              <NextLink href="/auth/login" passHref>
                <Button colorScheme="purple" size="sm" isLoading={isLoading}>
                  Log In
                </Button>
              </NextLink>
            )}
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
