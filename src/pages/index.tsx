import { Box, Heading } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import api from "services/api/backend";
import Page from "~/components/Page";
import { ProductCard } from "~/components/ProductCard";
import { ProductGrid } from "~/components/ProductGrid";
import { fetcher } from "~/lib/api";
import { Product } from "../types";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { data, error } = await fetcher("commodities", "GET");

  return {
    props: {
      products: (data as Product[]) ?? null,
      error: error ?? null,
    },
  };
};

const Home = (props: { products: Product[]; error: string }) => {
  return (
    <Page>
      <Box mx="auto">
        <Heading
          as="h1"
          color="gray.800"
          fontWeight="extrabold"
          letterSpacing="tight"
          size="xl"
        >
          Marketplace
        </Heading>
        <ProductGrid marginTop="10">
          {props.products.map((product: Product) =>
            !product.banned ? (
              <ProductCard key={product.id} product={product} />
            ) : (
              ""
            )
          )}
        </ProductGrid>
      </Box>
    </Page>
  );
};

export default Home;
