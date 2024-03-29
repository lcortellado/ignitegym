import {
  Center,
  Heading,
  Image,
  ScrollView,
  Text,
  VStack,
  useToast,
} from "native-base";

import BackgroundImg from "@assets/background.png";
import LogoSvg from "@assets/logo.svg";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import { Controller, useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";
import { AppError } from "@utils/AppError";
import { useState } from "react";

type formDataProps = {
  email: string;
  password: string;
};

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation<AuthNavigatorRoutesProps>();
  const toast = useToast();

  const { signIn } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<formDataProps>();

  async function handleSignIn({ email, password }: formDataProps) {
    try {
      setIsLoading(true);
      await signIn(email, password);
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError
        ? error.message
        : "No fue posible ingresar. Intente otra vez mas tarde";

      setIsLoading(false);

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    }
  }

  function handleNewAccount() {
    navigation.navigate("signUp");
  }
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} px={10} pb={16}>
        <Image
          source={BackgroundImg}
          defaultSource={BackgroundImg}
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

          <Controller
            control={control}
            name="email"
            rules={{ required: "Informe su e-mail" }}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.email?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            rules={{ required: "Informe su contraseña" }}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Contraseña"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Button
            title="Accesar"
            onPress={handleSubmit(handleSignIn)}
            isLoading={isLoading}
          />
        </Center>
        <Center mt={24}>
          <Text color="gray.100" fontFamily="body" fontSize="sm" mb={3}>
            Ańada su tiempo de acceso
          </Text>
        </Center>
        <Button
          title="Crear cuenta"
          variant="outline"
          onPress={handleNewAccount}
        />
      </VStack>
    </ScrollView>
  );
}
