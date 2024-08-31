const Detail = ({car, setCurrentPage}) => {
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
            <button className="btn btn-danger" onClick={() => setCurrentPage('main')}>뒤로가기</button>
        </div>
    </>);
}

export default Detail;