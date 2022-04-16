import { Box, Flex, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import React from "react";
import { AnalyticsChart, DonutChart } from "~/components/Chart";
import Dashboard from "~/components/seller/Dashboard";

interface Props {}

const Dashboards = ({}: Props) => {
  return (
    <Dashboard>
      <>
        <Heading size="lg" fontWeight="extrabold" mb="6">
          Dashboard
        </Heading>
        <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
          <SimpleGrid flex="1" gap="4" minChildWidth="320px">
            <Box p={["6", "8"]} bg="gray.800" borderRadius={8} pb="4">
              <Text fontSize="lg" mb="4" color={"white"}>
                Evolução da quantidade de produtos adicionados por dia
              </Text>
              <AnalyticsChart />
            </Box>
            <Box p={["6", "8"]} bg="gray.400" borderRadius={8} pb="4">
              <Text fontSize="lg" mb="4" color={"grey.800"}>
                Porcentagem de produtos por categoria
              </Text>
              <DonutChart />
            </Box>
          </SimpleGrid>
        </Flex>
      </>
    </Dashboard>
  );
};

export default Dashboards;
