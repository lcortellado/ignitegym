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

import { useNavigation } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { api } from "@services/api";
import axios from "axios";
import { AppError } from "../utils/AppError";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

type formDataProps = {
  name: string;
  email: string;
  password: string;
  password_confirm: string;
};

const signUpSchema = yup.object({
  name: yup.string().required("Digite el nombre. "),
  email: yup.string().required("Digite su correo. ").email("Correo inválido. "),
  password: yup
    .string()
    .required("Digite su contraseña. ")
    .min(6, "La contraseña debe tener un mínimo de 6 caracteres. "),
  password_confirm: yup
    .string()
    .required("Confirme su contraseña")
    .oneOf([yup.ref("password"), null], "Las contraseñas no coinciden"),
});

export function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const { signIn } = useAuth();

  const toast = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<formDataProps>({
    resolver: yupResolver(signUpSchema),
  });

  function handleGoBack() {
    navigation.goBack();
  }

  async function handleSignUp({ name, email, password }: formDataProps) {
    try {
      setIsLoading(true);

      await api.post("/users", { name, email, password });
      await signIn(email, password);
    } catch (error) {
      setIsLoading(false);
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "No fue posible crear la cuenta, intentelo de nuevo.";

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    }

    // const response = await fetch("http://192.168.1.212:3333/users", {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ name, email, password }),
    // });

    // const data = await response.json();
    // console.log(data);
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
            Cree su cuenta
          </Heading>

          <Controller
            control={control}
            name="name"
            // rules={{
            //   required: "Digite el nombre",
            // }}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Nombre"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            // rules={{
            //   required: "Digite el e-mail",
            //   pattern: {
            //     value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            //     message: "E-mail inválido",
            //   },
            // }}
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

          <Controller
            control={control}
            name="password_confirm"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Confirme su contraseña"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                errorMessage={errors.password_confirm?.message}
                onSubmitEditing={handleSubmit(handleSignUp)}
                returnKeyType="send"
              />
            )}
          />

          <Button
            title="Crear y Accesar"
            onPress={handleSubmit(handleSignUp)}
            isLoading={isLoading}
          />
        </Center>

        <Button
          title="Volver al login"
          variant="outline"
          mt={24}
          onPress={handleGoBack}
        />
      </VStack>
    </ScrollView>
  );
}
