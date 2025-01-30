import React, { useEffect, useState } from 'react';
import { Form, Button, InputGroup, Card } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../slices/usersApiSlice';
import { setCredentials } from '../../slices/authSlice';
import { toast, ToastContainer } from 'react-toastify';
import FormContainer from '../../components/FormContainer';
import Meta from '../../components/Meta';
import Loader from '../../components/Loader';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector(state => state.auth);

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get('redirect') || '/admin/dashboard';

  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = async e => {
    e.preventDefault();
    try {
      const res = await login({ email, password, remember }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate('/admin/dashboard');
      toast.success('Login successful');
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
        <Meta title={'Admin Sign In'} />
        <FormContainer>
            <h1 className="mb-4 text-center text-primary">Admin Sign In</h1>
            <Form onSubmit={submitHandler}>
              <Form.Group className="mb-4" controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  placeholder="Enter your email"
                  onChange={e => setEmail(e.target.value)}
                  className="py-2 px-3"
                />
              </Form.Group>
              <Form.Group className="mb-4" controlId="password">
                <Form.Label>Password</Form.Label>
                <InputGroup>
                  <Form.Control
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    placeholder="Enter your password"
                    onChange={e => setPassword(e.target.value)}
                    className="py-2 px-3"
                  />
                  <InputGroup.Text
                    onClick={togglePasswordVisibility}
                    style={{ cursor: 'pointer' }}
                    className="bg-light"
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>
              <Form.Group className="mb-4" controlId="checkbox">
                <Form.Check
                  type="checkbox"
                  label="Keep me signed in."
                  checked={remember}
                  onChange={() => setRemember(!remember)}
                  className="py-2"
                />
              </Form.Group>
              <Button
                className="my-3 w-100 p-2"
                variant="primary"
                type="submit"
                disabled={isLoading}
                style={{
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  letterSpacing: '1px',
                  transition: 'background-color 0.3s ease',
                }}
                onMouseEnter={e => (e.target.style.backgroundColor = '#f0ad4e')}
                onMouseLeave={e => (e.target.style.backgroundColor = '')}
              >
                {isLoading ? <Loader /> : 'Sign In'}
              </Button>
            </Form>
        </FormContainer>
    </>
  );
};

export default AdminLoginPage;
