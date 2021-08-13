/* eslint-disable */ 
import { props } from 'bluebird';
import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import './Detail.css';

let Box = styled.div`
    padding : 20px;
`;
let H4Title = styled.h4`
    font-size : 25px;
    color : ${ props => props.color }
`;
// 프롭스로 보는 값은 {값}, 또는 "문자"로 가능

function Detail(props){
    let { id } = useParams(); // 파라미터 id
    let history = useHistory(); //  유저 방문 기록
    let selectProduct = props.shoes.find((a)=>{
        return a.id == id;
    });// 파라미터 url 과 data.js의 id 값 비교하여 참일 경우 해당 오브젝트(props.shoes) 값 리턴
    
    let imgUrl = ''; // url 문자 담을 변수
    id = parseInt(id); // 파라미터 id 값이 문자라 int형으로 파싱
    let bConnet = false; // 파라미터 값과 data.js의 id 값과 다를 경우, 다른 페이지를 보여주기 위한 bool 값
    if( selectProduct != undefined && id == selectProduct.id){
        bConnet = true;
        imgUrl = 'https://codingapple1.github.io/shop/shoes' + ( id + 1 ) + '.jpg';
    }
    else{
        bConnet = false;
        imgUrl = '/auyumu.jpg';
    }

    return(
        <div className="container">
        <Box>
            <H4Title color="blue">상세페이지</H4Title>
        </Box>
        {
            bConnet === true
            ? 
            <div className="row">
                <div className="col-md-6">
                    <img src={ imgUrl } alt="img" width="100%" />
                </div>
                <div className="col-md-6 mt-4">
                    <h4 className="pt-5">{ selectProduct.title }</h4>
                    <p>{ selectProduct.content }</p>
                    <p>{ selectProduct.price }원</p>
                    <button className="btn btn-danger">주문하기</button> 
                    <button className="btn btn-danger" onClick={()=>{ history.goBack();}}>뒤로가기</button> 
                </div>
            </div>
            :
            <div className="row">
                <div className="col-md-6">
                    <p>잘못된 상세페이지 접근 입니다.</p>
                    <img src={ imgUrl } alt="img" width="100%" />
                </div>
            </div>

        }    

        </div> 
    );
}
export default Detail;
