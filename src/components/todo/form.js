import React from "react";
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import '../App.scss';
import useForm from '../../hooks/form'
import Auth from '../auth/auth';


export default (props) => {

  const[handleInputChange, handleSubmit] = useForm(formCallback);  

  function formCallback(value){
    props.handleSubmit(value);
  }

  return (
    <>
    <Auth capabilty="update">
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
                placeholder="Item Details"
                onChange={handleInputChange}
              />

            </Form.Group>
            
            <Form.Group controlId="formAssignee">
              <Form.Label>
                Assigned To
                </Form.Label>
              <Form.Control name="assignee" type="text" placeholder="Assignee Name" onChange={handleInputChange} />
            </Form.Group>

            <Form.Group controlId="formDifficultyRating">
              <Form.Label>
                Difficulty
              </Form.Label>
              <Form.Control defaultValue="1" type="range" min="1" max="5" name="difficulty" onChange={handleInputChange} />
              </Form.Group>


            <Button variant="primary" type="submit">Add Item</Button>

          </Card.Body>
        </Card>
      </Form>
      </Auth>
    </>
  );

}

