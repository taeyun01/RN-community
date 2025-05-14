import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false, // 요청 실패시 재시도 하지 않음
      staleTime: 20 * 1000, // 20초 동안 캐시 (똑같은 요청을 20초내에는 다시 요청하지 않음)
    },
    mutations: {
      retry: false,
    },
  },
});

export default queryClient;
