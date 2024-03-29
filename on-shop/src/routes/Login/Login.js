import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button/Button';
import Divider from '@material-ui/core/Divider';
import TextField from '../../components/TextField/TextField';

import './Login.css';

import { loginUser } from '../../store/auth/Auth.actions';

import * as Yup from 'yup';

const Login = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { error } = useSelector(state => state.auth);
    const [ isLoading, setIsLoding ] = useState(false);

    const handleLogin = async (credentials) => {
        try {
            setIsLoding(true);
            await dispatch(loginUser(credentials));
            setIsLoding(false);
            history.push('/');
        } catch(err) {
            setIsLoding(false);
        }
    }

    const loginSchema = Yup.object().shape({
        email: Yup.string()
        .email('Invalid email address')
        .required('email address is required'),

        password: Yup.string()
        .required('password is required')
    })

    return (
        <div className='app'>
            <div className='formComp'>
                <div className='formWrapper'>
                    <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={loginSchema}
                    validateOnBlur
                    onSubmit={async (values) => {
                        const { email, password } = values;
                        await handleLogin({ username: email, password });
                    }}
                    >
                        <Form className='baseForm'>
                            <header className='baseFormHeader'>
                                <h1 className='baseFormHeading'>Log in</h1>
                            </header>
                            <TextField
                            label='Email'
                            name='email'
                            id='email-input' 
                            />
                            <TextField
                            label='Password'
                            name='password'
                            id='password-input'
                            />
                            {
                                error && <div>{error}</div>
                            }
                            <Button variant='contained' color='primary' type='submit' isLoading={isLoading}>Submit</Button>
                            <p>Forgottend your passpword?</p>
                            <Divider />
                            <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                                <p>Sign in with</p>
                            </div>
                            <div className='social-btn-container'>
                                <Button variant="contained" className="google-btn" href="/api/auth/google">Goolge</Button>
                                <Button variant="contained" className="facebook-btn" href="/api/auth/facebook">Facebook</Button>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    );
}

export default Login;