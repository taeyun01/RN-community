import CustomButton from "@/components/CustomButton";
import DescriptionInput from "@/components/DescriptionInput";
import ImagePreviewList from "@/components/ImagePreviewList";
import PostWriteFooter from "@/components/PostWriteFooter";
import TitleInput from "@/components/TitleInput";
import VoteAttached from "@/components/VoteAttached";
import VoteModal from "@/components/VoteModal";
import useCreatePost from "@/hooks/queries/useCreatePost";
import { ImageUri, VoteOption } from "@/types";
import { useNavigation } from "expo-router";
import { useCallback, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

type FormValues = {
  title: string;
  description: string;
  imageUris: ImageUri[];
  isVoteOpen: boolean; // 투표 생성 여부
  isVoteAttached: boolean; // 투표 첨부 여부
  voteOptions: VoteOption[];
};

export default function PostWriteScreen() {
  const navigation = useNavigation();
  const { mutate: createPost, isPending } = useCreatePost();

  const postForm = useForm<FormValues>({
    defaultValues: {
      title: "",
      description: "",
      imageUris: [],
      isVoteOpen: false,
      isVoteAttached: false,
      voteOptions: [{ displayPriority: 0, content: "" }],
    },
  });

  // postForm의 imageUris배열에 이미지가 담김
  // console.log("imageUris", postForm.watch().imageUris);

  const onSubmit = useCallback(
    (formValues: FormValues) => {
      createPost(formValues);
    },
    [createPost]
  );

  // 컴포넌트나 페이지에서도 헤더를 다룰 수 있음
  useEffect(() => {
    navigation.setOptions({
      // 헤더 오른쪽에 버튼 추가
      headerRight: () => (
        <CustomButton
          label={isPending ? "저장중" : "저장"}
          size="medium"
          variant="standard"
          onPress={postForm.handleSubmit(onSubmit)}
          disabled={isPending}
        />
      ),
    });
  }, [navigation, isPending, postForm, onSubmit]);

  return (
    <FormProvider {...postForm}>
      {/* 키보드가 인풋창을 가리지 않음 */}
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <TitleInput />
        <DescriptionInput />
        <VoteAttached />
        <ImagePreviewList imageUris={postForm.watch().imageUris} />
      </KeyboardAwareScrollView>
      <PostWriteFooter />
      <VoteModal />
    </FormProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
    gap: 16,
  },
});
