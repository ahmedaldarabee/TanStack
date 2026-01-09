import axios from "axios";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import type { IPostDataItem, TPostDataStatus } from "../../types/Posts";

//Promise here to enable define data type [ PostDataItem ] after data async operations are completed!
const fetchPosts = async (selectedPostStatus: TPostDataStatus): Promise<IPostDataItem[]> => {
    if (selectedPostStatus === "all") {
        const response = await axios.get<IPostDataItem[]>(`http://localhost:3000/posts`);
        return response.data;
    } else {
        const response = await axios.get<IPostDataItem[]>(`http://localhost:3000/posts?status=${selectedPostStatus}`);
        return response.data;
    }
}

export const useGetPosts = (selectedPostStatus: TPostDataStatus): UseQueryResult<IPostDataItem[]> => {
    return useQuery({
        //key here must be unique for each query to avoid problems with cache
        queryKey: ['posts',{selectedPostStatus}],
        queryFn: () => fetchPosts(selectedPostStatus),
        staleTime: 1000 * 10,
        refetchInterval: 1000 * 15 // as a refresh interval about data caching to provide up to dates information's
    })
}