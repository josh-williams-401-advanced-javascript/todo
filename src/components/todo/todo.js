import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


import TodoForm from './form.js';
import TodoList from './list.js';
import '../App.scss';

import './todo.scss';

export default () => {

  const [list, setList] = useState([]);

  const addItem = (item) => {
    item._id = Math.random();
    item.complete = false;
    setList([...list, item]);
  };

  const toggleComplete = id => {

    let item = list.filter(i => i._id === id)[0] || {};

    if (item._id) {
      item.complete = !item.complete;
      let newList = list.map(listItem => listItem._id === item._id ? item : listItem);
      setList(newList);
    }

  };

  useEffect(() => {
    let firstList = [
      { _id: 1, complete: false, text: 'Clean the Kitchen', difficulty: 3, assignee: 'Person A' },
      { _id: 2, complete: false, text: 'Do the Laundry', difficulty: 2, assignee: 'Person A' },
      { _id: 3, complete: false, text: 'Walk the Dog', difficulty: 4, assignee: 'Person B' },
      { _id: 4, complete: true, text: 'Do Homework', difficulty: 3, assignee: 'Person C' },
      { _id: 5, complete: false, text: 'Take a Nap', difficulty: 1, assignee: 'Person B' },
    ];

    setList(firstList);
  }, [])


  return (
    <>
      <Container fluid="true" style={{ margin: "20px 100px" }}>

        <Row style={{marginBottom:"20px"}}>
          <Col className="text-light bg-dark h2" style={{ padding: '20px' }}>
            There are {list.filter(item => !item.complete).length} Items To Complete
        </Col>

        </Row >

          <Row>
            <Col md={5}>
              <TodoForm handleSubmit={addItem} />
            </Col>
            <Col md={5}>
              <TodoList
                list={list}
                handleComplete={toggleComplete}
              />
            </Col>
          </Row>
      </Container>
    </>
  );
}

