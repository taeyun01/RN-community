import CustomButton from "@/components/CustomButton";
import { colors } from "@/constants";
import useAuth from "@/hooks/queries/useAuth";
import useCreateVote from "@/hooks/queries/useCreateVote";
import { PostVote } from "@/types";
import { Feather } from "@expo/vector-icons";
import React, { Fragment, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import VoteOption from "./VoteOption";

interface VoteProps {
  postId: number;
  postVotes: PostVote[];
  voteCount: number;
}

function Vote({ postId, postVotes, voteCount }: VoteProps) {
  const { auth } = useAuth();
  const [selectedId, setSelectedId] = useState<number>();
  const createVote = useCreateVote();

  const handleVote = () => {
    createVote.mutate({ postId: postId, voteOptionId: Number(selectedId) });
  };

  return (
    <View style={styles.container}>
      <View style={styles.label}>
        <Text style={styles.labelTitle}>투표</Text>
        <View style={styles.labelCount}>
          <Feather name="user" size={14} color={colors.BLACK} />
          <Text style={styles.labelCountText}>{voteCount}명 참여</Text>
        </View>
      </View>

      {postVotes.map((vote) => {
        const voteUserIds = vote.options.flatMap((option) =>
          option.userVotes.map((userVote) => userVote.userId)
        );
        const isVoted = voteUserIds.includes(Number(auth.id)); // 내가 투표한 경우

        return (
          <Fragment key={vote.id}>
            {vote.options.map((option) => {
              return (
                <VoteOption
                  key={option.id}
                  isVoted={isVoted} // 내가 투표한 경우
                  isSelected={option.id === selectedId} // 옵션의 id와 선택된 id가 같으면 선택된 것으로 표시
                  onSelectOption={() => setSelectedId(Number(option.id))} // 옵션을 선택하면 선택된 id를 설정
                  option={option} // 투표 옵션
                  totalCount={voteCount} // 투표 총 개수
                />
              );
            })}
            {!isVoted && (
              <CustomButton
                label="투표하기"
                disabled={!selectedId}
                onPress={handleVote}
              />
            )}
          </Fragment>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    borderWidth: 1,
    borderColor: colors.GRAY_300,
    borderRadius: 8,
    padding: 16,
    gap: 15,
  },
  label: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  labelTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: colors.ORANGE_600,
  },
  labelCount: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  labelCountText: {
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default Vote;
