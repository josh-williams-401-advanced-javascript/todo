import React from 'react';

import './components/App.scss';
import ToDo from './components/todo/todo.js';
import Header from './components/header'
import SortProvider from './context/sort-field';
import CompleteProvider from './context/show-complete';

export default () => (
      <>

        <Header />
        
      <SortProvider>
        <CompleteProvider>

        <ToDo />

        </CompleteProvider>
      </SortProvider>
        
      </>
    );
