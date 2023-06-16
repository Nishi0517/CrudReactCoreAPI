import React, { useState } from "react";
import Header from "./Header";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [error, setError] = useState(false);
    const handleEmailChange = (event) => {
      setEmail(event.target.value);
    };
  
    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    };
  
    // async function login(event) {

    //     event.preventDefault();
    //     try {
    //       const response = await axios.post("https://localhost:7157/api/Student/Login", {
    //         email: email,
    //         password: password,
    //         role: role,
    //       });
      
    //       if (response.status === 200 && response.data) {
    //         // Successful login
    //         toast.success("Login successful!");
    //       } else {
    //         // Invalid credentials
    //         toast.error("Invalid email or password");
    //       }
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   }
    async function login(event) {
        checkValidition();
        if(error==true) return;
        event.preventDefault();
     
          const response = await axios.post("https://localhost:7157/api/Student/Login", {
            email: email,
            password: password,
            role: role,
          });
          try {
           
            if (response.data.status === 200 && response.data.message=="Login successful") {
                
              toast.success("Login Successful!");
                if(response.data.role=="Admin")
                {
                   window.location.href="/Admin/UsersList"
                }
                else{

                }
            } else{
              toast.error("You have enter Incorrect Credentials!!");
            }
            
          } catch (error) {
            console.log(error);
          }
      }
      
     
      
       



    function checkValidition() {
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email == "") {
          toast.error("Email is required!!");
          setError(true);
          return;
        } else if (!email || !email.match(emailRegex)) {
          toast.error("Please enter a valid email address");
          setError(true);
          return;
        } else {
          setError(false);
        }
        if (password == "") {
          toast.error("Please enter Password");
          setError(true);
          return;
        } else {
          setError(false);
        }
      }
    return (
        <>
        <Header />
        <div>
          {/* Your component code */}
          <ToastContainer />
        </div>
      <div className="container mt-4">
        <h1>Login</h1>
        <form>
          <div className="form-group">
            <label>Email</label>
            <input
              type="text"
              className="form-control"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={handlePasswordChange}
            />
            <div className="form-group">
  <label className="text-danger fw-bold">Role *</label>
  <select
                      className="form-select"
                      value={role} // Set the value to the selectedCityId state
                      onChange={(e) => setRole(e.target.value)} // Update the selectedCityId state on change
                    >
                      <option value="">Select Role</option>
                      <option value="Admin">Admin</option>
    <option value="User">User</option>
                    </select>
</div>
          </div>
          <button className="btn btn-primary mt-4"  onClick={login}>
                    Login
                  </button>
        </form>
      </div>
      </>
    );
  }
  
  export default LoginPage;