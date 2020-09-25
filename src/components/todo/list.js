import React, { useContext, useState, useEffect } from 'react';
import Toast from 'react-bootstrap/Toast';
import Badge from 'react-bootstrap/Badge';
import Pagination from 'react-bootstrap/Pagination';
import { SortContext } from '../../context/sort-field'
import { CompleteContext } from '../../context/show-complete'
import { NumPerScreenContext } from '../../context/num-per-screen'
import { LoginContext } from '../auth/context';
import Auth from '../auth/auth';

export default (props) => {

  const sortContext = useContext(SortContext);
  const completeContext = useContext(CompleteContext);
  const numPerScreenContext = useContext(NumPerScreenContext);
  const loginContext = useContext(LoginContext);

  const { numPer } = numPerScreenContext;

  const [activePage, setActivePage] = useState(1);
  const [pagesToRender, setPagesToRender] = useState(props.list);

  const numOfPaginationPages = () => {
    if (!completeContext.showComplete) {
      const pages = props.list.filter(item => !item.complete).length / numPer;
      return Math.ceil(pages)
    }
    else {

      return Math.ceil(props.list.length / numPer);
    }
  }

  const paginate = () => {
    let items = [];
    for (let i = 1; i <= numOfPaginationPages(); i++) {
      items.push(
        <Pagination.Item  key={i} active={i === activePage} onClick={() => changePage(i)} activeLabel={i === activePage && '(current)'}>
          {i}
        </Pagination.Item>
      )
    }
    return items;
  }

  
  const changePage = async (num) => {
    await setActivePage(num);
    let pages = props.list;
    if (!completeContext.showComplete) {
      pages = pages.filter(item => item.complete === false);
    }
    pages = pages.sort((a, b) => a[sortContext.sortBy] < b[sortContext.sortBy] ? -1 : 1)
    
    let newPages = pages.slice((num * numPer - numPer),(num * numPer));
    await setPagesToRender(newPages);
  }

  useEffect(() => {
    let pages = props.list;
    if (!completeContext.showComplete) {
      pages = pages.filter(item => item.complete === false);
    }
    pages = pages.sort((a, b) => a[sortContext.sortBy] < b[sortContext.sortBy] ? -1 : 1)
    setPagesToRender(pages.slice((activePage * numPer - numPer),(activePage * numPer)));

  }, [props.list, completeContext.showComplete, sortContext.sortBy, activePage, numPer])

  async function onComplete (id) {
    await props.handleComplete(id);
  }

  function calcMargin (i) {
    if(i === pagesToRender.length - 1 && activePage === numOfPaginationPages()) {

      let marginBottom = activePage * numPer - props.list.length;

      if (!completeContext.showComplete) {
        marginBottom = activePage * numPer - props.list.filter(item => !item.complete).length
      }
      return marginBottom * 91 + 22 + 'px';
    }
    return '15px';
  }

  return (
    <>
      {
        pagesToRender
          .map((item,i) =>
            (completeContext.showComplete || !item.complete)
            && (
              <Toast
                key={item._id}
                onClose={() => props.delete(item._id)}
                style={{
                  position: 'relative',
                  maxWidth: '100%',
                  marginBottom: calcMargin(i),
                  minHeight: '80px'
                }}
              >
                <Toast.Header
                closeButton={loginContext.can('delete')}
                >
                  <Auth capabilty="update">
                  <Badge
                    pill
                    style={{ marginRight: '15px', cursor:'pointer' }}
                    onClick={() => loginContext.can('update') && 
                    onComplete(item._id)}
                    variant={item.complete ? 'danger' : 'success'}>
                    {item.complete ? 'Complete' : 'Pending'}
                  </Badge>
                  </Auth>
                  <strong className="mr-auto">{item.assignee}</strong>
                </Toast.Header>
                <Toast.Body>
                  {item.text}
                </Toast.Body>
                <small style={{ position: 'absolute', bottom: 5, right: 5 }}>Difficulty: {item.difficulty}</small>
              </Toast>
            )
          )

      }

      <Pagination size="lg">{paginate()}</Pagination>
    </>

  )

};

