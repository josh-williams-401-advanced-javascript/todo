import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';

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
    async function fetchData() {

      try {
        const results = await axios({
          url: 'https://josh-williams-api-server.herokuapp.com/api/v1/todo',
          method: 'GET',
          data: '',
        });
        console.log(results.data.results);
        setList(results.data.results);

      } catch (e) {
        console.log(e);
      }
    }

    fetchData()
  }, [])


  return (
    <>
      <Container fluid="true" style={{ margin: "20px 100px" }}>

        <Row style={{ marginBottom: "20px" }}>
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

