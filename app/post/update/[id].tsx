import CustomButton from "@/components/CustomButton";
import DescriptionInput from "@/components/DescriptionInput";
import TitleInput from "@/components/TitleInput";
import useGetPost from "@/hooks/queries/useGetPost";
import useUpdatePost from "@/hooks/queries/useUpdatePost";
import { ImageUri } from "@/types";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { useCallback, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

type FormValues = {
  title: string;
  description: string;
  imageUris: ImageUri[];
};

// post/update/[id] 페이지
export default function PostUpdateScreen() {
  const { id } = useLocalSearchParams(); // 게시글을 조회 하기 위해 [id]를 가져옴
  const { data: post } = useGetPost(Number(id));
  const navigation = useNavigation();
  const { mutate: updatePost, isPending } = useUpdatePost();

  const postForm = useForm<FormValues>({
    defaultValues: {
      title: post?.title,
      description: post?.description,
      imageUris: post?.imageUris,
    },
  });

  // console.log("post: ", post);

  const onSubmit = useCallback(
    (formValues: FormValues) => {
      updatePost(
        {
          id: Number(id),
          body: formValues,
        },
        {
          onSuccess: () => router.back(),
        }
      );
    },
    [id, updatePost]
  );

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <CustomButton
          label={"수정"}
          size="medium"
          variant="standard"
          onPress={postForm.handleSubmit(onSubmit)}
          disabled={isPending}
        />
      ),
    });
  }, [navigation, postForm, onSubmit, isPending]);

  // 게시글 데이터가 있으면 폼에 데이터 초기화 (위에 설정했지만 반영이 안되는 경우가 간헐적으로 있어 한번 더 체크)
  useEffect(() => {
    if (post) {
      postForm.reset({
        title: post.title,
        description: post.description,
        imageUris: post.imageUris,
      });
    }
  }, [post, postForm]);

  return (
    <FormProvider {...postForm}>
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <TitleInput />
        <DescriptionInput />
      </KeyboardAwareScrollView>
    </FormProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
    gap: 16,
  },
});
