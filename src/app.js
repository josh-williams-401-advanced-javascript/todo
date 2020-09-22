import React from 'react';

// import 'bootstrap/dist/css/bootstrap.min.css';
import './components/App.scss';
import ToDo from './components/todo/todo.js';
import Header from './components/header'
import Container from 'react-bootstrap/Container'

export default () => (
      <>
        <Header />
        

        <ToDo />
        
      </>
    );
