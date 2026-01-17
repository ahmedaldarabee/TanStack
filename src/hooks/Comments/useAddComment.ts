import { useMutation, useQueryClient, type UseMutationResult } from "@tanstack/react-query";
import axios, {AxiosError} from "axios"
import type { CommentPost, CommentResponse } from "../../types/Comments";


const requestData = async (data: CommentPost): Promise<CommentResponse> => {
    const response = await axios.post<CommentResponse>(`http://localhost:3000/comments`,data);
    return response.data;
}

const useAddComment = (): UseMutationResult<CommentResponse,AxiosError,CommentPost> => {

    // life cycle methods: OnSuccess , onMutate, OnError, etc...
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: requestData,

        // optimistic ui process
        onMutate: (data: CommentPost) => {
            const queryKey = ["comments", { post_id: +data.post_id }];
            const previousComments = queryClient.getQueryData<CommentResponse[]>(queryKey);

            const newComments = {...data, id: -1};
            queryClient.setQueryData(
                ["comments", {post_id: data.post_id}],
                (comments: CommentResponse[]) => {
                    return [newComments,...comments]
                }
            );

            // also here what this section mean?
            return () => {
                queryClient.setQueryData(
                    ["comments", {post_id: data.post_id}],
                    previousComments
                );
            }
        },

        // here the result after we store new comment and show result from server
        onSuccess: (data: CommentResponse) => {
            const queryKey = ["comments", { post_id: +data.post_id }];
            // get current cached data
            const currentComments = queryClient.getQueryData<CommentResponse[]>(queryKey);
            
            //  if there exist an optimistic section [ temp data ] replaced it with main and correct data
            if (currentComments) {
                const updatedComments = currentComments.map(comment =>
                    comment.id === -1 ? data : comment
                );

                // update cache to show up to date data
                queryClient.setQueryData(queryKey, updatedComments);
            }

            console.log("success add a new comment");
        },

        // also here, what meaning of roll back as 
        // 1 - as a concept
        // 2- as a functionality in next section: 
        onError: (_,__,rollBack) => {
            if(rollBack) rollBack();
        }
    })
}

export default useAddComment;