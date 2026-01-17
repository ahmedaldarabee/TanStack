import axios from "axios";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import type { IPostDataItem, TPostDataStatus } from "../../types/Posts";

//Promise here to enable define data type [ PostDataItem ] after data async operations are completed!
export const fetchPosts = async (
    selectedPostStatus: TPostDataStatus,
    paginate: number

): Promise<IPostDataItem[]> => {

    if (selectedPostStatus === "all") {
        // _page: that define number of page that we looking for it! and
        //  [ _per_page=5 ] maximum number of records that we want is 5
        const response = await axios.get<{ data: IPostDataItem[] }>(`http://localhost:3000/posts?_page=${paginate}&_per_page=5`);
        return response.data.data;
    } else {
        const response = await axios.get<IPostDataItem[]>(`http://localhost:3000/posts?status=${selectedPostStatus}`);
        return response.data;
    }
}

export const useGetPosts = (
    selectedPostStatus: TPostDataStatus,
    paginate: number
): UseQueryResult<IPostDataItem[]> => {
    return useQuery({
        //key here must be unique for each query to avoid problems with cache
        queryKey: ['posts', { selectedPostStatus, paginate }],
        queryFn: () => fetchPosts(selectedPostStatus, paginate),
        staleTime: 1000 * 60 * 1,
        refetchInterval: 1000 * 60 * 2// as a refresh interval about data caching to provide up to dates information's
    })
}