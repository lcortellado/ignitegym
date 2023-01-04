import { Center, Heading, Image, Text, VStack } from "native-base";

import BackgroundImg from "@assets/background.png";
import LogoSvg from "@assets/logo.svg";
import { Input } from "@components/Input";

export function SignIn() {
  return (
    <VStack flex={1} bg="gray.700" px={10}>
      <Image
        source={BackgroundImg}
        alt="Personas entrenando"
        resizeMode="contain"
        position="absolute"
      />
      <Center my={24}>
        <LogoSvg />
        <Text color="gray.100" fontSize="sm">
          Entrene su mente y su cuerpo
        </Text>
      </Center>

      <Center>
        <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
          Acceda a su cuenta
        </Heading>
      </Center>

      <Input
        placeholder="E-mail"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Input placeholder="Contraseña" secureTextEntry />
    </VStack>
  );
}
