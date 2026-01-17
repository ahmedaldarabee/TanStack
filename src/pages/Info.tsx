import { useSearchParams } from "react-router-dom";
import useGetPostInfo from "../hooks/Info/useGetPostInfo";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useState, type FormEvent } from "react";
import useAddComment from "../hooks/Comments/useAddComment";
import useGetComment from "../hooks/Comments/useGetComment";

const Info = () => {
  const [comment,setComment] = useState("");
  const [searchParams] = useSearchParams();

  const id = searchParams.get("id") as string;
  const paramType = searchParams.get("type") as string;
  const paramKey = searchParams.get("key") as string;

  const addComment = useAddComment();
  const Info = useGetPostInfo(id,paramType,paramKey);

  const getComments = useGetComment(id); 
  
  if (Info.isError) {
    return <p>Sorry there is an error : {Info.error.message}</p>;
  }

  if (Info.isLoading) {
    return <p>Loading please wait...</p>;
  }

  
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addComment.mutate(
      {body: comment,post_id: +id},
      { onSuccess: () => setComment("") }
    );
  }
  
  
  return (
    <Row>
      <Col xs={6}>
        <div>
            <h4>Title:  {Info.data?.title}</h4>
            <p>Status: {Info.data?.status}</p>
            <p>Top Rate: {Info.data?.topRate ? "true":"false"}</p>
            <p>Body: {Info.data?.body}</p>
            <hr />
            <h4 className="mb-2">Comments:</h4>
            
            <Form onSubmit={submitHandler}>
              <Form.Group className="my-3">
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                >

                </Form.Control>
              </Form.Group>

              <Button 
                variant="primary"
                type="submit"
                disabled={addComment.isPending}>Submit</Button>
            </Form>

            {getComments.isLoading ? (
                <div> loading please wait...</div>
              ) : ( getComments?.data?.map((item,idx) => <div key={idx} className="my-2">{item.body}</div>))
            }
        </div>
      </Col>
    </Row>
  );
};

export default Info;
