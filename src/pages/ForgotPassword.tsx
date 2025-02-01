import { useState } from "react";
import { API } from "../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            const resp = await API.post("/auth/forgot-password", { email });
            if (resp.status === 200) {
                toast.success("Check your email.");
                navigate("/");
            } else {
                throw new Error("Something went wrong.");
            }
        } catch (err) {
            toast.error((err as Error).message);
            setEmail("");
        }
    };

    return (
        <div className="account-form">
            <div className="account-head" style={{ backgroundImage: "url(assets/images/background/bg2.jpg)" }}>
                <a href="/">
                    <img src="assets/images/logo-white-2.png" alt="" />
                </a>
            </div>
            <div className="account-form-inner">
                <div className="account-container">
                    <div className="heading-bx left">
                        <h2 className="title-head">
                            Forget <span>Password</span>
                        </h2>
                        <p>
                            Login Your Account <a href="/login">Click here</a>
                        </p>
                    </div>
                    <form className="contact-bx">
                        <div className="row placeani">
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <div className="input-group">
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Your Email Address"
                                            required
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12 m-b30">
                                <button onClick={handleSubmit} type="button" className="btn button-md">
                                    Submit
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
