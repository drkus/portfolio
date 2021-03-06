/* eslint-disable */ 
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar,Nav,NavDropdown,Form,FormControl,Button,Jumbotron } from'react-bootstrap';
import { useState } from 'react';
import Data from './data.js';
import Detail from './Detail.js';
import { Link, Route, Switch } from 'react-router-dom';
import axios from 'axios';


function App() {
  let [shoes, shoes변경] = useState(Data);
  let [inventory, inventory변경] = useState([4,3,9]);// 재고 데이터
  let [addBtn, addBtn변경] = useState(true); // 더보기 버튼 클릭 시, 더보기 버튼 노출 관련 bool 변수
  let [loadingUi, loadingUi변경] = useState(false);// 로딩중 UI
  let [loadingFailUi, loadingFailUi변경] = useState(false);
  let [linkUrl, linkUrl변경] = useState(['/detail/']);// 이미지 선택 시 이동하는 경로 ]
  let url = [...linkUrl];
  
  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Navbar.Brand as={ Link } to="/">Shop</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {/* <Nav.Link as={ Link } to="/detail/0">상품</Nav.Link> */}
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
      
      {/* 택 1, 해당 맨 위 */}
      <Switch>
        {/* 기본페이지 exact */}
        <Route exact path="/">
          <Jumbotron className="background">
            <h1>신발 쇼핑몰 입니다.</h1>
              <p>20% 한정 세일</p>
              <p>
                {/* <Button variant="primary" as={ Link } to="/detail/0">드러가기🥰</Button> */}
              </p>
          </Jumbotron>
          <div className="container">
            <div className="row">
            {
              
              shoes.map((shoesData,i) => {
                return(
                  <Card shoes={shoesData} i={i} key={i} url={url+i} />
                )
              })
            }
            {
              addBtn === true 
              ?
              <button className="btn btn-dark" onClick={() => {
                addBtn변경(false); // 더보기 버튼 미노출
                loadingUi변경(true); // 로딩 중입니다.. 문구 노출
                
                axios.get('https://codingapple1.github.io/shop/data2.json')
                .then((result) => { 
                  loadingUi변경(false); // 로딩 중입니다... 문구 제거
                  shoes변경([...shoes, ...result.data]); // result.data가 data.js에 추가
                  // (임시) 재고 데이터를 axios에서 받은 result.data 의 id 값을 inventory로 설정
                  let inventoryCopy = [...inventory];
                  result.data.forEach((a,i) => {
                    inventoryCopy.push(result.data[i].id);
                  });
                  inventory변경(inventoryCopy);
                })
                .catch(() => { 
                  loadingFailUi변경(true);// 로딩 실패 문구 노출
                  console.log('get error',result); 
                })
              }}>더보기</button>
              : null
            }
            {
              loadingUi === true
              ?
              <div className="loading"><p>로딩 중입니다..</p></div> 
              :
              null
            }
            {
              loadingFailUi === true
              ?
              <div className="loading"><p>로딩 실패</p></div> 
              :
              null
            }
               

            </div> 
          </div>
        </Route>

        {/* 상세페이지 /:id url 파라미터 */}
        <Route path="/detail/:id">
          <Detail shoes = { shoes } inventory = { inventory } inventory변경 = { inventory변경 }/>
        </Route>  
        {/* <Route path="/어쩌구" componet={Modal}></Route> */}

        {/* 그 외 페이지 /이후 파라미터 */}
        <Route path="/:id">
            <div>404 error</div>
        </Route>
      </Switch>
    </div>
  );
}

function Card(props){
  return(
    <div className="col-md-4" >
        <img alt="신발이미지" src={ 'https://codingapple1.github.io/shop/shoes' + (props.i+1) + '.jpg' } width="100%"/>
        <h4>{props.shoes.title}</h4>
        <p>{props.shoes.content},{props.shoes.price}</p>
        <Button className="cardBtn" variant="primary" as={ Link } to={props.url}>구매하기🥰</Button>
    </div>    
  );
}

export default App;
