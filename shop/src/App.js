/* eslint-disable */ 
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar,Nav,NavDropdown,Form,FormControl,Button,Jumbotron } from'react-bootstrap';
import { useState } from 'react';
import Data from './data.js';
import Detail from './Detail.js';
import { Link, Route, Switch } from 'react-router-dom';



function App() {
  let [shoes,shoes변경] = useState(Data);
 

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>Shop</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link>Home</Nav.Link>
            <Nav.Link href="/detail/0">Detail</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item>Action</NavDropdown.Item>
              <NavDropdown.Item>Another action</NavDropdown.Item>
              <NavDropdown.Item>Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>Separated link</NavDropdown.Item>
            </NavDropdown>
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
                <Button variant="primary">드러가기🥰</Button>
              </p>
          </Jumbotron>
          <div className="container">
            <div className="row">
            {
              shoes.map((shoesData,i) => {
                return(
                  <Card shoes={shoesData} i={i} key={i}/>
                )
              })
            }
            </div>
          </div>
        </Route>

        {/* 상세페이지 /:id url 파라미터 */}
        <Route path="/detail/:id">
          <Detail shoes = { shoes }/>
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
    <div className="col-md-4">
      <img alt="신발이미지" src={ 'https://codingapple1.github.io/shop/shoes' + (props.i+1) + '.jpg' } width="100%"/>
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.content},{props.shoes.price}</p>
    </div>    
  );
}

export default App;
