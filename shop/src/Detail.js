/* eslint-disable */ 
import React, { useEffect, useState } from 'react';
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
    // lifecyle hook과 비슷한 useEffect 
    // 기본적으로 컴포넌트 mount 될 때 실행 'return 함수'는 unmount 될 때 호출 ',[컴포넌트]'는 변경 될 때 실행
    // tip : ,[] 설정 시 컴포넌트 최초 등장 시에만 동작
    let [alertShow, alertShow변경] = useState(true); // 2000(2초) 후, 사라지는 alert bool 값
    useEffect(() => {
        let alertTimer = setTimeout(() => {
            alertShow변경(false);
        }, 2000);
        return () => { clearTimeout(alertTimer); }
    },[alertShow]);

    // 파라미터 관련 
    let { id } = useParams(); // 파라미터 id, 해당 페이지 파라미터 값 detail/id
    let history = useHistory(); //  유저 방문 기록
    let selectProduct = props.shoes.find((a) => {
        return a.id == id;
    });// 파라미터 url 과 data.js의 id 값 비교하여 참일 경우 해당 오브젝트(props.shoes) 값 리턴
    id = parseInt(id); // 파라미터 id 값이 문자라 int형으로 파싱

    // 이미지 관련
    let imgUrl = ''; // url 문자 담을 변수
    let bConnet = false; // 파라미터 값과 data.js의 id 값과 다를 경우, 다른 페이지를 보여주기 위한 bool 값
    if( selectProduct != undefined && id == selectProduct.id){
        bConnet = true;
        imgUrl = 'https://codingapple1.github.io/shop/shoes' + ( id + 1 ) + '.jpg';
    }
    else{
        bConnet = false;
        imgUrl = '/auyumu.jpg';
    }

    // App.js props로 온 inventory 재고 관련 데이터
    let copyInventroy = [...props.inventory]; // 깊은 복사
    function CalInventory(arr){// arr은 배열로 copyInventroy[id]를 받는다
        if(!alertShow){// 재고 알림 사라지고, 재고 감소
            if(copyInventroy[id] != 0){// 재고 0까지 감소
                copyInventroy[id] -= 1;
                console.log(copyInventroy);
                props.inventory변경(copyInventroy);
            }
            else{//재고 완전 소진, [주문하기] 버튼 CSS 변경 
                document.getElementById('buyBtn').disabled = true;
            }
        }
        else{// 재고 알림 설정 값 alertShow : true, 2초 후 -> useEffect에서 fALSE로 바뀜
        }
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
                {
                    alertShow === true
                    ?
                    <div className="my-alert">
                        <p>재고가 얼마 남지 않았습니다</p>
                    </div>
                    :
                    null
                }
                    <div className="col-md-6">
                        <img src={ imgUrl } alt="img" width="100%" />
                    </div>
                    <div className="col-md-6 mt-4">
                        <h4 className="pt-5">{ selectProduct.title }</h4>
                        <p>{ selectProduct.content }</p>
                        <p>{ selectProduct.price }원</p>
                        <Info inventory = { props.inventory[id] }></Info>
                        <button active='true' id="buyBtn" className="btn btn-danger" onClick={() => { CalInventory(copyInventroy[id]); }}>주문하기</button>
                        <button className="btn btn-danger" onClick={() => { history.goBack();}}>뒤로가기</button> 
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

function Info(props){
    return(
        <p>재고 : {props.inventory} </p>
    )
}

export default Detail;
