import useSWR from "swr";
import { fetcher } from "~/lib/api";
import { Product } from "../types";
import { useEffect, useState } from "react";
import api from "services/api/backend";

export const useAllProducts = () => {
  const [productData, setProducts] = useState<Product[]>();
  useEffect(() => {
    api.get("commodities").then((res) => {
      if (res.data.data) setProducts(res.data.data);
    });
  }, []);

  const {
    data: unbannedProducts,
    error: unbannedError,
    mutate: unbannedMutate,
  } = useSWR("products", fetcher);
  const {
    data: bannedProducts,
    error: bannedProductsError,
    mutate: bannedProductsMutate,
  } = useSWR("products/banned", fetcher);

  const error = unbannedError || bannedProductsError;

  const mutate = () => {
    unbannedMutate();
    bannedProductsMutate();
  };

  let products: Product[] = [];
  if (unbannedProducts) {
    products = [...(productData as Product[])];
  }

  if (bannedProducts) {
    products = [...products, ...(productData as Product[])];
  }

  return {
    products,
    error,
    mutate,
    isLoading: !error && !unbannedProducts && !bannedProducts,
  };
};
