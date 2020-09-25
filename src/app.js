import React from 'react';

import './components/App.scss';
import ToDo from './components/todo/todo.js';
import Header from './components/header'
import SortProvider from './context/sort-field';
import CompleteProvider from './context/show-complete';
import NumPerScreenProvider from './context/num-per-screen';
import LoginProvider from './components/auth/context'

export default () => (
  <>
    <LoginProvider>

      <Header />

      <SortProvider>
        <CompleteProvider>
          <NumPerScreenProvider>

            <ToDo />

          </NumPerScreenProvider>
        </CompleteProvider>
      </SortProvider>
      
    </LoginProvider>
  </>
);
