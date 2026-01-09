import { Row, Col, Form } from "react-bootstrap";
import PostList from "../components/Posts/PostList/PostList";
import PostFilter from "../components/Posts/PostFilter/PostFilter";
import { useState } from "react";
import type { TPostDataStatus } from "../types/Posts";
import SearchQuery from "../components/Searching/SearchQuery";

const Home = () => {
  const [selectedPostStatus, setSelectedPostStatus] = useState<TPostDataStatus>("all");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Row>
      
      <Col xs={9}> 
        <PostList 
        searchQuery={searchQuery}
        selectedPostStatus={selectedPostStatus} />
      </Col>

      <Col>
        <SearchQuery
          setSearchQuery={setSearchQuery}
          />
        
        {
          searchQuery.length === 0 &&
          <PostFilter
            selectedPostStatus={selectedPostStatus}
            setSelectedPostStatus={setSelectedPostStatus}
          />
        }

      </Col>
    </Row>
  );
};

export default Home;
