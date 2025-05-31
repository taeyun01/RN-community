import AvatarItem from "@/components/AvatarItem";
import FixedBottomCTA from "@/components/FixedBottomCTA";
import Tab from "@/components/Tab";
import { colors } from "@/constants";
import useAuth from "@/hooks/queries/useAuth";
import useGetAvatarItems from "@/hooks/queries/useGetAvatarItems";
import React, { useRef, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import PagerView from "react-native-pager-view";
import SvgUri from "react-native-svg";

const avatarTabs = ["모자", "얼굴", "상의", "하의", "손", "피부"] as const;

export default function AvatarScreen() {
  const pagerRef = useRef<PagerView | null>(null);
  const [currentTab, setCurrentTab] = useState(0);
  const { hats, faces, tops, bottoms, hands, skins } = useGetAvatarItems();
  const avatarItems = [hats, faces, tops, bottoms, hands, skins];
  const { auth } = useAuth();
  const [avatarItem, setAvatarItem] = useState({
    hatId: auth?.hatId ?? "",
    faceId: auth?.faceId ?? "",
    topId: auth?.topId ?? "",
    bottomId: auth?.bottomId ?? "",
    handId: auth?.handId ?? "",
    skinId: auth?.skinId ?? "",
  });
  // console.log("avatarItems: ", avatarItems);

  const handlePressItem = (name: string, item: string) => {
    setAvatarItem((prev) => ({ ...prev, [name]: getImageId(item) }));
  };

  const handlePressTab = (index: number) => {
    pagerRef.current?.setPage(index);
    // hats/01.png
    setCurrentTab(index);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.avatarContainer}>
            {/* 아이템 카테고리와 그 카테고리의 해당하는 id를 넣으면 서버에서 아바타 이미지를 반환하는 함수 */}
            <SvgUri
              uri={getAvatarItemUri("hats", avatarItem.hatId)}
              style={[styles.avatar, { zIndex: 70 }]}
            />
            <SvgUri
              uri={getAvatarItemUri("faces", avatarItem.faceId)}
              style={[styles.avatar, { zIndex: 60 }]}
            />
            <SvgUri
              uri={getAvatarItemUri("tops", avatarItem.topId)}
              style={[styles.avatar, { zIndex: 50 }]}
            />
            <SvgUri
              uri={getAvatarItemUri("bottoms", avatarItem.bottomId)}
              style={[styles.avatar, { zIndex: 40 }]}
            />
            <SvgUri
              uri={getAvatarItemUri("default")}
              style={[styles.avatar, { zIndex: 30 }]}
            />
            <SvgUri
              uri={getAvatarItemUri("skins", avatarItem.skinId)}
              style={[styles.avatar, { zIndex: 20 }]}
            />
            <SvgUri
              uri={getAvatarItemUri("hands", avatarItem.handId)}
              style={[styles.avatar, { zIndex: 10 }]}
            />
          </View>
        </View>
        <View style={styles.tabContainer}>
          {avatarTabs.map((tab, index) => (
            <Tab
              key={index}
              isActive={currentTab === index}
              onPress={() => handlePressTab(index)}
            >
              {tab}
            </Tab>
          ))}
        </View>
        <PagerView
          ref={pagerRef}
          style={styles.pagerView}
          initialPage={0}
          onPageSelected={(e) => setCurrentTab(e.nativeEvent.position)}
        >
          {avatarItems.map((items, index) => {
            return (
              <FlatList
                key={index}
                data={items}
                keyExtractor={(item, index) => String(index)}
                numColumns={3}
                contentContainerStyle={styles.listContainer}
                renderItem={({ item }) => (
                  <AvatarItem
                    uri={item}
                    isSelected={false}
                    onPress={() => handlePressItem(avatarTabs[index], item)}
                  />
                )}
              />
            );
          })}
          {/* <FlatList
            data={hats}
            keyExtractor={(item, index) => String(index)}
            numColumns={3}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item }) => (
              <AvatarItem uri={item} isSelected={false} />
            )}
          />
          <FlatList
            data={faces}
            keyExtractor={(item, index) => String(index)}
            numColumns={3}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item }) => (
              <AvatarItem uri={item} isSelected={false} />
            )}
          />
          <FlatList
            data={tops}
            keyExtractor={(item, index) => String(index)}
            numColumns={3}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item }) => (
              <AvatarItem uri={item} isSelected={false} />
            )}
          />
          <FlatList
            data={bottoms}
            keyExtractor={(item, index) => String(index)}
            numColumns={3}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item }) => (
              <AvatarItem uri={item} isSelected={false} />
            )}
          />
          <FlatList
            data={hands}
            keyExtractor={(item, index) => String(index)}
            numColumns={3}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item }) => (
              <AvatarItem uri={item} isSelected={false} />
            )}
          />
          <FlatList
            data={skins}
            keyExtractor={(item, index) => String(index)}
            numColumns={3}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item }) => (
              <AvatarItem uri={item} isSelected={false} />
            )}
          /> */}
        </PagerView>
      </View>

      <FixedBottomCTA label="저장" onPress={() => {}} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    alignItems: "center",
    position: "relative",
    backgroundColor: colors.ORANGE_200,
    width: "100%",
    height: 115,
    marginBottom: 115,
  },
  avatarContainer: {
    width: 229, // 서버에서도 아바타 크기가 229로 옴
    height: 229,
    borderRadius: 229,
    borderWidth: 1,
    overflow: "hidden",
    borderColor: colors.GRAY_200,
    backgroundColor: colors.WHITE,
  },
  avatar: {
    width: 229,
    height: 229,
    position: "absolute",
  },
  listContainer: {
    paddingBottom: 120,
    marginTop: 10,
    alignItems: "center",
  },
  tabContainer: {
    flexDirection: "row",
  },
  pagerView: {
    flex: 1,
  },
});
