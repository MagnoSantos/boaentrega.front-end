import { Avatar } from "@chakra-ui/avatar";
import { Container, Heading, Stack, Text } from "@chakra-ui/layout";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  useColorModeValue as mode,
  useToast,
} from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/spinner";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { HiClipboard } from "react-icons/hi";
import api from "services/api/backend";
import Page from "~/components/Page";
import { useUser } from "~/hooks/useUser";
import { fetcher } from "~/lib/api";
import { toastWrapper } from "~/lib/toast";

interface UserData {
  id: string;
  name: string;
  phoneNumber: string;
  address: string;
}

const ProfilePage: React.FC = () => {
  const [users, setUser] = useState();
  const { user, isLoading, mutate } = useUser();
  const router = useRouter();
  const toast = useToast();
  const [userData, setUserData] = useState<UserData>();
  const [loadingUserData, setLoadingUserData] = useState<boolean>(false);
  const [updatingUserData, setUpdatingUserData] = useState<boolean>(false);
  const [requestDeleteUser, setRequestDeleteUser] = useState<boolean>(false);
  const [showDeleteForm, setShowDeleteForm] = useState<boolean>(false);
  const [otpValue, setOtpValue] = useState<string>("");
  const keyboardRef = useRef<any>(null);

  useEffect(() => {
    if (!user && !isLoading) {
      toastWrapper(
        toast,
        "You must login to view the profile",
        "Login obrigatório"
      );
      router.push("/");
      return;
    }
    getUserData();
  }, []);

  const getUserData = async () => {
    api.get(`/users/${user?.id}/profile`).then((res) => {
      console.log("res", res);
      if (res.data.data) setUserData(res.data.data);
    });
  };

  const updateUser = async (values: UserData) => {
    if (!user) return;
    setUpdatingUserData(true);
    await api.patch(`users/${user.id}/profile`, values).then(async (response) => {
      toastWrapper(
        toast,
        response.data.sucess,
        "Sucesso",
        "Perfil Atualizado!"
      );
      setUpdatingUserData(false);
    });
    router.reload();
  };

  const requestDelete = async () => {
    setRequestDeleteUser(true);
    const { error } = await fetcher("users/request-delete", "POST");
    setRequestDeleteUser(false);
    if (!error || error.includes("already sent")) setShowDeleteForm(true);
    toastWrapper(
      toast,
      error,
      "Email sent!",
      "An OTP has been sent to your email. Please do not share it with anyone."
    );
  };

  const deleteAccount = async () => {
    if (!user || !otpValue) return;
    setRequestDeleteUser(true);
    const { error } = await fetcher(`users/${user.id}`, "DELETE", {
      otp: otpValue,
    });
    setRequestDeleteUser(false);
    toastWrapper(
      toast,
      error,
      "Account deleted",
      "Your account has been deleted!"
    );
    if (!error) {
      window.location.href = "/";
    }
  };

  const requiredValidator = (value: string) => !value && "Obrigatório";

  const UserEditor: React.FC = () => (
    <Formik
      initialValues={
        {
          name: userData?.name,
          address: userData?.address,
          phoneNumber: userData?.phoneNumber,
        } as UserData
      }
      onSubmit={updateUser}
    >
      {() => (
        <Form>
          <Stack spacing="-px">
            <Field name="name" validate={requiredValidator}>
              {({ field, form }: any) => (
                <FormControl
                  id="name"
                  isInvalid={form.errors.name && form.touched.name}
                >
                  <FormLabel srOnly htmlFor="name">
                    Name
                  </FormLabel>
                  <Input
                    size="lg"
                    name="name"
                    type="text"
                    required
                    placeholder="Name"
                    bg={mode("white", "gray.700")}
                    fontSize="md"
                    roundedBottom="0"
                    {...field}
                  />
                  <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field
              name="phoneNumber"
              validate={(value: string) => {
                if (!value) return "Obrigatório";
              }}
            >
              {({ field, form }: any) => (
                <FormControl
                  id="phoneNumber"
                  isInvalid={
                    form.errors.phoneNumber && form.touched.phoneNumber
                  }
                >
                  <FormLabel srOnly htmlFor="phoneNumber">
                    Phone number
                  </FormLabel>
                  <Input
                    size="lg"
                    name="phoneNumber"
                    type="text"
                    placeholder="Phone number"
                    bg={mode("white", "gray.700")}
                    fontSize="md"
                    required
                    roundedBottom="0"
                    roundedTop="0"
                    {...field}
                  />
                  <FormErrorMessage>{form.errors.phoneNumber}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="address" validate={requiredValidator}>
              {({ field, form }: any) => (
                <FormControl
                  id="address"
                  isInvalid={form.errors.address && form.touched.address}
                >
                  <FormLabel srOnly htmlFor="address">
                    Address
                  </FormLabel>
                  <Input
                    size="lg"
                    name="address"
                    type="text"
                    placeholder="Address"
                    bg={mode("white", "gray.700")}
                    fontSize="md"
                    roundedTop="0"
                    required
                    {...field}
                  />
                  <FormErrorMessage>{form.errors.address}</FormErrorMessage>
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
            isLoading={updatingUserData}
          >
            Atualizar dados de perfil
          </Button>
        </Form>
      )}
    </Formik>
  );

  const DeleteForm: React.FC = () => (
    <Formik initialValues={{ otp: "" }} onSubmit={deleteAccount}>
      {() => (
        <Form>
          <Stack spacing="-px">
            <Field name="otp">
              {({ field: { value, ...field } }: any) => (
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
                      roundedRight="0"
                      cursor="default"
                      {...field}
                    />
                    <IconButton
                      colorScheme="blue"
                      aria-label="Paste OTP"
                      icon={<HiClipboard size="26" />}
                      size="lg"
                      roundedLeft="0"
                      onClick={async () => {
                        const value =
                          await window.navigator.clipboard.readText();
                        setOtpValue(value);
                        keyboardRef.current.setInput(value);
                      }}
                    />
                  </InputGroup>
                </FormControl>
              )}
            </Field>
          </Stack>
          <Button
            size="lg"
            type="submit"
            mt="8"
            w="full"
            colorScheme="red"
            fontSize="md"
            fontWeight="bold"
            isLoading={requestDeleteUser}
            disabled={otpValue.length === 0}
          >
            Delete my account
          </Button>
        </Form>
      )}
    </Formik>
  );

  return (
    <Page>
      <Stack spacing="12">
        <Stack direction="column" spacing="6">
          <Heading size="lg">Profile</Heading>
          {loadingUserData ? (
            <Container centerContent maxWidth="unset" padding="20">
              <Stack direction="row" spacing="5" alignItems="center">
                <Spinner />
                <Text>Getting your data...</Text>
              </Stack>
            </Container>
          ) : (
            <Stack direction="row" spacing="10">
              <Avatar size="xl" name={userData?.name} />
              <UserEditor />
            </Stack>
          )}
        </Stack>
      </Stack>
    </Page>
  );
};

export default ProfilePage;
