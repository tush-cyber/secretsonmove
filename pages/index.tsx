import { 
  ConnectWallet, 
  Web3Button, 
  useAddress, 
  useContract, 
  useContractRead 
} from "@thirdweb-dev/react";
import type { NextPage } from "next";
import { 
  Box, 
  Card, 
  CardBody, 
  Container, 
  Flex, 
  Heading, 
  Input, 
  SimpleGrid, 
  Skeleton, 
  Stack, 
  Text 
} from "@chakra-ui/react";
import { ethers } from "ethers";
import { useState } from "react";
import { CONTRACT_ADDRESS } from "../const/addresses";

const Home: NextPage = () => {
  const address = useAddress();

  const { contract } = useContract(CONTRACT_ADDRESS);

  const { 
    data: totalSecrets, 
    isLoading: loadingTotalSecret 
  } = useContractRead(contract, "getTotalSecret");

  const { 
    data: recentSecret, 
    isLoading: loadingRecentSecret 
  } = useContractRead(contract, "getAllSecret");

  const [message, setMessage] = useState<string>("");
  const [name, setName] = useState<string>("");

  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  function clearValues() {
    setMessage("");
    setName("");
  }

  return (
    <Container maxW={"1200px"} w={"full"} py={8}>
      <Flex justifyContent={"space-between"} alignItems={"center"} py={6} height={"80px"}>
        <Box>
          <Text fontSize="2xl" fontWeight={"bold"} color="teal.400">Secret Place</Text>
        </Box>
        <ConnectWallet />
      </Flex>
      <SimpleGrid columns={[1, null, 2]} spacing={10} mt={12}>
        <Box>
          <Card bgGradient="linear(to-r, teal.400, blue.400)" color="white" borderRadius="lg" shadow="md">
            <CardBody>
              <Heading mb={3} color="white">Hey Anon, Leave a secret onchain 💀, costs just 0.01 MOVE, Read on chain secrets🫢</Heading>
              <Flex direction={"row"} alignItems={"center"} mb={4}>
                <Text>Total Secrets:</Text>
                <Skeleton isLoaded={!loadingTotalSecret} width={"30px"} ml={3}>
                  <Text fontWeight={"bold"}>{totalSecrets?.toString()}</Text>
                </Skeleton>
              </Flex>
              <Text fontSize={"lg"}>Name:</Text>
              <Input 
                placeholder="Anon"
                maxLength={16} 
                value={name} 
                onChange={handleNameChange}
                mt={2} 
                mb={4}
                bg="white"
                color="black"
                borderColor="teal.300"
              />
              <Text fontSize={"lg"}>Secret:</Text>
              <Input 
                placeholder="No one's going to know..."
                maxLength={10000} 
                value={message} 
                onChange={handleMessageChange}
                mt={2} 
                mb={6}
                bg="white"
                color="black"
                borderColor="teal.300"
              />
              <Box textAlign={"center"}>
                {address ? (
                  <Web3Button
                    contractAddress={CONTRACT_ADDRESS}
                    action={(contract) => {
                      contract.call("buySecret", [message, name], {value: ethers.utils.parseEther("0.01")})
                    }}
                    onSuccess={() => clearValues()}
                  >
                    {"F*ck it, 0.01 MOVE"}
                  </Web3Button>
                ) : (
                  <Text color="gray.300">Please connect your wallet</Text>
                )}
              </Box>
            </CardBody>
          </Card>
        </Box>
        <Box>
          <Card maxH={"60vh"} overflowY={"auto"} border="1px" borderColor="gray.700">
            <CardBody>
              <Text fontWeight={"bold"} fontSize={"xl"} mb={4}>Recent Secrets:</Text>
              {!loadingRecentSecret ? (
                <Box>
                  {recentSecret && recentSecret.map((Secret:any, index:number) => {
                    return (
                      <Card key={index} my={4} borderColor="gray.600" borderWidth="1px" borderRadius="md" bg="gray.800" color="white">
                        <CardBody>
                        <Text fontSize={"lg"}>&quot;{Secret[1]}&quot;</Text>
                          <Text mt={1} fontSize={"sm"} color="gray.400">From: {Secret[2]}</Text>
                        </CardBody>
                      </Card>
                    )
                  }).reverse()}
                </Box>
              ) : (
                <Stack>
                  <Skeleton height={"100px"} />
                  <Skeleton height={"100px"} />
                  <Skeleton height={"100px"} />
                </Stack>
              )}
            </CardBody>
          </Card>
        </Box>
      </SimpleGrid>
    </Container>
  );
};

export default Home;
