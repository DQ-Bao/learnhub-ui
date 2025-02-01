import { useEffect, useState } from "react";
import { API } from "../api";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

export default function ResetPassword() {
    const { token } = useParams();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [display, setDisplay] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (password.length > 0 && confirmPassword.length > 0 && password === confirmPassword) {
            setDisplay(true);
        } else {
            setDisplay(false);
        }
    }, [password, confirmPassword]);

    const handleSubmit = async () => {
        try {
            const resp = await API.post("/auth/reset-password", { password, token });
            if (resp.status === 200) {
                toast.success("Reset password successfully.");
                navigate("/login");
            } else {
                throw new Error("Something went wrong.");
            }
        } catch (err) {
            toast.error((err as Error).message);
            setPassword("");
            setConfirmPassword("");
        }
    };

    return (
        <div className="account-form">
            <div className="account-head" style={{ backgroundImage: "url(/assets/images/background/bg2.jpg)" }}>
                <a href="/">
                    <img src="/assets/images/logo-white-2.png" alt="" />
                </a>
            </div>
            <div className="account-form-inner">
                <div className="account-container">
                    <div className="heading-bx left">
                        <h2 className="title-head">
                            Set New <span>Password</span>
                        </h2>
                    </div>
                    <form className="contact-bx">
                        <div className="row placeani">
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <div className="input-group">
                                        <input
                                            type="password"
                                            placeholder="Your New Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="form-control"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <div className="input-group">
                                        <input
                                            type="password"
                                            placeholder="Confirm Password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className="form-control"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12 m-b30">
                                {display && (
                                    <button onClick={handleSubmit} type="button" className="btn button-md">
                                        Submit
                                    </button>
                                )}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
