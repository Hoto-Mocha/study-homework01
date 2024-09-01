import axios from "axios";
import { useState, useEffect } from "react";
import Main from "./components/Main";
import Detail from "./components/Detail";
import MyPage from "./components/MyPage";

function App() {
    const [carList, setCarList] = useState([]);
    const [searchOption, setSearchOption] = useState("차종"); // 기본값 설정
    const [searchText, setSearchText] = useState(""); // 기본값 설정
    const serverURL = 'http://localhost:5000/';

    const [currentPage, setCurrentPage] = useState('main');
    const [detailNo, setDetailNo] = useState(-1);

    useEffect(() => {
        axios.get(serverURL + "db").then(function (response) {
            setCarList(response['data']);
        });
    }, []);

    const onSearch = ({ option, text }) => {
        axios.post(serverURL + "db", { option: option, text: text }).then(function (response) {
            setCarList(response['data']);
        });
    }

    const onDetailClick = (no) => {
        setDetailNo(no);
        setCurrentPage('detail');
    }

    const renderPage = () => {
        switch (currentPage) {
            case 'main':
                return <Main carList={carList}
                    searchOption={searchOption}
                    setSearchOption={setSearchOption}
                    searchText={searchText}
                    setSearchText={setSearchText}
                    onSearch={onSearch}
                    onDetailClick={onDetailClick}
                    setCurrentPage={setCurrentPage} />;
            case 'detail':
                let idx = carList.findIndex((car) => {
                    return car.no === detailNo;
                });
                if (idx !== -1) {
                    return <Detail car={carList[idx]} setCurrentPage={setCurrentPage} />
                } else {
                    return <Main carList={carList}
                        searchOption={searchOption}
                        setSearchOption={setSearchOption}
                        searchText={searchText}
                        setSearchText={setSearchText}
                        onSearch={onSearch}
                        onDetailClick={onDetailClick} />;
                }
            case 'mypage':
                return <MyPage setCurrentPage={setCurrentPage}
                    onSearch={onSearch}
                    carList={carList}
                    onDetailClick={onDetailClick} />
        }
    };

    return (
        <div>
            {renderPage()}
        </div>
    );
}

export default App;