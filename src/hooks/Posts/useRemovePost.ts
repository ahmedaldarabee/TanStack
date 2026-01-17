
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const deletePost = async (id: number) => {
  const deleteRequest = await axios.delete(`http://localhost:3000/posts/${id}`);
  return deleteRequest.data;
};
const useRemovePost = () => {
  const queryClint = useQueryClient();
  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClint.invalidateQueries({
        queryKey: ["posts"],
        exact: false,
      });
    },
  });
};

export default useRemovePost;
