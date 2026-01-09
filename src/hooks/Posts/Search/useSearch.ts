import React from 'react'
import type { IPostDataItem } from '../../../types/Posts'
import axios from 'axios'
import { useQuery, type UseQueryResult } from '@tanstack/react-query';

// Fetch Data Side

const fetchData = async (query: string): Promise<IPostDataItem[]> =>{
    const response = await axios.get<IPostDataItem[]>(`http://localhost:3000/posts?title=${query}`);
    return response.data;
}

// Data Fetching Hook Side - Data Handling Side

// UseQueryResult: it will describe returned data type from useQuery
// that content data type about return data,error,status,...

const useSearch = (query: string): UseQueryResult<IPostDataItem[]> => {
    // also i want from you to describe the next part:
    return useQuery({
        // query key: that provide for each request a unique key
        //  to provide a cache for it!
        queryKey: ["posts", "search", {query}],
        queryFn: () => fetchData(query),
        staleTime: 1000 * 60 * 50, // 5 minutes as a duration between caching process to data
        enabled: query.length > 0 // That mean, once search that have a data so it will worked!
    });
}

export default useSearch