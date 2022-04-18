import {
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  IconButton,
  Input,
  InputGroup,
  Stack,
  Text,
  useColorModeValue as mode,
  useToast,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { HiClipboard } from "react-icons/hi";
import Page from "~/components/Page";
import VirtualKeyboard from "~/components/VirtualKeyboard";
import { useUser } from "~/hooks/useUser";
import { fetcher } from "~/lib/api";
import { toastWrapper } from "~/lib/toast";
import validate from "~/lib/validate";

const ForgotPassword: React.FC = () => {
  const { user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [showUpdateForm, setShowUpdateForm] = useState<boolean>(false);
  const [otpValue, setOtpValue] = useState<string>("");
  const keyboardRef = useRef<any>(null);
  const toast = useToast();

  useEffect(() => {
    if (user) router.push("/");
  }, [user]);

  const submitForgotPassword = async (values: { email: string }) => {
    setLoading(true);
    const { error } = await fetcher("auth/forgot-password", "POST", values);
    setLoading(false);
    if (!error || error.includes("already sent")) setShowUpdateForm(true);
    toastWrapper(
      toast,
      error,
      "E-mail enviado",
      "Um OTP foi enviado ao seu e-mail. Por favor não compartilhe com outra pessoa!"
    );
  };

  const submitUpdatePassword = async (values: { password: string }) => {
    if (!otpValue) return;
    setLoading(true);
    const { error } = await fetcher("auth/update-password", "POST", {
      otp: otpValue,
      password: values.password,
    });
    setLoading(false);
    toastWrapper(
      toast,
      error,
      "Senha atualizada",
      "Entre na sua conta utilizando sua nova senha!"
    );
    if (!error) router.push("/auth/login");
  };

  const ForgotPasswordForm: React.FC = () => (
    <Text>Em Desenvolvimento</Text> 
  );

  const UpdatePasswordForm: React.FC = () => (
    <Formik
      initialValues={{ otp: "", password: "" }}
      onSubmit={submitUpdatePassword}
    >
      {() => (
        <Form>
          <Stack spacing="-px">
            <Field name="otp">
              {({ field: { value, ...field }, form }: any) => (
                <FormControl id="otp">
                  <FormLabel srOnly htmlFor="otp">
                    OTP Token
                  </FormLabel>
                  <InputGroup>
                    <Input
                      size="lg"
                      name="otp"
                      type="text"
                      required
                      placeholder="OTP token"
                      bg={mode("white", "gray.700")}
                      fontSize="md"
                      value={otpValue}
                      readOnly
                      cursor="default"
                      roundedBottom="0"
                      roundedRight="0"
                      {...field}
                    />
                    <IconButton
                      colorScheme="blue"
                      aria-label="Paste OTP"
                      icon={<HiClipboard size="26" />}
                      size="lg"
                      roundedLeft="0"
                      roundedBottom="0"
                      onClick={async () => {
                        const value =
                          await window.navigator.clipboard.readText();
                        setOtpValue(value);
                        keyboardRef.current.setInput(value);
                      }}
                    />
                  </InputGroup>
                  <FormErrorMessage>{form.errors.otp}</FormErrorMessage>
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
                    Nova senha
                  </FormLabel>
                  <Input
                    size="lg"
                    name="password"
                    type="password"
                    required
                    placeholder="New password"
                    bg={mode("white", "gray.700")}
                    fontSize="md"
                    roundedTop="0"
                    {...field}
                  />
                  <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
          </Stack>
          <Button
            size="lg"
            type="submit"
            mt="8"
            w="full"
            colorScheme="purple"
            fontSize="md"
            fontWeight="bold"
            isLoading={loading}
            disabled={otpValue.length === 0}
          >
            Atualizar senha
          </Button>
        </Form>
      )}
    </Formik>
  );

  return (
    <Page>
      <Stack direction="column" spacing="6">
        <Heading size="lg">Resetar sua senha</Heading>
        <Container maxWidth="40ch" padding="0">
          {showUpdateForm ? (
            <Stack direction="column" spacing="8">
              <Text>
                Em desenvolvimento!
              </Text>
              <UpdatePasswordForm />
              <VirtualKeyboard
                onChange={setOtpValue}
                keyboardRef={keyboardRef}
              />
            </Stack>
          ) : (
            <ForgotPasswordForm />
          )}
        </Container>
      </Stack>
    </Page>
  );
};

export default ForgotPassword;
