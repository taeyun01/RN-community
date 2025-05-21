import { colors } from "@/constants";
import { PostVoteOption } from "@/types";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface VoteOptionProps {
  option: PostVoteOption; // 투표 옵션
  totalCount: number; // 투표 총 개수
  isVoted: boolean; // 투표 여부
  isSelected: boolean; // 선택 여부
  onSelectOption: () => void; // 투표 옵션 선택 핸들러
}

function VoteOption({
  option,
  totalCount,
  isSelected,
  isVoted,
  onSelectOption,
}: VoteOptionProps) {
  // 투표 옵션 퍼센트 계산
  const percent = option.userVotes.length
    ? Math.floor((option.userVotes.length / totalCount) * 100)
    : 0;

  return (
    <>
      {isVoted ? (
        <View style={styles.votedContainer}>
          <View style={[styles.percent, { width: `${percent}%` }]} />
          <Text style={styles.content}>{option.content}</Text>
          <Text style={styles.percentText}>
            {percent}% ({option.userVotes.length})
          </Text>
        </View>
      ) : (
        <Pressable
          onPress={onSelectOption}
          style={isSelected ? styles.selectedContainer : styles.container}
        >
          <Text style={styles.content}>{option.content}</Text>
        </Pressable>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 44,
    borderRadius: 8,
    backgroundColor: colors.WHITE,
    borderWidth: 1,
    borderColor: colors.GRAY_300,
    flexDirection: "row",
    justifyContent: "space-between",
    overflow: "hidden",
    alignItems: "center",
  },
  selectedContainer: {
    height: 44,
    borderRadius: 8,
    backgroundColor: colors.WHITE,
    borderWidth: 1,
    borderColor: colors.ORANGE_600,
    flexDirection: "row",
    justifyContent: "space-between",
    overflow: "hidden",
    alignItems: "center",
  },
  content: {
    marginLeft: 10,
  },
  votedContainer: {
    height: 44,
    borderRadius: 8,
    backgroundColor: colors.ORANGE_200,
    flexDirection: "row",
    justifyContent: "space-between",
    overflow: "hidden",
    alignItems: "center",
  },
  percent: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 44,
    backgroundColor: colors.ORANGE_300,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  percentText: {
    marginRight: 10,
    fontWeight: "500",
  },
});

export default VoteOption;
