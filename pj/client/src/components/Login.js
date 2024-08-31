import axios from "axios";
import { useState } from "react";

const Login = ({setLoggedOn}) => {
    const [id, setId] = useState("admin");
    const [password, setPassword] = useState("admin");
    const warningText = document.getElementById('incorrectInput');

    const onLogin = () => {
        let serverURL = 'http://localhost:5000/';
        axios.post(serverURL + "login", { id, password }).then(function (response) {
            if (!response['data']) {
                warningText.classList.remove('d-none');
            } else {
                let beforeLogin = document.getElementsByClassName('beforeLogin');
                for(let i=0; i<beforeLogin.length; i++) {
                    beforeLogin[i].classList.add('d-none');
                };

                let afterLogin = document.getElementsByClassName('afterLogin');
                for(let i=0; i<afterLogin.length; i++) {
                    afterLogin[i].classList.remove('d-none');
                };

                setLoggedOn(true);
            }
        });
    };

    return (<>
        <div className="modal fade" id="loginModal">
            <div className="modal-dialog">
                <div className="modal-content">

                    <div className="modal-header">
                        <h4 className="modal-title">로그인</h4>
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>

                    <div className="modal-body">
                        <div className="beforeLogin">
                            ID: <input type="text"
                                name="id"
                                value={id}
                                onChange={(e) => {
                                    warningText.classList.add('d-none');
                                    setId(e.target.value);
                                }
                                }></input><br />
                            PW: <input type="password"
                                name="password"
                                value={password}
                                onChange={(e) => {
                                    warningText.classList.add('d-none');
                                    setPassword(e.target.value)
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        onLogin();
                                    }
                                }}></input>
                        </div>
                        <p className="afterLogin text-primary d-none" id="loginSuccessText">로그인 성공!</p>
                    </div>

                    <div className="modal-footer">
                        <p className="text-danger d-none" id="incorrectInput">아이디 혹은 비밀번호가 맞지 않습니다.</p>
                        <div className="beforeLogin">
                            <button type="button" className="btn btn-warning">가입</button>
                            <button type="button" className="btn btn-primary" onClick={onLogin}>로그인</button>
                        </div>
                        <div className="afterLogin d-none">
                            <button type="button" className="btn btn-danger" data-dismiss="modal">닫기</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </>);
}

export default Login;