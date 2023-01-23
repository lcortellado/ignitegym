import { Center, Heading, Image, ScrollView, Text, VStack } from "native-base";

import BackgroundImg from "@assets/background.png";
import LogoSvg from "@assets/logo.svg";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

export function SignIn() {
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} bg="gray.700" px={10} pb={16}>
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

        <Center>
          <Input
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Input placeholder="Contraseña" secureTextEntry />

          <Button title="Accesar" />
        </Center>
        <Center>
          <Text color="gray.100" fontFamily="body" fontSize="sm" mb={3}>
            Ańada su tiempo de acceso
          </Text>
        </Center>
        <Button title="Crear cuenta" variant="outline" />
      </VStack>
    </ScrollView>
  );
}
