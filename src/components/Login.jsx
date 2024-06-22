/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState, useEffect } from "react";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/')
    }
  }, [])

  const host = 'https://tiet-pms-backend.vercel.app';

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`${host}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: data.email, password: data.password }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const json = await response.json()
    if (json.success) {
      //save the auth-token to local storage and redirect to home
      localStorage.setItem("token", json.authtoken)
      localStorage.setItem("user", json.user)
      toast.success('🎉 Logged in successfully!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      navigate("/")
    }
    else {
      toast.error('🚨 Invalid Credentials!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }  catch(error) {
    toast.error('🚨 Invalid Credentials!', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    console.error(error);
  }
}

return (
  <div className="container">
    <h2 className="my-4">Login to continue to TIET-PMS</h2>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
        <input
          type="email"
          className={`form-control w-100 ${errors.email ? 'is-invalid' : ''}`}
          id="exampleInputEmail1"
          placeholder="example123@example.com"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^\S+@\S+$/i,
              message: 'Invalid email format'
            }
          })}
        />
        {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
        <div className="input-group">
          <input
            type={showPassword ? 'text' : 'password'}
            className={`form-control ${errors.password ? 'is-invalid' : ''} w-75`}
            id="exampleInputPassword1"
            placeholder="Example123#"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters'
              },
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d).{8,}$/,
                message: 'Password must contain at least one letter and one number'
              }
            })}
          />
          <button
            type="button"
            className="btn d-flex align-items-center"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <FaEyeSlash className="me-2" /> : <FaEye className="me-2" />}
          </button>
        </div>
        {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
      </div>

      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  </div>
)
}

export default Login
