export interface IPostDataItem {
    id: number;
    title: string;
    body: string;
    status: "published" | "draft" | "block";
    topRate: boolean;
    userId: number;
}

export type TPostDataStatus = "published" | "draft" | "block" | "all";

export interface IPostFilterProps {
    selectedPostStatus: TPostDataStatus,
    setSelectedPostStatus: (value: TPostDataStatus) => void
}

export interface PostListProps {
    selectedPostStatus: TPostDataStatus,
    searchQuery: string
}
export interface GetPostProps {
    selectedPostStatus: TPostDataStatus,
}