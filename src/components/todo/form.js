import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import '../App.scss';

export default (props) => {

  const [item, setItem] = useState({});


  const handleInputChange = e => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
    console.log(item)
    props.handleSubmit(item);
    const newItem = {};
    setItem(newItem);
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Card>
          <Card.Body>

            <Card.Title as="h3">Add Item</Card.Title>

            <Form.Group controlId="formToDoItem">
              <Form.Label>
                To Do Item
            </Form.Label>
              <Form.Control
                name="text"
                type="text"
                placeholder="Add To Do List Item"
                onChange={handleInputChange}
              />

            </Form.Group>

            <Form.Group controlId="formDifficultyRating">
              <Form.Label>
                Difficulty Rating
              </Form.Label>
              <Form.Control defaultValue="1" type="range" min="1" max="5" name="difficulty" onChange={handleInputChange} />

            </Form.Group>
            <Form.Group controlId="formAssignee">
              <Form.Label>
                Assigned To
                </Form.Label>
              <Form.Control name="assignee" type="text" placeholder="Assignee Name" onChange={handleInputChange} />

            </Form.Group>


            <Button variant="primary" type="submit">Add Item</Button>

          </Card.Body>
        </Card>
      </Form>
    </>
  );

}

