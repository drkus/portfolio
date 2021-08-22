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
    const INFO_POP_SHOW = true; // 재고 알림 팝업 노출 여부

    let [infoAblePop, infoAblePop변경] = useState(true);//'재고 있음' 알림 팝업
    let [infoIsNotPop, infoIsNotPop변경] = useState(false);// '재고 없음' 알림 팝업
    let [infoErrorPop, infoErrorPop변경] = useState(false);// '에러 알림' 팝업

    const TIME = 3;
    let [infoCnt, infoCnt변경] = useState(TIME);
    let changCnt = infoCnt;
    const TIMER_ADD = 1000;
    const TIMER_CNT = infoCnt * TIMER_ADD;

    // 화면 초기화([주문하기] 버튼, n초(TIMER_CNT) 후 알림창 사라짐)
    useEffect(() => {// 처음 화면 로드되면 [주문하기] 버튼 disabled 후, n초(TIMER_CNT) 후 disabled 해제
        let infoPopTimer;
        if(INFO_POP_SHOW){
            document.getElementById('buyBtn').disabled = true;// [주문하기] 버튼 비활성화
            if(props.inventory[0] > 0){// 재고 있을 경우, TIMER_CNT 후 알림 팝업 닫고 [주문하기] 버튼 활성화 
                infoPopTimer = setTimeout(() => {
                    infoAblePop변경(false);// '재고 있음 알림' 팝업 닫기
                    document.getElementById('buyBtn').disabled = false;// [주문하기] 버튼 활성화
        
                }, TIMER_CNT);
            }
            else if(props.inventory[0] == 0){// 재고가 없을 경우
                infoAblePop변경(false);// '재고 있음 알림' 팝업 닫기
                infoIsNotPop변경(true);// '재고 없음 알림' 팝업 열기
            }
            else{// 그 밖에 잘못된 데이터가 있을 경우
                infoErrorPop변경(true);// '에러 알림' 팝업 열기
            }
        }
        else if(!INFO_POP_SHOW){
            infoAblePop변경(false);// '재고 있음 알림' 팝업은 초기 값이 true, '재고 있음 알림' 팝업 닫기
            if(props.inventory[0] > 0){// 재고 있을 경우 
                document.getElementById('buyBtn').disabled = false; // [주문하기] 버튼 활성화
            }
            if(props.inventory[0] == 0){// 재고가 없을 경우
                document.getElementById('buyBtn').disabled = true;// [주문하기] 버튼 비활성화
                infoAblePop변경(false);// '재고 있음 알림' 팝업 닫기
                infoIsNotPop변경(true);// '재고 없음 알림' 팝업 열기
            }
            else{// 그 밖에 잘못된 데이터가 있을 경우
                document.getElementById('buyBtn').disabled = true;// [주문하기] 버튼 비활성화
                infoErrorPop변경(true);// '에러 알림' 팝업 열기
            }
        }
        return () => { clearTimeout(infoPopTimer); }
    },[]);

    useEffect(() => { // 알림창 내 카운터
        const INFO_CNT_TIMER = setTimeout(() => {
            if(changCnt != 0 && infoAblePop){
                changCnt--;
                infoCnt변경(changCnt);
            }
        }, TIMER_ADD);
        return () => { clearTimeout(INFO_CNT_TIMER); }
    },[changCnt]);

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

    // App.js props로 온 'inventory 뜻 : 재고' 관련 데이터
    let copyInventroy = [...props.inventory]; // 깊은 복사
    function CalInventory(arr){// arr은 배열로 [주문하기] 버튼 클릭 시, copyInventroy[id]를 받는다
        if(!infoAblePop){// 재고 알림창 사라지고, 재고 감소
            if(copyInventroy[id] != 0 && copyInventroy[id] > 0){// 재고 0까지 감소
                copyInventroy[id] -= 1;
                if(copyInventroy[id] > 0){
                    props.inventory변경(copyInventroy);
                }   
                else if(copyInventroy[id] == 0){// 재고가 0 개일 경우, 재고 완전 소진, [주문하기] 버튼 disabled 변경 
                    document.getElementById('buyBtn').disabled = true;
                    props.inventory변경(copyInventroy);
                    infoIsNotPop변경(true); // 품절 팝업 노출
                }
            }
            else{// 품절(재고 0개) 이후, 뒤로가기, 캐시 등 브라우저 관리자모드 등에서 disabled 뚫고 클릭 시
                document.getElementById('buyBtn').disabled = true;
                infoErrorPop변경(true); // error 팝업 노출
            }
        }
        else{// 대기 팝업 사라지기 전, 클릭 시
            infoErrorPop변경(true); // error 팝업 노출
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
                    infoAblePop === true
                    ?
                    <div className="my-alert">
                        <p>{ infoCnt }초 후 주문 하실 수 있습니다.</p>
                    </div>
                    :
                    null
                }
                {
                    infoIsNotPop === true
                    ?
                    <div className="my-alert-end">
                        <p>상품이 품절 되었습니다.</p>
                    </div>
                    :
                    null
                }
                {
                    infoErrorPop === true
                    ?
                    <div className="my-alert-error">
                        <p>주문을 할 수 없습니다.</p>
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
                        <button id="buyBtn" className="btn btn-danger" onClick={() => { CalInventory(copyInventroy[id]); }}>주문하기</button>
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
