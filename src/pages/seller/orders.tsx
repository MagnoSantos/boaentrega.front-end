import {
  Flex,
  Heading,
  Link,
  Spinner,
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
import { PriceTag } from "~/components/PriceTag";
import Dashboard from "~/components/seller/Dashboard";
import { useSeller } from "~/hooks/useSeller";

const SellerOrders: React.FC = () => {
  const { seller } = useSeller();

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
  });

  return (
    <Dashboard>
      <Flex
        direction="column"
        flex="1"
        overflow="auto"
        px="10"
        pt={{ md: 1, base: 1 }}
        maxWidth="100vw"
      >
        <Heading size="lg" fontWeight="extrabold" mb="6">
          Minhas Ordens
        </Heading>
        
        <Table variant="striped" size="sm">
          <Thead position="sticky" top="0" bg="white">
            <Tr>
              <Th>Order ID</Th>
              <Th>Tempo</Th>
              <Th>Produto</Th>
              <Th>Preço</Th>
              <Th>Comprador</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td lineHeight="tall">{ordersId}</Td>
              <Td lineHeight="tall">{new Date(ordersTime).toLocaleString()}</Td>
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
                  {ordersStatus ? "Sucesso" : "Falha"}
                </Tag>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </Flex>
    </Dashboard>
  );
};

export default SellerOrders;
