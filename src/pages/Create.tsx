import { Form, Button, Row, Col } from "react-bootstrap";

const Create = () => {
  return (
    <Row>
      <Col xs={6}>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="Enter title" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Status</Form.Label>
            <Form.Select>
              <option value="">Select Status</option>
              <option value="Publish">Publish</option>
              <option value="Draft">Draft</option>
              <option value="Blocked">Blocked</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Body</Form.Label>
            <Form.Control as="textarea" rows={3} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default Create;