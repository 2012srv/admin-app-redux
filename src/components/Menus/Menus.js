import React from "react";

import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Menus = props => {
    const navLinkClasses = ['Navlink', 'd-flex', 'align-items-center', 'ripple'];

    const assignedClasses = ['Nav', 'mb-0'];

    return (
        <ul className={assignedClasses.join(' ')} >
            {
                props.menus.map((item, index) => {
                    return (
                        item.link ? <li key={index + '-' + item.name}>
                            <NavLink
                                to={item.to}
                                className={({ isActive }) =>
                                    isActive ? [...navLinkClasses, 'NavlinkActive'].join(' ') : navLinkClasses.join(' ')
                                }
                            >
                                <span className={'IconHolder'}><FontAwesomeIcon icon={item.icon} /></span>
                                <span className={'Text'}>{item.name}</span>
                            </NavLink>
                        </li> : <li key={index + '-' + item.name}>
                            <span className='Category d-flex align-items-center pt-2'>{item.name}</span>
                            <ul className="mb-0">
                                <Menus menus={item.subLinks} />
                            </ul>
                        </li>
                    )
                })
            }
        </ul>
    )
}
export default Menus;