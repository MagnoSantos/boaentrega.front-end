import { Flex, Heading, Spinner, Text, useToast } from "@chakra-ui/react";
import router from "next/router";
import * as React from "react";
import { useEffect, useState } from "react";
import api from "services/api/backend";
import { AdminProductCard } from "~/components/admin/AdminProductCard";
import Dashboard from "~/components/admin/Dashboard";
import { ProductGrid } from "~/components/ProductGrid";
import { useAllProducts } from "~/hooks/useAllProducts";
import { fetcher } from "~/lib/api";
import { toastWrapper } from "~/lib/toast";
import { Product } from "~/types";

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>();
  useEffect(() => {
    api.get("commodities").then((res) => {
      if (res.data.data) setProducts(res.data.data);
    });
  }, []);
  const toast = useToast();

  const onBan = async (productId: string) => {
    api.post(`commodities/${productId}/ban`).then(async (res) => {
      if (res.data.error) {
        toastWrapper(toast, res.data.error, "Error", res.data.error);
        await sleep(2500);
        router.reload();
      } else {
        toastWrapper(toast, undefined, "Atenção!", "Produto banido!");
        await sleep(2500);
        router.reload();
      }
    });
  };

  async function sleep(msec: number | undefined) {
    return new Promise((resolve) => setTimeout(resolve, msec));
  }

  const onUnban = async (productId: string) => {
    api.post(`commodities/${productId}/unban`).then(async (res) => {
      if (res.data.error) {
        toastWrapper(toast, res.data.error, "Error", res.data.error);
        await sleep(2500);
        router.reload();
      } else {
        toastWrapper(toast, undefined, "Atenção!", "Produto desbanido!");
        await sleep(2500);
        router.reload();
      }
    });
  };

  return (
    <Dashboard>
      <Flex
        direction="column"
        flex="1"
        overflow="auto"
        px="10"
        pt={{ md: 1, base: 1 }}
      >
        <Heading size="lg" fontWeight="extrabold" mb="6">
          Todos os produtos
        </Heading>
        <ProductGrid>
          {products?.map((product) => (
            <AdminProductCard
              key={product.id}
              product={product}
              buttonText={product.banned ? "Desbanir" : "Banir"}
              buttonColor={product.banned ? "green" : "red"}
              onButtonClick={() =>
                product.banned ? onUnban(product.id) : onBan(product.id)
              }
            />
          ))}
        </ProductGrid>
      </Flex>
    </Dashboard>
  );
};

export default Products;
