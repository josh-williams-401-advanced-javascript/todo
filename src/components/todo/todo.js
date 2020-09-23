import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import TodoForm from './form.js';
import TodoList from './list.js';
import useAjax from '../../hooks/ajax'
import '../App.scss';

const todoAPI = 'https://josh-williams-api-server.herokuapp.com/api/v1/todo';

export default () => {

  const updateList = (newList) => setList(newList);

  const [list, setList] = useState([]);
  const [apiCall] = useAjax(updateList);

  const toggleComplete = id => {
    let item = list.filter(i => i._id === id)[0] || {};
    if (item._id) {
      item.complete = !item.complete;
      apiCall(`${todoAPI}/${id}`, 'PUT', item);
    }
  };

  useEffect(() => {
    apiCall(todoAPI, 'GET')
  })


  return (
    <>
      <Container fluid="true" style={{ margin: "20px 100px" }}>

        <Row style={{ marginBottom: "20px" }}>
          <Col
            className="text-light bg-dark h2"
            style={{ padding: '20px' }}
          >
            To Do List Manager ({list.filter(item => !item.complete).length})
        </Col>
        </Row >

        <Row>
          <Col md={5}>
            <TodoForm
              handleSubmit={value => apiCall(todoAPI, 'POST', value)}
            />
          </Col>

          <Col md={7}>
            <TodoList
              list={list}
              handleComplete={toggleComplete}
              delete={id => apiCall(`${todoAPI}/${id}`, 'DELETE', id)}
            />
          </Col>
        </Row>

      </Container>
    </>
  );
}

