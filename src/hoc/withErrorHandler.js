import React, { useState, useEffect, useContext, useMemo } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { AuthContext } from '../context/authContext/AuthContext';
import { logOut } from "../context/authContext/AuthActions";

import axios from 'axios';
import jwt_decode from "jwt-decode";

export const axiosBase = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL
});

export const axiosAuth = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL
});

export const withErrorHandler = (WrappedComponent) => {
    return props => {
        const [error, setError] = useState(null);
        const { dispatch, user } = useContext(AuthContext);

        const reqInterceptor = axiosAuth.interceptors.request.use(
            async (req) => {
                setError(null);
                const accessToken = localStorage.getItem('token');
                const refreshToken = localStorage.getItem('refreshToken');
                // console.log(refreshToken);
                if (accessToken) {
                    const offsetTime = 2000;
                    let currentDate = Date.now() + offsetTime;
                    const decodedToken = jwt_decode(accessToken);
                    // console.log(decodedToken.exp * 1000);
                    if (decodedToken.exp * 1000 < currentDate) {
                        try {
                            const res = await axios.post(process.env.REACT_APP_BASE_URL + "auth/refresh", { token: refreshToken });
                            localStorage.setItem('token', res.data.accessToken);
                            req['headers']["token"] = "Bearer " + res.data.accessToken;
                        } catch (err) {
                            return Promise.reject(err);
                        }

                    } else {
                        req['headers']["token"] = 'Bearer ' + accessToken;
                    }
                }
                return req;
            }
        );

        const resInterceptor = axiosAuth.interceptors.response.use(
            res => {
                return res;
            },
            err => {
                const error = err.response ? err.response.data : err;
                setError(error);
                return Promise.reject(error);
            }
        );

        useEffect(() => {
            return () => {
                axiosAuth.interceptors.request.eject(reqInterceptor);
                axiosAuth.interceptors.response.eject(resInterceptor);
            };
        }, [reqInterceptor, resInterceptor]);

        const errorConfirmedHandler = () => {
            if (error.status === 403) {
                setError(null);
                localStorage.removeItem('token');
                localStorage.removeItem('refreshToken');
                dispatch(logOut());
            } else {
                setError(null);
            }
        };

        return (
            <>
                <Modal show={!!error && !!user} onHide={errorConfirmedHandler}>
                    <Modal.Header closeButton>
                        <Modal.Title>Error!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{error ? error.msg : null}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={errorConfirmedHandler}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
                {useMemo(() => <WrappedComponent {...props} />, [props])}
            </>
        );
    };
};
