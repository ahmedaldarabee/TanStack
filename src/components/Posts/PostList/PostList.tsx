import React, { useEffect, useState } from "react";
import { Table, Form, ButtonGroup, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { fetchPosts, useGetPosts } from "../../../hooks/Posts/useGetPosts";
import type { PostListProps, IPostDataItem } from "../../../types/Posts";
import useSearch from "../../../hooks/Posts/Search/useSearch";
import { useIsFetching, useQueryClient } from "@tanstack/react-query";
import useUpdateRate from "../../../hooks/Posts/TopRate/useTopRatePost";
import useRemovePost from "../../../hooks/Posts/useRemovePost";

const PostList = ({ selectedPostStatus, searchQuery }: PostListProps) => {
  const [paginate, setPaginate] = useState(1);
  const { data, isError, isLoading, error, isStale, refetch } = useGetPosts(
    selectedPostStatus,
    paginate
  );
  const searchData = useSearch(searchQuery);
  const queryClient = useQueryClient();

  const updateRate = useUpdateRate();
  const deletePost = useRemovePost();
  const globalLoading = useIsFetching();


  useEffect(() => {
    const nextPage = paginate + 1;

    if (nextPage > 3) return;

    queryClient.prefetchQuery({
      queryKey: ['posts', { paginate: nextPage, selectedPostStatus: "all" }],
      queryFn: () => fetchPosts("all", nextPage)
    });

  }, [paginate, queryClient]);


  if (isError) {
    return <p>Sorry there is an error : {error.message}</p>;
  }
  if (searchData.isError) {
    return <p>Sorry there is an error : {searchData.error.message}</p>;
  }

  if (globalLoading) {
    return <p>Loading please wait...</p>;
  }

  return (
    <>
      {/* { Manual Data Updating
        isStale && searchQuery.length === 0 && 
        <Button onClick={() => refetch()} className="mb-3"> Up to date data</Button>
      } */}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Status</th>
            <th style={{ width: "10%" }}>Top Rate</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>

          {searchQuery.length === 0 &&
            data?.map((info: IPostDataItem, idx: number) => {
              return (
                <tr key={info.id}>
                  <td>{idx + 1}</td>
                  <td>
                    <Link to={`/info?id=${info.id}&type=paginate&key=${paginate}`}>{info.title} </Link>
                  </td>
                  <td>{info.status}</td>
                  <td style={{ textAlign: "center" }}>
                    <Form.Check // prettier-ignore
                      type="switch"
                      checked={info.topRate}
                      onChange={(e) => updateRate.mutate({
                        postId: info.id,
                        pageNumber: paginate,
                        rateValue: e.target.checked
                      })}
                      disabled={selectedPostStatus !== "all"}
                    />
                  </td>
                  <td>
                    <ButtonGroup aria-label="Basic example">
                      <Button 
                        onClick={() => deletePost.mutate(info.id)}
                        variant="danger">Delete</Button>
                    </ButtonGroup>
                  </td>
                </tr>
              );
            })}
          {searchQuery.length > 0 &&
            searchData.data?.map((info: IPostDataItem, idx: number) => {
              return (
                <tr key={info.id}>
                  <td>{idx + 1}</td>
                  <td>
                    <Link to={`/info?id=${info.id}&type=search&key=${searchQuery}`}>{info.title} </Link>
                  </td>
                  <td>{info.status}</td>
                  <td style={{ textAlign: "center" }}>
                    <Form.Check // prettier-ignore
                      type="switch"
                      checked={info.topRate}
                      onChange={(e) => updateRate.mutate({
                        postId: info.id,
                        pageNumber: paginate,
                        rateValue: e.target.checked
                      })}
                      disabled={searchQuery.length > 0}
                    />
                  </td>
                  <td>
                    <ButtonGroup aria-label="Basic example">
                      <Button variant="danger">Delete</Button>
                    </ButtonGroup>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>

      {searchQuery.length === 0 && selectedPostStatus === "all" && (
        <ButtonGroup aria-label="Basic example">
          <Button variant="light" onClick={() => setPaginate(1)}>
            1
          </Button>
          <Button variant="light" onClick={() => setPaginate(2)}>
            2
          </Button>
          <Button variant="light" onClick={() => setPaginate(3)}>
            3
          </Button>
        </ButtonGroup>
      )}
    </>
  );
};

export default PostList;
