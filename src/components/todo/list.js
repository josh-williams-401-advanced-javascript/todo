import React from 'react';
import Toast from 'react-bootstrap/Toast';
import Badge from 'react-bootstrap/Badge';

export default (props) => (


  <>
    {props.list.map(item => (
      <Toast key={item._id} onClose={() => props.delete(item._id)} style={{position: 'relative'}}>
        <Toast.Header>
              <Badge
                pill
                style={{marginRight: '15px'}}
                onClick={() => props.handleComplete(item._id)}
                variant={item.complete ? 'danger' : 'success'}>
                {item.complete ? 'Complete' : 'Pending'}
              </Badge>
              <strong className="mr-auto">{item.assignee}</strong>
        </Toast.Header>
        <Toast.Body>
          {item.text}
        </Toast.Body>
        <small style={{position: 'absolute', bottom: 5, right: 5}}>Difficulty: {item.difficulty}</small>
      </Toast>
    ))}
  </>

);

