import { colors } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { Pressable } from "react-native";
import InputField from "./InputField";

// 투표 첨부 여부 표시
function VoteAttached() {
  const { control, setValue, resetField } = useFormContext();
  const [isVoteAttached] = useWatch({ control, name: ["isVoteAttached"] });

  // console.log("isVoteAttached: ", isVoteAttached); // true면 표시

  return (
    <>
      {isVoteAttached && (
        <InputField
          variant="outlined"
          editable={false}
          value="투표가 첨부되었습니다."
          rightChild={
            <Pressable
              onPress={() => {
                setValue("isVoteAttached", false);
                resetField("voteOptions");
              }}
            >
              <Ionicons name="close" size={20} color={colors.BLACK} />
            </Pressable>
          }
        />
      )}
    </>
  );
}

export default VoteAttached;
