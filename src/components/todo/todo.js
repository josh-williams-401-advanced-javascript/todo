import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';

import TodoForm from './form.js';
import TodoList from './list.js';
import '../App.scss';

import './todo.scss';


const todoAPI = 'https://josh-williams-api-server.herokuapp.com/api/v1/todo';



export default () => {

  const [list, setList] = useState([]);

  const addItem = async (item) => {

    try {
      const results = await axios({
        url: todoAPI,
        method: 'Post',
        data: item,
      });
      setList([...list, results.data]);
    } catch (e) {
      console.log(e);
    }
  };



  const toggleComplete = id => {

    let item = list.filter(i => i._id === id)[0] || {};

    if (item._id) {

      item.complete = !item.complete;

      toggleDatabase(id, item);

      let newList = list.map(listItem => listItem._id === item._id ? item : listItem);

      setList(newList);
    }

  };

  const toggleDatabase = async (id, item) => {
    try {
      const results = await axios({
        url: `${todoAPI}/${id}`,
        method: 'PUT',
        data: item,
      });
      return results.data;
    } catch (e) {
      console.log(e);
    }
  }

  const deleteItem = async id => {
    try {

      await axios({
        url: `${todoAPI}/${id}`,
        method: 'DELETE',
      });

      const newList = list.filter(list => list._id !== id );

      setList(newList);

    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    async function fetchData() {

      try {
        const results = await axios({
          url: todoAPI,
          method: 'GET',
          data: '',
        });

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
            To Do List Manager ({list.filter(item => !item.complete).length})
        </Col>

        </Row >

        <Row>
          <Col md={5}>
            <TodoForm
              handleSubmit={addItem}
            // addToDb={addToDatabase}
            />
          </Col>
          <Col md={7}>
            <TodoList
              list={list}
              handleComplete={toggleComplete}
              delete={deleteItem}
              />
          </Col>
              </Row>
              </Container>
    </>
  );
}

