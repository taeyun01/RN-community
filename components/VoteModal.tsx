import { colors } from "@/constants";
import { VoteOption } from "@/types";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import {
  Alert,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import VoteInput from "./VoteInput";

// 투표 모달
function VoteModal() {
  const { control, setValue } = useFormContext();
  const [voteOptions, isVoteOpen] = useWatch({
    control,
    name: ["voteOptions", "isVoteOpen"],
  });

  // 투표 항목 배열 관리 (useFieldArray로 Input 배열 관리하기)
  const { fields, append, remove } = useFieldArray({
    control,
    name: "voteOptions",
  });

  // 투표 항목 추가
  const handleAppendVote = () => {
    const priorities = voteOptions.map(
      (vote: VoteOption) => vote.displayPriority
    ); // 투표 항목의 우선순위를 배열로 받아옴
    const nextPriority = Math.max(...priorities) + 1; // 우선순위 중 가장 큰 값 + 1
    append({ displayPriority: nextPriority, content: "" }); // 투표 항목 추가 (항목 삭제 후 추가해도 순위는 바뀌지 않음) 예를 들어 [1,2,3,4] 중 2를 삭제하고 추가하면 1,3,4,5가 아닌 1,2,3,4가 됨
  };

  // 투표 항목 제출(첨부)
  const handleSubmitVote = () => {
    if (voteOptions.length < 2) {
      Alert.alert("투표 항목을 2개이상 추가해주세요.", "");
      return;
    }

    setValue("isVoteAttached", true);
    setValue("isVoteOpen", false);
  };

  return (
    <Modal visible={isVoteOpen} animationType="slide">
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Pressable
            onPress={() => setValue("isVoteOpen", false)}
            style={styles.headerLeft}
          >
            <Feather name="arrow-left" size={28} color={colors.BLACK} />
          </Pressable>
          <Text style={styles.headerTitle}>투표</Text>
          <Text style={styles.headerRight} onPress={handleSubmitVote}>
            첨부
          </Text>
        </View>
        <KeyboardAwareScrollView
          contentContainerStyle={{ gap: 12, padding: 16 }}
        >
          {/* 투표 항목 입력 컴포넌트 */}
          {fields.map((field, index) => {
            return (
              <VoteInput
                key={field.id}
                index={index}
                onRemove={() => remove(index)}
              />
            );
          })}
          <Pressable onPress={handleAppendVote}>
            <Text style={styles.addVoteText}>+ 항목 추가</Text>
          </Pressable>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLeft: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.BLACK,
  },
  headerRight: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.ORANGE_600,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  addVoteText: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.GRAY_500,
    textAlign: "center",
  },
});

export default VoteModal;
