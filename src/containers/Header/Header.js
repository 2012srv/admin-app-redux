import React, { useContext, useState } from "react";

import classes from './Header.module.scss';
import { axiosAuth } from '../../hoc/withErrorHandler';

import * as api from '../../context/authContext/apiCalls';
import { AuthContext } from '../../context/authContext/AuthContext';

import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import Modal from 'react-bootstrap/Modal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Header = (props) => {
    const { dispatch, user } = useContext(AuthContext);
    const [modalshow, setModalShow] = useState(false);

    const assignedClasses = [classes.Header, 'd-flex', 'justify-content-between', 'px-3'];
    if (props.collapsed) {
        assignedClasses.push(classes.Collapsed);
    }

    const doLogout = () => {
        setModalShow(true);
    }

    console.log('header');
    return (
        <>
            <Modal show={modalshow} onHide={() => setModalShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Logout!</Modal.Title>
                </Modal.Header>
                <Modal.Body>Do you want to logout now?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => api.logOff(dispatch, axiosAuth)}>
                        Yes
                    </Button>
                    <Button variant="primary" onClick={() => setModalShow(false)}>
                        No
                    </Button>
                </Modal.Footer>
            </Modal>
            <header className={assignedClasses.join(' ')} >
                <div className="d-flex align-items-center">header</div>
                <div className="d-flex align-items-center">
                    <Dropdown>
                        <Dropdown.Toggle bsPrefix={classes.DropdownHeaderUser + ' d-flex align-items-center'} id="dropdown-header-user">
                            {'Hi, ' + user.fullName.split(' ')[0]}
                            <FontAwesomeIcon className="ms-2" icon={['fas', 'angle-down']} size="sm" />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item>Action</Dropdown.Item>
                            <Dropdown.Item>Another action</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={doLogout}>Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                {/* <button onClick={doLogout}>Logout</button> */}
            </header>
        </>
    )
}

export default Header;

