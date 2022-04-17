import {
  Heading,
  UnorderedList,
  ListItem,
  Text,
  Link,
  Box,
  Divider,
} from "@chakra-ui/react";
import Page from "~/components/Page";
import React from "react";

export default function PrivacyPolicy() {
  return (
    <Page>
      <Box marginX="auto" paddingBottom={3} maxW="container.md">
        <Heading mb="2" size="lg">
          {" "}
          Boa Entrega Política de Privacidade{" "}
        </Heading>
        <Text as="span" fontWeight="semibold">
          {" "}
          última atualização:
        </Text>{" "}
        <Text as="span" fontWeight="md">
          {" "}
          17 de abril de 2022
        </Text>
        <Divider mt="5" borderColor="grey" />
        <Text mt="5">
          É importante para você conhecer a forma como as suas informações são usadas e compartilhadas, 
          agradecemos a confiança e ressaltamos que teremos cuidado e sensibilidade ao traté-las. Neste
          aviso de privacidade é explicado como a empresa Boa Entrega coleta e processa suas informações
          pessoais através do site. 
        </Text>
        <Text mt="2">
          Ao usar o Boa Entrega, você concorda com o uso de informações pessoais (incluindo informações pessoais
          confidenciais) de acordo com este Termo de Privacidade. 
        </Text>
        <Heading mt="5" size="md">
          Quais informações o Boa Entrega coleta?
        </Heading>
        <Text mt="2">
          Nós coletamos informações pessoais para prestação de serviços.
          Aqui está a lista de informações pessoais coletadas. 
        </Text>
        <UnorderedList mt="2">
          <ListItem fontWeight="semibold" as="span">
            Informações que nos são passadas:{" "}
          </ListItem>{" "}
          <Text as="span">
            Nós armazenamos seu nome, email, número de telefone e sua senha através de hashs 
            criptoográficos. 
          </Text>
          <Text></Text>
          <ListItem fontWeight="semibold" as="span">
            Informações automáticas:{" "}
          </ListItem>{" "}
          <Text as="span">
            Podemos coltar informações automáticas sobre o seu uso da aplicação. Incluindo informações 
            sobre integraçaõ com nossos conteúdos e serviços. Como: cookies, histórico ou endereço de IP. 
          </Text>
        </UnorderedList>
        <Text mt="2">
          Não são coletas informações confidenciais relacionadas a pagamentos, como detalhes 
          de cartão de crédito.
        </Text>
        <Heading mt="5" size="md">
          Com qual finalidade são coletas informações e qual a utilização das informações pessoais?
        </Heading>
        <Text mt="2">
          Usamos suas informações para operar, fornecer, desenvolver e melhorar os nossos produtos e serviços que 
          são ofertados.
        </Text>
        <Heading mt="5" mb="2" size="md">
          Contato
        </Heading>
        <Text as="span">
        Para qualquer dúvida, você pode entrar em contato conosco:{" "}
        </Text>{" "}
        <UnorderedList>
          <ListItem>
            Magno Juliano Gonçalves Santos{" "}
            <Link color="purple.600" href="mailto:magno.ufvjm@gmail.com">
              (magno.ufvjm@gmail.com)
            </Link>
          </ListItem>
        </UnorderedList>
      </Box>
    </Page>
  );
}
