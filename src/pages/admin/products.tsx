import { Flex, Heading, Spinner, Text, useToast } from "@chakra-ui/react";
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
    const res = await fetcher(`products/${productId}/ban`, "POST", {});
    if (res.error) {
      toastWrapper(toast, res.error, "Error", res.error);
    } else {
      toastWrapper(toast, undefined, "Info", "Banned");
    }
  };

  const onUnban = async (productId: string) => {
    const res = await fetcher(`products/${productId}/unban`, "POST", {});
    if (res.error) {
      toastWrapper(toast, res.error, "Error", res.error);
    } else {
      toastWrapper(toast, undefined, "Info", "Unbanned");
    }
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
              buttonText={product.banned ? "Unban" : "Ban"}
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
