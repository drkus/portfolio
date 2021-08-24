/* eslint-disable */
import React, { useState, useRef  } from 'react';
import logo from './logo.svg';
import './App.css';
import { end } from 'worker-farm';

function App() {
  let [글제목들, 글제목들변경] = useState(['한국의 맛집 추천','하이잌','수원 갈비 추천','충남 호두과자 추천','ss']);
  let [입력데이터,입력데이터변경] = useState('');


  // modal
  let [모달스위치,모달스위치변경] = useState(false);
  let [모달글제목,모달글제목변경] = useState(글제목들[0]);

  let 제목하트 = [...글제목들];  // 하트 변수 선언 및 deep 복사
  제목하트 = 제목하트.map((a) => {
    return a = 0;
  });  // 하트 초기화
  var [하트,하트변경] = useState(제목하트); // 하트 : arr

  let changeHartArr = [...하트];   // 하트 deep 복사
  let changeHart; // 하트 바뀐 정보 대한 카운트
  var befData = [];
  let doubleArr = [];
  
  function 하트카운터(index){
    changeHart = changeHartArr[index];
    changeHart += 1;
    changeHartArr[index] = changeHart;
    하트변경(changeHartArr);
    이전데이터();
  }
  function 이전데이터(){
    befData = [];
    글제목들.map((a,index) => {
      befData.push({글제목 : 글제목들[index], 하트갯수 : changeHartArr[index], 날짜: '미정'});
    });
  }
  function UpdateHart(arr){
    let sortHart = [...changeHartArr]; // 하트 카운터 값의 배열
    for(var i in arr){
      sortHart[arr[i][1]] = changeHartArr[arr[i][0]]; // arr는 이중 배열로 기존 위치와 정렬 후 값이 있음. 0 : 정렬 전 데이터, 1 : 정렬 후 데이터
    }
    하트변경(sortHart);
  }
  function 정렬기능(){
    let sortData = [...글제목들];//Immuntable data, deep copy
    sortData = sortData.sort();
    이전데이터();
    for(var key in sortData){
      if(sortData[key] !== befData[key].글제목){
        for(var key2 in sortData){
          if(befData[key].글제목 == sortData[key2]){            
            doubleArr.push([key,key2]);
          }
        }   
      }
    }
    UpdateHart(doubleArr);
    글제목들변경(sortData);
  }// 정렬

  function 글추가(data){
    let newData = [...글제목들];
    newData.unshift(data);
    글제목들변경(newData);  
  }

let [imgHanga,imgHanga변경] = useState([
  '1-9',
  '10-18',
  '19-20',
  '21-29',
  '30-38',
  '39-41',
  '42-50',
  '51-59',
  '60-62',
  '63-71',
  '72-80',
  '81-83',
  '84-92',
  '93-101',
  '102-104',
  '105-113',
  '114-122',
  '123-125',
  '126-134',
  '135-143',
  '144-146',
  '147-155',
  '156-164',
  '165-167',
  '168-176',
  '177-185',
  '186-188',
  '189-197',
  '198-206',
  '207-209',
  '210-217',
  '218-226',
  '227-230',
  '231-239',
  '240-248',
  '249-251',
  '252-260',
  '261-269',
  '270'
]);

function showFront(id){
  document.getElementById(id).style.display = "none";
  document.getElementById(id+"b").style.display = "block";
}
function showBack(id){
  document.getElementById(id).style.display = "none";
  var arr = [...id];
  arr.pop();
  var urlText = '';
  arr.forEach((e,i)=>{
    urlText += arr[i];
  })
  document.getElementById(urlText).style.display = "block";
  
}




let imgUrl = "hanga/"+imgHanga[0]+".JPG";
  return (
    <div className="App">
      <div className="black-nav">
        <div>국왕국어 사자성어 270</div>
      </div>
      {/* <button className="btn3" onClick={ 정렬기능 }>정렬</button>
      <button onClick={ ()=>{ 모달스위치변경(!모달스위치) } }> 상세페이지 모달 </button>

      <div className="publish">
        <input onChange={ (e)=>{ 입력데이터변경(e.target.value) } }/>
        <button onClick={ ()=>{ 글추가(입력데이터) } }>저장</button>
      </div> */}
      <div className="hanga">
        {
          imgHanga.map((e,i)=>{
            return(
              <div>
                <img onClick={(e)=>{showFront(e.target.id)}} className="front" id={imgHanga[i]} src={"hanga/"+imgHanga[i]+".JPG"} alt="" width="100%"></img>
                <img onClick={(e)=>{showBack(e.target.id)}} className="back" id={imgHanga[i]+"b"} src={"hanga/"+imgHanga[i]+"b"+".JPG"} alt="" width="100%"></img><hr/>
              </div>
              
            );
          })
        }
     
        
      </div>

     
      {/* {
        모달스위치 === true
        ? <Modal 모달글제목 = {모달글제목} />
        : null
      }
      {
        글제목들.map((a,index) => {
          return(  <div className="list" key={ index }>          
                    <h4 onClick={ ()=>{모달글제목변경(a)} } >{ a } <span onClick={ ()=>{하트카운터(index)} }>❤</span> { 하트[index] } </h4>
                    <p>2월 17일 발행</p>
                    <hr/>
                  </div>
          )
        })
      }
      <Profile /> */}

    </div>
  );
}

function Modal(props){
  return(<div className="modal">
    <h2>{props.모달글제목}</h2>
    <p>날짜</p>
    <p>상세내용</p>
  </div>
  );
}

// class extends React.Component 사용하기
class Profile extends React.Component{
  constructor(){
    super();// React.Component 내 변수 사용하려면 먼저 호출
    this.state = { name : "김용석", age : 30 }
  }
  //.bind(this) 안하기, arrow 함수 쓰기
  onChange = () => {
    this.setState( { name : '용용석' } );
    this.setState( { age : '22' } );
  }

  //bind(this) 하기
  onChange2(){
    this.setState( { name : '용용석' } );
    this.setState( { age : '22' } );
  }
  render(){
    return(
      <>
      <h4>프로필입니다.</h4>
      <p>{this.state.name},{this.state.age}</p>
      <button onClick={this.onChange}>이름,나이 버튼</button>
      {/* <button onClick={this.onChange2.bind(this)}>이름,나이 버튼</button> */}
      </>
    );
  }
}

export default App;
