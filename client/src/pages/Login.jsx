import React from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "../styles/RegisterStyle.css";
import axios from "axios"; // for newtwork call
import {useDispatch} from 'react-redux'
import { showLoading, hideLoading } from "../redux/features/alertSlice";

const Login = () => {
  const navigate=useNavigate()
  const dispatch = useDispatch()


  const onFinishHandler = async (value) => {
    // console.log(value);
    try {
      dispatch(showLoading())
      const res = await axios.post('/api/v1/user/login', value)
      window.location.reload()
      dispatch(hideLoading())
      if(res.data.success){
        //  generate token 
        localStorage.setItem("token", res.data.token);
        message.success("Login Successfully")
        navigate('/')

      }
      else{
        message.error(res.data.message)
      }
      
    } catch (error) {
      dispatch(hideLoading())
      console.log(error);
      message.error('Something went wrong')

      
    }

  };
  return (
    <>
      <div className="form-container">
        <Form
          className="register-form"
          layout="vertical"
          onFinish={onFinishHandler}
        >
          <h3 className="text-center">Login Form</h3>
          <Form.Item label="Email" name="email">
            <Input type="email" required />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" required />
          </Form.Item>
          <Link className="m-2" to="/register">
            Not a user Register here
          </Link>
          <button className="btn btn-primary" type="submit">
            Login
          </button>
        </Form>
      </div>
    </>
  );
};

export default Login;
