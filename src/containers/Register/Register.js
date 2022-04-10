import React, { useEffect, useState } from 'react';

import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { axiosBase } from '../../hoc/withErrorHandler';
import { Link } from 'react-router-dom';

const Register = () => {
    const [error, setError] = useState(null);
    let navigate = useNavigate();
    const schema = yup.object().shape({
        fullName: yup.string().required(),
        phone: yup.number().required(),
        email: yup.string().email().required(),
        password: yup.string().required(),
        passwordConfirmation: yup.string().required().oneOf([yup.ref('password'), null], 'Passwords must match'),
        terms: yup.bool().required().oneOf([true], "term must be accepted"),
    });

    const onRegister = async (values, { setSubmitting }) => {
        const { passwordConfirmation, terms, ...rest } = values;
        setError(null);
        try {
            const res = await axiosBase.post("auth/register", rest);
            setSubmitting(false);
            navigate("./login", { replace: true });
        } catch (e) {
            setSubmitting(false);
            setError(e);
        }
    }

    useEffect(() => {

    }, []);

    console.log('register');

    // const handleSubmit = ()

    return (
        <div className="login-wrapper p-4 rounded-3">
            <Formik
                validationSchema={schema}
                onSubmit={onRegister}
                initialValues={{
                    fullName: "",
                    phone: "",
                    email: "",
                    password: "",
                    passwordConfirmation: "",
                    terms: false,
                }}
            >
                {({ handleSubmit, handleChange, values, touched, errors, isSubmitting }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <Form.Group md="" controlId="validationFormik05">
                            <Form.Label className='mb-1'>Name</Form.Label>
                            <InputGroup hasValidation>
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={['far', 'user']} />
                                </InputGroup.Text>
                                <Form.Control
                                    type="text"
                                    name="fullName"
                                    placeholder="Full name"
                                    value={values.fullName}
                                    onChange={(e) => handleChange(e)}
                                    isValid={touched.fullName && !errors.fullName}
                                    isInvalid={!!errors.fullName}
                                />
                                <Form.Control.Feedback tooltip type="invalid">
                                    {errors.fullName}
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group md="" controlId="validationFormik06" className="pt-2">
                            <Form.Label className='mb-1'>Mobile</Form.Label>
                            <InputGroup hasValidation>
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={['fas', 'mobile-screen-button']} />
                                </InputGroup.Text>
                                <Form.Control
                                    type="text"
                                    name="phone"
                                    placeholder="Mobile no."
                                    value={values.phone}
                                    onChange={handleChange}
                                    isValid={touched.phone && !errors.phone}
                                    isInvalid={!!errors.phone}
                                />
                                <Form.Control.Feedback tooltip type="invalid">
                                    {errors.phone}
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group md="" controlId="validationFormik01" className="pt-2">
                            <Form.Label className='mb-1'>Email address</Form.Label>
                            <InputGroup hasValidation>
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={['far', 'envelope']} />
                                </InputGroup.Text>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    placeholder="Email address"
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
                        <Form.Group controlId="validationFormik03" className="pt-2">
                            <Form.Label className='mb-1'>Confirm Password</Form.Label>
                            <InputGroup hasValidation>
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={['fas', 'lock']} />
                                </InputGroup.Text>
                                <Form.Control
                                    type="password"
                                    name="passwordConfirmation"
                                    placeholder="Confirm Password"
                                    value={values.passwordConfirmation}
                                    onChange={handleChange}
                                    isInvalid={!!errors.passwordConfirmation}
                                    isValid={touched.passwordConfirmation && !errors.passwordConfirmation}
                                />
                                <Form.Control.Feedback tooltip type="invalid">
                                    {errors.passwordConfirmation}
                                </Form.Control.Feedback>
                            </InputGroup>

                        </Form.Group>
                        <Form.Group className="pt-3">
                            <Form.Check
                                required
                                name="terms"
                                label="Agree to terms and conditions"
                                onChange={handleChange}
                                isInvalid={!!errors.terms}
                                feedback={errors.terms}
                                id="validationFormik0"
                            />
                        </Form.Group>
                        {error && <p className='mb-0 pt-2 text-danger'>{error.msg}</p>}
                        <div className='d-flex pt-2'>
                            <Button size="lg" type="submit" disabled={isSubmitting}>
                                {isSubmitting && <FontAwesomeIcon icon={['fas', 'spinner']} spin size='xs' className='me-2' />}
                                Sign Up
                            </Button>
                            <div className='justify-content-center flex-column d-flex ps-3'>
                                <Link to='/login'>Login here</Link>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default Register;