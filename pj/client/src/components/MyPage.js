import React from 'react';

const MyPage = ({ member, setCurrentPage }) => {
    const isLoggedIn = !!member;

    return (
        <>
            <h1 className="jumbotron">마이페이지</h1>
            {isLoggedIn ? (
                <div id="myPageMain">
                    <h2>마이페이지 내용</h2>
                </div>
            ) : (
                <div id="cantLoad">
                    <h2 className="text-danger">비정상 접근 - 로그인되어 있지 않습니다.</h2>
                    <button className="btn btn-danger" onClick={() => setCurrentPage('main')}>뒤로가기</button>
                </div>
            )}
        </>
    );
}

export default MyPage;
