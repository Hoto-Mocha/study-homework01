import axios from "axios";

const Logout = ({setLoggedOn}) => {

    const onLogout = () => {
        let serverURL = 'http://localhost:5000/';
        axios.get(serverURL + "logout").then(function (response) {
            setLoggedOn(false);
        });
    };

    return (<div className="modal" id="logoutModal">
        <div className="modal-dialog">
            <div className="modal-content">

                <div className="modal-header">
                    <h4 className="modal-title">로그아웃</h4>
                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                </div>

                <div className="modal-body">
                    정말 로그아웃하시겠습니까?
                </div>

                <div className="modal-footer">
                    <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => {
                        onLogout();
                    }}>로그아웃</button>
                    <button type="button" className="btn btn-primary" data-dismiss="modal">닫기</button>
                </div>
            </div>
        </div>
    </div>);
}

export default Logout;