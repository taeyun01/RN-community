import { colors } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Pressable } from "react-native";
import InputField from "./InputField";

interface VoteInputProps {
  index: number;
  onRemove: () => void;
}

// 투표 항목 입력 컴포넌트
function VoteInput({ index, onRemove }: VoteInputProps) {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={`voteOptions.${index}.content`}
      rules={{
        validate: (data: string) => {
          if (data.length === 0) {
            return "내용을 입력해주세요.";
          }
        },
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <InputField
          variant="standard"
          value={value}
          onChangeText={onChange}
          error={error?.message}
          rightChild={
            <Pressable onPress={onRemove}>
              <Ionicons name="close" size={20} color={colors.BLACK} />
            </Pressable>
          }
        />
      )}
    />
  );
}

export default VoteInput;
