import React, { useContext, useState, useEffect} from 'react';
import Toast from 'react-bootstrap/Toast';
import Badge from 'react-bootstrap/Badge';
import Pagination from 'react-bootstrap/Pagination';
import { SortContext } from '../../context/sort-field'
import { CompleteContext } from '../../context/show-complete'

export default (props) => {

  const sortContext = useContext(SortContext);
  const completeContext = useContext(CompleteContext);

  const [activePage, setActivePage] = useState(1);
  const [count, setCount] = useState(1);
  const [pagesToRender, setPagesToRender] = useState([]);

  const numOfPaginationPages = () => {
    if (!completeContext.showComplete) {
      const pages = props.list.filter(item => !item.complete).length / 3;
      return Math.ceil(pages)
    }
    else {
      return Math.ceil(props.list.length / 3);
    }
  }

  const paginate = () => {

    let items = [];
    for (let i = 1; i <= numOfPaginationPages(); i++) {
      items.push(
        <Pagination.Item key={i} active={i === activePage} onClick={setActivePage} activeLabel={i === activePage && '(current)'}>
          {i}
        </Pagination.Item>
      )
    }
    return items;
  }

  // const renderItem = async (i) => {
  //   if (i >= (activePage * 3 - 2) && count === 2) {
  //     // if (count <= 3) {
  //       // if (i === 1) {
  //       // await setCount(count + 1);
  //       return true;
  //     // }
  //   } else {
  //     return false;
  //   }
  // }
  // updateCount();
  // const updateCount = (i) => count === 3 ? setCount(0): setCount(i + 1);
  // useEffect(() => {
  // }, [updateCount])

  useEffect(() => {
   /*await in diff function*/ setPagesToRender(props.list);
    let pages;
    if(!completeContext.showComplete) {
      pages = props.list.filter(item => item.complete === false);
        console.log(pages)
      }
  },[props.list])

  return (
    <>
      {
        // props.list
        pagesToRender
          .sort((a, b) => a[sortContext.sortBy] < b[sortContext.sortBy] ? -1 : 1)
          .map((item, i) =>
            (completeContext.showComplete || !item.complete)
              // && ((i + 1 >= (activePage * 3 - 2)) && count <= 3)
              && (                
                <Toast
                  key={item._id}
                  onClose={() => props.delete(item._id)}
                  style={{ position: 'relative' }}
                >
                  {/* {setCount((count + 1) % 3)} */}
                  {console.log(i)}
                  <Toast.Header>
                    <Badge
                      pill
                      style={{ marginRight: '15px' }}
                      onClick={() => props.handleComplete(item._id)}
                      variant={item.complete ? 'danger' : 'success'}>
                      {item.complete ? 'Complete' : 'Pending'}
                    </Badge>
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


      <Pagination>{paginate()}</Pagination>
    </>

  )

};

