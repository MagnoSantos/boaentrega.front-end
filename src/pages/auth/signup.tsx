import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Text,
  useColorModeValue as mode,
  useToast,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { ReactElement, useState } from "react";
import Page from "~/components/Page";
import { useAuth } from "~/hooks/useAuth";
import { toastWrapper } from "~/lib/toast";
import validate from "~/lib/validate";
import { SignUpData } from "~/types";

interface Props {}

export default function Signup({}: Props): ReactElement {
  const [loading, setLoading] = useState<boolean>(false);
  const [privacyChecked, setPrivacyChecked] = useState<boolean>(false);
  const { signUp } = useAuth();
  const toast = useToast();
  const router = useRouter();

  const onSubmit = async (values: SignUpData) => {
    if (!privacyChecked) {
      toastWrapper(toast, "Você precisa aceitar a política de privacidade", "", "error");
      return;
    }
    setLoading(true);
    const success = await signUp(values);
    setLoading(false);
    if (success) router.push("/");
  };

  return (
    <Page>
      <Box maxW="sm" mx="auto">
        <Box textAlign="center" mb={{ base: "10", md: "16" }}>
          <Heading
            as="h1"
            size="xl"
            fontWeight="extrabold"
            letterSpacing="tight"
          >
            Criar uma conta
          </Heading>
          <Text mt="3" color={mode("gray.600", "gray.400")} fontWeight="medium">
            Já tem uma conta?{" "}
            <NextLink href="/auth/login" passHref>
              <Link color="purple.600">Logar!</Link>
            </NextLink>
          </Text>
        </Box>
        <Formik
          initialValues={
            {
              fullName: "",
              email: "",
              password: "",
              confirmPassword: "",
            } as SignUpData
          }
          onSubmit={onSubmit}
        >
          {(props) => (
            <Form>
              <Stack spacing="-px">
                <Field name="fullName" validate={validate.fullName}>
                  {({ field, form }: any) => (
                    <FormControl
                      id="fullName"
                      isInvalid={form.errors.fullName && form.touched.fullName}
                    >
                      <FormLabel srOnly htmlFor="fullName">
                        Nome completo
                      </FormLabel>
                      <Input
                        size="lg"
                        name="fullName"
                        type="name"
                        autoComplete="name"
                        required
                        placeholder="Nome completo"
                        bg={mode("white", "gray.700")}
                        fontSize="md"
                        roundedBottom="0"
                        {...field}
                      />
                      <FormErrorMessage>
                        {form.errors.fullName}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="email" validate={validate.email}>
                  {({ field, form }: any) => (
                    <FormControl
                      id="email"
                      isInvalid={form.errors.email && form.touched.email}
                    >
                      <FormLabel srOnly htmlFor="email">
                        Nome completo
                      </FormLabel>
                      <Input
                        size="lg"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        placeholder="Email"
                        bg={mode("white", "gray.700")}
                        fontSize="md"
                        rounded="0"
                        {...field}
                      />
                      <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="password" validate={validate.password}>
                  {({ field, form }: any) => (
                    <FormControl
                      id="password"
                      isInvalid={form.errors.password && form.touched.password}
                    >
                      <FormLabel srOnly htmlFor="password">
                        Nome completo
                      </FormLabel>
                      <Input
                        size="lg"
                        name="password"
                        type="password"
                        autoComplete="password"
                        required
                        placeholder="Senha"
                        bg={mode("white", "gray.700")}
                        fontSize="md"
                        rounded="0"
                        {...field}
                      />
                      <FormErrorMessage>
                        {form.errors.password}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field
                  name="confirmPassword"
                  validate={(value: string) =>
                    validate.confirmPassword(value, props.values.password)
                  }
                >
                  {({ field, form }: any) => (
                    <FormControl
                      id="confirmPassword"
                      isInvalid={
                        form.errors.confirmPassword &&
                        form.touched.confirmPassword
                      }
                    >
                      <FormLabel srOnly htmlFor="confirmPassword">
                        Nome completo
                      </FormLabel>
                      <Input
                        size="lg"
                        name="confirmPassword"
                        type="password"
                        autoComplete="confirmPassword"
                        required
                        placeholder="Confirm Password"
                        bg={mode("white", "gray.700")}
                        fontSize="md"
                        roundedTop="0"
                        {...field}
                      />
                      <FormErrorMessage>
                        {form.errors.confirmPassword}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </Stack>
              <Checkbox
                name="privacy"
                isChecked={privacyChecked}
                onChange={(e) => setPrivacyChecked(e.target.checked)}
                marginTop={4}
              >
                Eu aceito a política de privacidade Boa Entrega{" "}
                <Link href="/privacy-policy" color="purple.500">
                  política de privacidade.
                </Link>
              </Checkbox>
              <Button
                size="lg"
                type="submit"
                mt="8"
                w="full"
                colorScheme="purple"
                fontSize="md"
                fontWeight="bold"
                isLoading={loading}
              >
                Inscrever
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Page>
  );
}
