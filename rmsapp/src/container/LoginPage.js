import * as React from "react";
import { useNavigate } from "react-router-dom";
import { loginURL } from  "../Constants/ApiConfig";

function LoginPage({ toggleAuthenticationFlag, setUser ,setPage }) {
  const [data, setData] = React.useState({
    email: "",
    password: "",
  });
  setPage('Resource Management System');
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
          //based on role redirect
          if(res.data.Role=="Manager")
           navigate("/StaffDashboard");
           else
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
    <div style={{  height: "80vh" }}>
   
    
              <div className="login">
                <h3 >Sign in</h3>
                <form onSubmit={submitHandler}>
                  <div >
                    
                  <span >
                      Email     
                    </span>
                    <br/>
                    <input
                      type="text"
                      name="email"
                      
                      value={email}
                      required
                      placeholder=" Email Address"
                      onChange={changeHandler}
                    />
                    
                  </div>
                  <br/>
                  <div >
                    
                  <span >
                      Password   
                    </span>
                    <br/>
                    <input
                      type="password"
                      name="password"
                      value={password}
                      placeholder=" Password"
                      required
                      minLength={8}
                      onChange={changeHandler}
                    />
                  </div>
                  <div>
                    <input
                      type="submit"
                      name="submit"
                      className="btn"
                    />
                  </div>
                </form>
                {
                  <div className="error-msg">
                    {error}
                  </div>
                }
              </div>
            </div>
          
   
  );
}

export default LoginPage;
