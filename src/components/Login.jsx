/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState, useEffect } from "react";
import CopyToClipboard from './CopyToClipboard';

const Login = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
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

  const [toggleDemo, setToggleDemo] = useState(false)

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
    } catch (error) {
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

  const adminUsername = 'demo.admin_tiet@gmail.com'
  const password = 'tiet@2024'
  const studentUsername = 'demo.student_tiet@gmail.com'

  return (
    <div className="container">
      <h2 className="my-4">Login to continue to TIET-PMS</h2>
      <div className="d-flex gap-5">
        <div className="w-50">
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
                  placeholder="enter password here"
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

            <button type="submit" className="btn btn-primary w-25 my-2" disabled={isSubmitting}>{isSubmitting? <span>Logging in</span>:<span>Login</span>}</button>
          </form>
          <div>
            <button onClick={() => { setToggleDemo(!toggleDemo) }} className="mt-4 btn btn-outline-primary">{toggleDemo ? <span>Hide</span> : <span>Show</span>} demo accounts</button>
            <div className={`my-5  ${toggleDemo ? "" : "d-none"}`}>
              <h5 className="my-3">Since only colleges can register students in this placement portal, we have provided some demo accounts for you to test out our website.</h5>
              Admin Demo Username
              <CopyToClipboard text={adminUsername} />
              <br />
              Admin Demo Password
              <CopyToClipboard text={password} />
              <br />
              <br />
              Student Demo Username
              <CopyToClipboard text={studentUsername} />
              <br />
              Student Demo Password
              <CopyToClipboard text={password} />
            </div>
          </div>
        </div>
        <div className="w-50">
          <img className="w-100" src="loginImg.png" alt="login" />
        </div>
      </div>


    </div>
  )
}

export default Login