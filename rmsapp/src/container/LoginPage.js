import * as React from "react";
import { useNavigate } from "react-router-dom";
import { loginURL } from  "../Constants/ApiConfig";

function LoginPage({ toggleAuthenticationFlag, setUser }) {
  const [data, setData] = React.useState({
    email: "",
    password: "",
  });
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();

  const { email, password } = data;

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    fetch(loginURL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message === "Success") {
          toggleAuthenticationFlag(true);
          setUser(res.data);
          navigate("/resource");
        }
        else{
          setError('Invalid email or password!')
        }
      })
      .catch((err) => {
        setError('Internal server error!')
      });
  };

  return (
    <div style={{ background: `url(${backgroundImg})`, height: "80vh" }}>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-10 col-md-7 col-lg-5">
            <div className="card" style={{ borderRadius: "15px" }}>
              <div className="card-body p-5">
                <h3 className="text-uppercase text-center mb-3">Sign in</h3>
                <form onSubmit={submitHandler}>
                  <div className="form-outline mb-3">
                    <input
                      type="text"
                      name="email"
                      className="form-control form-control-md"
                      value={email}
                      required
                      placeholder=" Email Address"
                      onChange={changeHandler}
                    />
                    <label className="form-label" htmlFor="form3Example1cg">
                      Email
                    </label>
                  </div>
                  <div className="form-outline mb-3">
                    <input
                      type="password"
                      name="password"
                      className="form-control form-control-md"
                      value={password}
                      placeholder=" Password"
                      required
                      minLength={8}
                      onChange={changeHandler}
                    />
                    <label className="form-label" htmlFor="form3Example1cg">
                      Password
                    </label>
                  </div>
                  <div className="d-flex justify-content-center">
                    <input
                      type="submit"
                      name="submit"
                      className="btn bg-pink btn-block btn-md"
                    />
                  </div>
                </form>
                {
                  <div className="error-message d-flex justify-content-center">
                    {error}
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
