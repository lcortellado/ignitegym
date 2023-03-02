import { TouchableOpacity } from "react-native";
import {
  Center,
  ScrollView,
  VStack,
  Skeleton,
  Text,
  Heading,
  useToast,
} from "native-base";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";
import { useState } from "react";

import { Input } from "@components/Input";
import { Button } from "@components/Button";

const PHOTO_SIZE = 33;

export function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false);
  const [userPhoto, setUserPhoto] = useState(
    "https:github.com/lcortellado.png"
  );

  const toast = useToast();

  async function handleUserPhotoSelect() {
    setPhotoIsLoading(true);

    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      });

      if (photoSelected.canceled) {
        return;
      }

      console.log(photoSelected.assets[0].uri, "urifoto");
      if (photoSelected.assets[0].uri) {
        const photo = await FileSystem.getInfoAsync(
          photoSelected.assets[0].uri
        );

        /* It's converting the size of the photo from bytes to
        megabytes. 
        photo.size / 1024 / 1024
        */
        if (photo.size && photo.size / 1024 / 1024 > 5) {
          return toast.show({
            title:
              "Esta imagen es demasiado grande. Escoja otro hasta un maximo de 5mb",
            placement: "top",
            bgColor: "red.500",
          });
        }

        setUserPhoto(photoSelected.assets[0].uri);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setPhotoIsLoading(false);
    }
  }

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
              source={{ uri: userPhoto }}
              alt="Foto de usuario"
              size={PHOTO_SIZE}
            />
          )}
          <TouchableOpacity onPress={handleUserPhotoSelect}>
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
