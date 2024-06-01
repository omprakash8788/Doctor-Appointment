import React from "react";
import { Form, Input, message } from "antd";
import "../styles/RegisterStyle.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // for newtwork call
import {useDispatch} from 'react-redux'
import { showLoading, hideLoading } from "../redux/features/alertSlice";


const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()


  //form handler
  const onFinishHandler = async (value) => {
    // console.log(value);
    try {
      dispatch(showLoading())
      const res = await axios.post("/api/v1/user/register", value);
      dispatch(hideLoading())
      if (res.data.success) {
        message.success("Register Successfully");
        navigate("/login");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading())
      console.log(error);
      message.error("Something Went Wrong");
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
          <h3 className="text-center">Register Form</h3>
          <Form.Item label="Name" name="name">
            <Input type="text" required />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input type="email" required />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" required />
          </Form.Item>
          <Link className="m-2" to="/login">
            Already user login here
          </Link>
          <button className="btn btn-primary" type="submit">
            Register
          </button>
        </Form>
      </div>
    </>
  );
};

export default Register;



