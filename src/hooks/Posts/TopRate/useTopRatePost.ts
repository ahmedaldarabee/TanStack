import axios, { AxiosError } from "axios";
import {useMutation,useQueryClient, type UseMutationResult,} from "@tanstack/react-query";
import type { TopRatePost } from "../../../types/TopRate";
import type { IPostDataItem } from "../../../types/Posts";

const updateRate = async (rate: TopRatePost): Promise<IPostDataItem> => {
  const result = await axios.patch<IPostDataItem>(
    `http://localhost:3000/posts/${rate.postId}`,
    { topRate: rate.rateValue }
  );
  return result.data;
};

const useUpdateRate = (): UseMutationResult<
  IPostDataItem,
  AxiosError,
  TopRatePost
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateRate,

    onMutate: (values) => {
      const oldData = queryClient.getQueryData([
        "posts",
        { paginate: values.pageNumber, selectedPostStatus: "all" },
      ]);

      queryClient.setQueryData(
        ["posts", { paginate: values.pageNumber, selectedPostStatus: "all" }],
        (prevState: IPostDataItem[]) =>
          prevState.map((el) => {
            if (el.id === values.postId) {
              return { ...el, topRate: values.rateValue };
            } else {
              return el;
            }
          })
      );

      return () => {
        queryClient.setQueryData(
          ["posts", { paginate: values.pageNumber, selectedPostStatus: "all" }],
          oldData
        );
      };
    },
    
    onError: (_, __, rollBack) => {
      if (rollBack) {
        rollBack();
      }
    },
  });
};

export default useUpdateRate;