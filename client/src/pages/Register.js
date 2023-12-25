import React from "react";
import "../styles/RegiserStyles.css";
import { Form, Input, message} from "antd";
// import { UploadOutlined } from '@ant-design/icons';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //form handler
  const onfinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/register", values);
      dispatch(hideLoading());
      if (res.data.success) {
        message.success("Register Successfully!");
        navigate("/login");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something Went Wrong");
    }
  };


  // const normFile = (e) => {
  //   if (Array.isArray(e)) {
  //     return e;
  //   }
  //   return e && e.fileList;
  // };

  // const checkFile = (file) => {
  //   const isImage = file.type.startsWith('image/');
  //   if (!isImage) {
  //     message.error('You can only upload image files!');
  //   }
  //   return isImage;
  // };



  return (
    <>
      <div className="form-container ">
        <Form
          layout="vertical"
          onFinish={onfinishHandler}
          className="register-form"
        >
          <h3 className="text-center">Register From</h3>
          <Form.Item label="Name" name="name">
            <Input type="text" required />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input type="email" required />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" required />
          </Form.Item>


          {/* <Form.Item
        name="upload"
        label="Profile Picture"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        rules={[
          {
            required: true,
            message: 'Please upload your profile picture!',
          },
        ]}
      >
        <Upload
          name="avatar"
          listType="picture"
          maxCount={1}
          beforeUpload={checkFile}
          accept="image/*"
        >
          <Button icon={<UploadOutlined />}>Upload Profile Picture</Button>
        </Upload>
      </Form.Item> */}


          <Link to="/login" className="m-2">
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
