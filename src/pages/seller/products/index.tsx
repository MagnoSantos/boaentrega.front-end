import { Heading, Spinner, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import api from "services/api/backend";
import { ProductGrid } from "~/components/ProductGrid";
import Dashboard from "~/components/seller/Dashboard";
import { SellerProductCard } from "~/components/seller/SellerProductCard";
import { useSeller } from "~/hooks/useSeller";
import { Product } from "~/types";

interface Props {}

const SellerProducts = ({}: Props) => {
  const [products, setProducts] = useState<Product[]>();
  const { seller } = useSeller();
  const idSeller = "82973833-2270-46dc-86ca-411c4b27a83c";

  useEffect(() => {
    api.get(`commodities/seller/${idSeller}`).then((res) => {
      console.log("resSeller", res);
      if (res.data.data) setProducts(res.data.data);
    });
  }, []);

  return (
    <Dashboard>
      <>
        <Heading size="lg" fontWeight="extrabold" mb="6">
          Meus Produtos
        </Heading>
        <ProductGrid>
          {!products ? (
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="purple.500"
              size="xl"
            />
          ) : products.length > 0 ? (
            products.map((product) => (
              <SellerProductCard key={product.id} product={product} />
            ))
          ) : (
            <Text as="i">Não existem produtos cadastrados.</Text>
          )}
        </ProductGrid>
      </>
    </Dashboard>
  );
};

export default SellerProducts;
