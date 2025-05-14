import React from "react";
import { FlatList } from "react-native";
import FeedItem from "./FeedItem";

const dummyData = [
  {
    id: 1,
    userId: 1,
    title: "더미 제목입니다.",
    description:
      "더미 내용입니다. 더미 내용입니다. 더미 내용입니다. 더미 내용입니다. 더미 내용입니다. 더미 내용입니다. 더미 내용입니다.  더미 내용입니다.더미 내용입니다.  더미 내용입니다. 더미 내용입니다.",
    createdAt: "2025-05-13",
    author: {
      id: 1,
      nickname: "닉네임",
      imageUri: "",
    },
    imageUris: [],
    likes: [],
    hasVote: false,
    voteCount: 1,
    commentCount: 1,
    viewCount: 1,
  },
  {
    id: 2,
    userId: 1,
    title: "더미 제목입니다.",
    description:
      "더미 내용입니다. 더미 내용입니다. 더미 내용입니다. 더미 내용입니다. 더미 내용입니다. 더미 내용입니다. 더미 내용입니다.  더미 내용입니다.더미 내용입니다.  더미 내용입니다. 더미 내용입니다.",
    createdAt: "2025-05-12",
    author: {
      id: 1,
      nickname: "닉네임",
      imageUri: "",
    },
    imageUris: [],
    likes: [],
    hasVote: false,
    voteCount: 1,
    commentCount: 1,
    viewCount: 1,
  },
  {
    id: 3,
    userId: 1,
    title: "더미 제목입니다.",
    description:
      "더미 내용입니다. 더미 내용입니다. 더미 내용입니다. 더미 내용입니다. 더미 내용입니다. 더미 내용입니다. 더미 내용입니다.  더미 내용입니다.더미 내용입니다.  더미 내용입니다. 더미 내용입니다.",
    createdAt: "2025-05-10",
    author: {
      id: 1,
      nickname: "닉네임",
      imageUri: "",
    },
    imageUris: [],
    likes: [],
    hasVote: false,
    voteCount: 1,
    commentCount: 1,
    viewCount: 1,
  },
  {
    id: 4,
    userId: 1,
    title: "더미 제목입니다.",
    description:
      "더미 내용입니다. 더미 내용입니다. 더미 내용입니다. 더미 내용입니다. 더미 내용입니다. 더미 내용입니다. 더미 내용입니다.  더미 내용입니다.더미 내용입니다.  더미 내용입니다. 더미 내용입니다.",
    createdAt: "2025-05-01",
    author: {
      id: 1,
      nickname: "닉네임",
      imageUri: "",
    },
    imageUris: [],
    likes: [],
    hasVote: false,
    voteCount: 1,
    commentCount: 1,
    viewCount: 1,
  },
];

function FeedList() {
  const lastPost = dummyData[dummyData.length - 1];

  // ScrollView대신 FlatList를 사용하는 이유는 화면에 보이는 부분만 렌더링 되서 최적화가 됨
  return (
    <FlatList
      data={dummyData}
      renderItem={({ item }) => <FeedItem post={item} lastPost={lastPost} />}
      keyExtractor={(item) => String(item.id)} // 고유 키 값 (리액트 map으로 컴포넌트 렌더링할 때 키 값 지정하는거라고 보면됨)
    />
  );
}

export default FeedList;
