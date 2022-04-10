import React, { useContext, useEffect } from 'react';

import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';
import * as yup from 'yup';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { axiosBase } from '../../hoc/withErrorHandler';
import * as api from '../../context/authContext/apiCalls';
import { AuthContext } from '../../context/authContext/AuthContext';
import { Link } from 'react-router-dom';

// import withErrorHandler from '../../hoc/withErrorHandler';

const Login = (props) => {
    const { dispatch, error, isFetching } = useContext(AuthContext);
    const schema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().required(),
        // terms: yup.bool().required().oneOf([true], "term must be accepted"),
    });
    useEffect(() => {

    }, []);

    console.log('login');
    // const handleSubmit = ()

    return (
        <div className="login-wrapper p-4 rounded-3">
            <Formik
                validationSchema={schema}
                onSubmit={(values) => {
                    api.login(values, dispatch, axiosBase);
                }}
                initialValues={{
                    email: "2012srv@gmail.com",
                    password: "2012srv",
                    terms: false,
                }}
            >
                {({ handleSubmit, handleChange, values, touched, errors, isSubmitting }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <Form.Group md="" controlId="validationFormik01">
                            <Form.Label className='mb-1'>Email address</Form.Label>
                            <InputGroup hasValidation>
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={['far', 'envelope']} />
                                </InputGroup.Text>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    placeholder="Registered email address"
                                    value={values.email}
                                    onChange={(e) => handleChange(e)}
                                    isValid={touched.email && !errors.email}
                                    isInvalid={!!errors.email}
                                />
                                <Form.Control.Feedback tooltip type="invalid">
                                    {errors.email}
                                </Form.Control.Feedback>
                            </InputGroup>

                        </Form.Group>
                        <Form.Group controlId="validationFormik02" className="pt-2">
                            <Form.Label className='mb-1'>Password</Form.Label>
                            <InputGroup hasValidation>
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={['fas', 'lock']} />
                                </InputGroup.Text>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={values.password}
                                    onChange={handleChange}
                                    isInvalid={!!errors.password}
                                    isValid={touched.password && !errors.password}
                                />
                                <Form.Control.Feedback tooltip type="invalid">
                                    {errors.password}
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                        {error && <p className='mb-0 pt-2 text-danger'>{error.msg}</p>}
                        <div className='d-flex pt-3'>
                            <Button size="lg" type="submit" disabled={isFetching}>Login</Button>
                            <div className='justify-content-center flex-column d-flex ps-3'>
                                <Link to='/signup' className='py-1'>Register here</Link>
                                <Link to='/signup' className='py-1'>Forgot password?</Link>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default Login;