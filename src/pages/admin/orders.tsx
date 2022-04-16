import {
  Box,
  Heading,
  Link,
  Stack,
  Table,
  Tag,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import api from "services/api/backend";
import Page from "~/components/Page";
import { PriceTag } from "~/components/PriceTag";

interface Props {}

const BuyerOrders: React.FC = () => {
  const idOrder =
    typeof window !== "undefined" ? localStorage.getItem("orderId") : null;
  const idOrderAux = idOrder?.toString();
  const [ordersId, setOrdersId] = useState("");
  const [ordersTime, setOrdersTime] = useState("");
  const [ordersProductId, setOrdersProductId] = useState("");
  const [ordersProductName, setOrdersProductName] = useState("");
  const [ordersProductSellerUserName, setOrdersProductSellerUserName] =
    useState("");
  const [ordersPrice, setOrdersPrice] = useState("");
  const [ordersStatus, setOrdersStatus] = useState("");

  const getOrders = async () => {
    api.get(`order/${idOrderAux}`).then(async (res) => {
      setOrdersId(res.data.data.product.id);
      setOrdersTime(res.data.data.time);
      setOrdersProductId(res.data.data.product.id);
      setOrdersProductName(res.data.data.product.name);
      setOrdersProductSellerUserName(res.data.data.product.seller.user.name);
      setOrdersPrice(res.data.data.product.price);
      setOrdersStatus(res.data.data.status);
    });
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <Page>
      <Box overflowY="auto" padding="2">
        <Heading size="lg" fontWeight="extrabold" mb="10">
          Ordem de Compra Feitas no Sistema
        </Heading>
        <Stack direction="column">
          (
          <Table variant="striped" size="sm">
            <Thead>
              <Tr>
                <Th>Order ID</Th>
                <Th>Time</Th>
                <Th>Product</Th>
                <Th>Sold By</Th>
                <Th>Price</Th>
                <Th>Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td lineHeight="tall">{ordersId}</Td>
                <Td lineHeight="tall">
                  {new Date(ordersTime).toLocaleString()}
                </Td>
                <Td lineHeight="tall">
                  <Link
                    href={`/products/${ordersProductId}`}
                    color="gray.900"
                    size="5"
                  >
                    {ordersProductName}
                  </Link>
                </Td>
                <Td lineHeight="tall">{ordersProductSellerUserName}</Td>
                <Td lineHeight="tall">
                  <PriceTag price={Number(ordersPrice)} />
                </Td>
                <Td lineHeight="tall">
                  <Tag colorScheme={ordersStatus ? "green" : "red"} size="sm">
                    {ordersStatus ? "Succesful" : "Failed"}
                  </Tag>
                </Td>
              </Tr>
            </Tbody>
          </Table>
          )
        </Stack>
      </Box>
    </Page>
  );
};

export default BuyerOrders;
