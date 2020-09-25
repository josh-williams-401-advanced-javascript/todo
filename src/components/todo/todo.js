import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import axios from 'axios';
import Auth from '../auth/auth'



import TodoForm from './form.js';
import TodoList from './list.js';
import useAjax from '../../hooks/ajax'
import '../App.scss';

const todoAPI = 'https://josh-williams-api-server.herokuapp.com/api/v1/todo';
// const todoAPI = 'https://api-js401.herokuapp.com/api/v1/todo'

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
    apiCall(todoAPI,'GET')
    // console.log('is useEffect TODO')

    // Use this somehow to avoid warning!!
    // axios({
    //   url:'https://josh-williams-api-server.herokuapp.com/api/v1/todo', method:'GET'
    // })
    //   .then(results => {
    //   setList(results.data.results);
    // })
    //   .catch(e => console.log(e));
  }, [])


  return (
    <>
    
      <Container fluid="true" style={{ margin: "20px 100px" }}>
      <Auth>

        <Row style={{ marginBottom: "20px" }}>
          <Col
            className="text-light bg-dark h2"
            style={{ padding: '20px' }}
          >
            To Do List Manager ({list.filter(item => !item.complete).length})
        </Col>
        </Row >
      </Auth>

        <Row>
            <Auth capability="create">
          <Col md={5}>
            <TodoForm
              handleSubmit={value => apiCall(todoAPI, 'POST', value)}
             />
          </Col>
            </Auth>
            
            <Auth capability = "read">
          <Col>
            <TodoList
              list={list}
              handleComplete={toggleComplete}
              delete={id => apiCall(`${todoAPI}/${id}`, 'DELETE', id)}
            />
          </Col>
          </Auth>
        </Row>


      </Container>
    </>
  );
}

