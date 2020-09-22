import React from 'react'
import { render, waitFor, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import App from '../components/app.js'

describe('app tests', () => {
  it('renders the screen', () => {
    render(<App />);

    const toDoListInput = screen.getByPlaceholderText('Add To Do List Item');
    fireEvent.change(toDoListInput, {event:{target: 'Go Jogging'}})

    fireEvent.click(screen.getByText('Add Item'));
  })


})