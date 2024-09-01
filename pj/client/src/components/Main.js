import Table from "./Table";
import Login from "./Login";
import Logout from "./Logout";
import axios from "axios";
import { useEffect, useState } from "react";

const Main = ({ carList, searchOption, setSearchOption, searchText, setSearchText, onSearch, onDetailClick, setCurrentPage }) => {
    const [member, setMember] = useState(null);
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
    }, []);

    return (<>
        <div className="jumbotron">
            <h1>환영합니다.</h1>
            <div className={`${loggedOn ? 'd-none' : ''}`}>
                <button className={"btn btn-primary"} data-toggle="modal" data-target="#loginModal">로그인</button>
            </div>
            <div className={`${loggedOn ? '' : 'd-none'}`}>
                <button className={"btn btn-primary"} data-toggle="modal" onClick={() => setCurrentPage('mypage')}>마이페이지</button>
                <button className={"btn btn-danger"} data-toggle="modal" data-target="#logoutModal">로그아웃</button>

                <button className={"btn btn-danger d-none"} data-toggle="modal" onClick={(e) => { // 개발 환경에서 필요에 따라 드러나게 해서 사용
                    axios.get("http://localhost:5000/check-session").then(function (response) {
                        console.log(response['data']);
                    });
                }}>세션 확인</button>

            </div>
            <Login setLoggedOn={setLoggedOn} />
            <Logout setLoggedOn={setLoggedOn} />
        </div >
        <hr />
        <h2>중고차 목록</h2>
        <div>
            <select name="option" onChange={(event) => { setSearchOption(event.target.value) }}>
                <option>차종</option>
                <option>타입</option>
                <option>연식</option>
                <option>가격</option>
            </select>
            <input type="text" name="search" placeholder="검색" onChange={(event) => { setSearchText(event.target.value) }}></input>
            <button className="btn btn-primary" onClick={
                () => {
                    onSearch({ option: searchOption, text: searchText });
                }
            }>검색</button>
            <button className="btn btn-success" onClick={
                () => {
                    onSearch({ option: searchOption, text: "" });
                }
            }>초기화</button>
        </div>
        <Table carList={carList} onDetailClick={onDetailClick} />
    </>);
}

export default Main;