import { useQuery } from '@tanstack/react-query';
import type { CommentResponse } from '../../types/Comments';
import axios from 'axios';

const fetchData = async (post_id: string, signal: AbortSignal): Promise<CommentResponse[]> => {
    const result = await axios.get<CommentResponse[]>(
        `http://localhost:3000/comments?post_id=${post_id}&_sort=id&_order=desc`,
        {signal}
    );
    return result.data;
}

const useGetComment = (post_id: string) => {
  return useQuery({
        queryKey: ["comments", {post_id: +post_id}],
        queryFn: ({signal}) => fetchData(post_id,signal)
  });
}

export default useGetComment