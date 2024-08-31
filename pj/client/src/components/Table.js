const Table = ({carList, onDetailClick}) => {
    return(<table className="table table-hover">
        <thead>
            <tr>
                <th width="15%">사진</th>
                <th width="15%">차종</th>
                <th width="15%">타입</th>
                <th width="15%">연식</th>
                <th width="15%">가격</th>
                <th width="15%"></th>
            </tr>
        </thead>
        <tbody>
            {carList.map((car) => {
                return(<tr key={car.no}>
                    <td><img src={process.env.PUBLIC_URL + '/img/photo_'+car.no+'.png'} width="300px"></img></td>
                    <td>{car.name}</td>
                    <td>{car.type}</td>
                    <td>{car.year}년</td>
                    <td>{car.price} 만원</td>
                    <td><button className="btn btn-primary" onClick={() => onDetailClick(car.no)}>상세 정보</button></td>
                </tr>);
            })}
        </tbody>
    </table>);
}

export default Table;