import axios from "axios";
import { useEffect, useState } from "react";

const Detail = ({car, setCurrentPage}) => {
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
    }, []);

    const onWishClick = () => {
        if (loggedOn) {
            axios.post("http://localhost:5000/wishlist", {id:member.id, no:car.no}).then(function (response) {
                console.log(response['data']);
            })
        }
    }

    return(<>
        <div>
            <h1>{car.name}의 상세 정보</h1>
            <hr />
            <p>사진</p>
            <img src={process.env.PUBLIC_URL + '/img/photo_'+car.no+'.png'} width="300px"></img>
            <hr />
            <p>등록한 사람: {car.member}</p>
            <p>차종: {car.name}</p>
            <p>종류: {car.type}</p>
            <p>연식: {car.year}</p>
            <p>주행 거리: {car.distance}</p>
            <p>사고 여부: {car.accident}</p>
            <p>가격: {car.price}</p>
            <p>제조 회사: {car.company}</p>
            <p>시리얼 넘버: {car.serial}</p>
            <p>번호판: {car.license}</p>
            <div className={`${loggedOn ? '' : 'd-none'}`}>
                <button className="btn btn-warning" onClick={() => onWishClick(car.no)}>위시리스트에 추가</button>
            </div>
            <button className="btn btn-danger" onClick={() => setCurrentPage('main')}>뒤로가기</button>
        </div>
    </>);
}

export default Detail;