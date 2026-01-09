import React from "react";
import { Table, Form, ButtonGroup, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useGetPosts } from "../../../hooks/Posts/useGetPosts";
import type { PostListProps, IPostDataItem } from "../../../types/Posts";
import useSearch from "../../../hooks/Posts/Search/useSearch";

const PostList = ({ selectedPostStatus,searchQuery }: PostListProps) => {
  const { data, isError, isLoading, error , isStale, refetch} = useGetPosts(selectedPostStatus);
  const searchData = useSearch(searchQuery);

  if (isError) {
    return <p>Sorry there is an error : {error.message}</p>;
  }
  if (searchData.isError) {
    return <p>Sorry there is an error : {searchData.error.message}</p>;
  }

  if (isLoading || searchData.isLoading) {
    return <p>Loading please wait...</p>;
  }

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>, 
    id: number
  ) => {
    // Logic to toggle topRate would go here (requires mutation)
    console.log(`Toggle topRate for post ${id}`);
  };

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
          {searchQuery.length == 0 && data?.map((info: IPostDataItem, idx: number) => {
            return (
              <tr key={idx}>
                <td>{++idx}</td>
                <td>
                  <Link to="/info">{info.title} </Link>
                </td>
                <td>{info.status}</td>
                <td style={{ textAlign: "center" }}>
                  <Form.Check // prettier-ignore
                    type="switch"
                    checked={info.topRate}
                    onChange={(e) => onChangeHandler(e, info.id)}
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
          {searchQuery.length >= 0 && searchData.data?.map((info: IPostDataItem, idx: number) => {
            return (
              <tr key={idx}>
                <td>{++idx}</td>
                <td>
                  <Link to="/info">{info.title} </Link>
                </td>
                <td>{info.status}</td>
                <td style={{ textAlign: "center" }}>
                  <Form.Check // prettier-ignore
                    type="switch"
                    checked={info.topRate}
                    onChange={(e) => onChangeHandler(e, info.id)}
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

    </>
  );
};

export default PostList;
