import { Flex, Heading, Text, useToast } from "@chakra-ui/react";
import * as React from "react";
import { useEffect, useState } from "react";
import api from "services/api/backend";
import useSWR from "swr";
import Dashboard from "~/components/admin/Dashboard";
import { UserCard } from "~/components/admin/UserCard";
import { ProductGrid } from "~/components/ProductGrid";
import { fetcher } from "~/lib/api";
import { SellerNewUser } from "~/types";

const Sellers: React.FC = () => {
  const [sellersData, setSellersData] = useState<SellerNewUser[]>();
  useEffect(() => {
    api.get("sellers").then((res) => {
      if (res.data.data) setSellersData(res.data.data);
    });
  }, []);

  const getApprovedSellers = (sellers: SellerNewUser[]) =>
    sellers.filter(({ approved }) => approved);

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
          All Sellers
        </Heading>
        {!!sellersData &&
          (getApprovedSellers(sellersData).length ? (
            <ProductGrid>
              {getApprovedSellers(sellersData).map((seller) => (
                <UserCard
                  key={seller.id}
                  name={seller.user.name}
                  email={seller.user.email}
                />
              ))}
            </ProductGrid>
          ) : (
            <Text>No sellers found</Text>
          ))}
      </Flex>
    </Dashboard>
  );
};

export default Sellers;
