import React from 'react'
import axios from 'axios';
import type { IPostDataItem } from '../../types/Posts';
import { useQuery, useQueryClient, type UseQueryResult } from '@tanstack/react-query';


const fetchData = async (id: string): Promise<IPostDataItem> => {
    const response = await axios.get<IPostDataItem>(`http://localhost:3000/posts/${id}`);
    return response.data;
}

const useGetPostInfo = (id: string, paramType: string, paramKey: string): UseQueryResult<IPostDataItem> => {

    // useQueryClient: this method that responding about access cached data
    const queryClient = useQueryClient();

    let getCachedData: IPostDataItem[] | undefined;

    if (paramType === "paginate") {
        // read cached data by getQueryData and queryKey of needed data
        getCachedData = queryClient.getQueryData([
            "posts", { paginate: +paramKey, selectedPostStatus: "all" }
        ]);
    } else {
        getCachedData = queryClient.getQueryData([
            "posts",
            "search",
            { query: paramKey }
        ]);
    }

    // this section that response about get data from server
    return useQuery({
        queryKey: ["post", { id: +id }],
        queryFn: () => fetchData(id),
        // initialData: that enable us to access needed cached data after we search on it then data it will be ready to show it!
        initialData: () => {
            if (getCachedData === undefined) return undefined;
            else {
                return getCachedData.find((element) => element.id == +id);
            }
        }
    });
}

export default useGetPostInfo