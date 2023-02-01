import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { VStack, HStack, FlatList } from "native-base";
import { useState } from "react";

export function Home() {
  const [groups, setGroups] = useState(["Costas", "Bicep", "Triceps", "ombro"]);
  const [groupSelected, setGroupSelected] = useState("costa");

  return (
    <VStack flex={1}>
      <HomeHeader />
      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Group
            onPress={() => setGroupSelected(item)}
            name={item}
            isActive={groupSelected === item}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        _contentContainerStyle={{ px: 8 }}
        my={10}
        maxH={10}
      />
    </VStack>
  );
}
