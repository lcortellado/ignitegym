import {
  Center,
  ScrollView,
  VStack,
  Skeleton,
  Text,
  Heading,
} from "native-base";
import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

const PHOTO_SIZE = 33;

export function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false);
  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />

      <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
        <Center mt={6} px={10}>
          {photoIsLoading ? (
            <Skeleton
              w={PHOTO_SIZE}
              h={PHOTO_SIZE}
              rounded="full"
              startColor="gray.500"
              endColor="gray.400"
            />
          ) : (
            <UserPhoto
              source={{ uri: "https:github.com/lcortellado.png" }}
              alt="Foto de usuario"
              size={PHOTO_SIZE}
            />
          )}
          <TouchableOpacity>
            <Text
              color="green.500"
              fontWeight="bold"
              fontSize="md"
              mt={2}
              mb={8}
            >
              Alterar foto
            </Text>
          </TouchableOpacity>

          <Input bg="gray.600" placeholder="Nombre" />
          <Input bg="gray.600" placeholder="E-mail" isDisabled />
        </Center>

        <Center px={10} mt={12} mb={9}>
          <Heading
            color="gray.200"
            fontSize="md"
            mb={2}
            alignSelf="flex-start"
            mt={12}
          >
            Cambiar contraseña
          </Heading>

          <Input
            bg="gray.600"
            placeholder="Contraseña actual"
            secureTextEntry
          />

          <Input bg="gray.600" placeholder="Nueva contraseña" secureTextEntry />

          <Input
            bg="gray.600"
            placeholder="Confirme nueva contraseña"
            secureTextEntry
          />

          <Button title="Actualizar" />
        </Center>
      </ScrollView>
    </VStack>
  );
}
