import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Stack,
  Textarea,
  useColorModeValue as mode,
  useToast,
} from "@chakra-ui/react";
import { Field, Form, Formik, FormikProps } from "formik";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import api from "services/api/backend";
import { FileInput } from "~/components/FileInput";
import Dashboard from "~/components/seller/Dashboard";
import { toastWrapper } from "~/lib/toast";
import validate from "~/lib/validate";

const NewProduct: React.FC = () => {
  const idSeller =
    typeof window !== "undefined" ? localStorage.getItem("id") : null;
  const idSellerAux = idSeller?.toString();
  const [loading, setLoading] = useState<boolean>(false);
  const [primeiraImagem, setValuePrimeiraImagem] = useState("");
  const image = {
    path: primeiraImagem,
  };

  const handleChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => setValuePrimeiraImagem(event.target.value);
  const router = useRouter();

  const toast = useToast();
  const submit = async (
    formData: any,
    props: FormikProps<{
      name: string;
      description: string;
      price: string;
      category: string;
      idSeller: string | undefined;
    }>
  ) => {
    api.post("commodities", props.values).then(async (response) => {
      console.log("PLAYSTATION", props.values);
      console.log("response", response.data.data.id);

      if (response.data.success) {
        setLoading(true);
        api.post(`commodities/${response.data.data.id}/images`, image);
        toastWrapper(
          toast,
          response.data.message,
          "Produto adicionado!",
          "Produto adicionado com sucesso!"
        );
        setLoading(false);
        props.resetForm();
        // router.reload();
      }
    });
  };

  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    api.get("commodities/categories").then((res) => {
      if (res.data.data) setCategories([...res.data.data]);
    });
  }, []);

  return (
    <Dashboard>
      <>
        <Heading size="lg" fontWeight="extrabold" mb="6">
          Adicionar Produtos
        </Heading>
        <Box maxW="sm">
          <Formik
            initialValues={{
              name: "",
              description: "",
              price: "",
              category: "",
              idSeller: idSellerAux,
            }}
            onSubmit={() => {}}
          >
            {(props) => (
              <Form>
                <Stack spacing={3}>
                  <Field name="name" validate={validate.required}>
                    {({ field, form }: any) => (
                      <FormControl
                        id="name"
                        isInvalid={form.errors.name && form.touched.name}
                        color="gray.600"
                        isRequired
                      >
                        <FormLabel htmlFor="name">Nome produto</FormLabel>
                        <Input
                          name="name"
                          type="name"
                          autoComplete="name"
                          required
                          placeholder=""
                          bg={mode("white", "gray.700")}
                          fontSize="md"
                          {...field}
                        />
                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="description" validate={validate.required}>
                    {({ field, form }: any) => (
                      <FormControl
                        id="description"
                        isInvalid={
                          form.errors.description && form.touched.description
                        }
                        color="gray.600"
                        isRequired
                      >
                        <FormLabel htmlFor="description">
                          Descrição do produto
                        </FormLabel>
                        <Textarea
                          name="description"
                          type="description"
                          required
                          placeholder=""
                          bg={mode("white", "gray.700")}
                          fontSize="md"
                          {...field}
                        />
                        <FormErrorMessage>
                          {form.errors.description}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="price" validate={validate.number}>
                    {({ field, form }: any) => (
                      <FormControl
                        id="price"
                        isInvalid={form.errors.price && form.touched.price}
                        color="gray.600"
                        isRequired
                      >
                        <FormLabel htmlFor="price">Preço</FormLabel>
                        <InputGroup>
                          <InputLeftElement
                            pointerEvents="none"
                            color="gray.300"
                            fontSize="1.2em"
                            children="R$"
                          />
                          <Input
                            name="price"
                            type="price"
                            required
                            placeholder=""
                            bg={mode("white", "gray.700")}
                            fontSize="md"
                            {...field}
                          />{" "}
                        </InputGroup>
                        <FormErrorMessage>{form.errors.price}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="category" validate={validate.required}>
                    {({ field, form }: any) => (
                      <FormControl
                        id="category"
                        isInvalid={
                          form.errors.category && form.touched.category
                        }
                        color="gray.600"
                        isRequired
                      >
                        <FormLabel htmlFor="category">Categoria</FormLabel>
                        <Select
                          placeholder="Selecione a categoria"
                          bg={mode("white", "gray.700")}
                          color="gray.600"
                          {...field}
                        >
                          {categories.map((item) => (
                            <option value={item.id}>{item.name}</option>
                          ))}
                        </Select>
                        <FormErrorMessage>
                          {form.errors.category}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <FormControl id="price" color="gray.600" isRequired>
                    <FormLabel htmlFor="product-image">
                      Imagem dos produtos
                    </FormLabel>
                    <Input
                      value={primeiraImagem}
                      onChange={handleChange}
                      placeholder="Insira a url da imagem"
                      size="sm"
                    />
                    <FileInput
                      validateForm={props.validateForm}
                      label="Adicionar os Produtos"
                      uploadFileName="product-image"
                      acceptedFileTypes="image/*"
                      allowMultipleFiles={true}
                      minFiles={0}
                      onChange={(formData) => submit(formData, props)}
                      isLoading={loading}
                    />
                  </FormControl>
                </Stack>
              </Form>
            )}
          </Formik>
        </Box>
      </>
    </Dashboard>
  );
};

export default NewProduct;
