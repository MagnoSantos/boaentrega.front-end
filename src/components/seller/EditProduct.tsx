import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
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
import { toastWrapper } from "~/lib/toast";
import validate from "~/lib/validate";
import { Product } from "~/types";
import { FileInput } from "../FileInput";

interface Props {
  product: Product;
}

const EditProduct = ({ product }: Props) => {
  const idSeller =
    typeof window !== "undefined" ? localStorage.getItem("id") : null;
  const idSellerAux = idSeller?.toString();
  const [primeiraImagem, setValuePrimeiraImagem] = useState("");
  const image = {
    path: primeiraImagem,
  };

  const handlePrimeiraImagemChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => setValuePrimeiraImagem(event.target.value);

  const [productData, setProducts] = useState<Product[]>();
  const [loading, setLoading] = useState<boolean>(false);
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
    setLoading(true);
    await api
      .patch(`commodities/${product.id}`, props.values)
      .then(async (response) => {
        if (!response.data.error) {
          await api
            .patch(
              `commodities/${product.id}/images/${product.images[0].id}`,
              image
            )
            .then(async (response) => {
              console.log("response", response);
              props.resetForm();
              router.reload();
            });
        }

        setLoading(false);

        toastWrapper(
          toast,
          "",
          "Produto Editado!",
          "Produto editado com sucesso"
        );
      });
  };

  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    api.get("commodities/categories").then((res) => {
      if (res.data.data) setCategories([...res.data.data]);
    });
    api.get("commodities").then((res) => {
      if (res.data.data) setProducts(res.data.data);
    });
  }, []);

  return (
    <>
      <Box maxW="sm">
        <Formik
          initialValues={{
            name: product.name,
            description: product.description,
            price: product.price.toString(),
            category: product.category?.id,
            idSeller: idSellerAux,
          }}
          onSubmit={(e: any) => {
            e.preventDefault();
          }}
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
                      <FormLabel htmlFor="name">Product name</FormLabel>
                      <Input
                        name="name"
                        type="name"
                        autoComplete="name"
                        required
                        placeholder="Product name"
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
                        Product description
                      </FormLabel>
                      <Textarea
                        name="description"
                        type="description"
                        required
                        placeholder="Product description"
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
                      <FormLabel htmlFor="price">Price</FormLabel>
                      <InputGroup>
                        <InputLeftElement
                          pointerEvents="none"
                          color="gray.300"
                          fontSize="1.2em"
                          children="₹"
                        />
                        <Input
                          name="price"
                          type="price"
                          required
                          placeholder="Price"
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
                      isInvalid={form.errors.category && form.touched.category}
                      color="gray.600"
                      isRequired
                    >
                      <FormLabel htmlFor="category">Category</FormLabel>
                      <Select
                        value={product.category?.id}
                        placeholder="Select category"
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
                  <Stack spacing="4">
                    <Input
                      value={primeiraImagem}
                      onChange={handlePrimeiraImagemChange}
                      placeholder="Insira a url da primeira imagem do produto"
                      size="sm"
                    />
                  </Stack>
                  <FileInput
                    validateForm={props.validateForm}
                    label="Save Product"
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
  );
};

export default EditProduct;
