import React, { useEffect, useState } from 'react';
import Table from './Table';
import axios from 'axios';

const MyPage = ({ setCurrentPage, onSearch, carList, onDetailClick }) => {
    const [member, setMember] = useState({});
    const [loggedOn, setLoggedOn] = useState(false);
    useEffect(() => {
        axios.get("http://localhost:5000/check-session").then(function (response) {
            if (response['data']) {
                setMember((response['data']));
                setLoggedOn(true);
            } else {
                setLoggedOn(false);
            }
        });
        onSearch({ option: "번호", text: [] });
    }, []);

    return (
        <>
            <h1 className="jumbotron">마이페이지</h1>
            {loggedOn ? (
                <div id="myPageMain">
                    <h2>{member.name}님 환영합니다.</h2>
                    <hr />
                    <button className="btn btn-success" onClick={
                        () => {
                            console.dir(member);
                            console.log(member.wishlist);
                            onSearch({ option: "번호", text: member.wishlist });
                        }
                    }>위시리스트</button>
                    <Table carList={carList} onDetailClick={onDetailClick} />
                </div>
            ) : (
                <div id="cantLoad">
                    <h2 className="text-danger">비정상 접근 - 로그인되어 있지 않습니다.</h2>
                </div>
            )}
            <button className="btn btn-danger" onClick={() => setCurrentPage('main')}>뒤로가기</button>
        </>
    );
}

export default MyPage;
