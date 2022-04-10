import React from "react";

import Logo from '../../components/Logo/Logo';
import Menus from "../../components/Menus/Menus";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import PerfectScrollbar from 'react-perfect-scrollbar'

const allMenus = [
    { name: 'Dashboard', icon: ['fas', 'layer-group'], to: '/dashboard', link: true },
    {
        name: 'Category 1',
        link: false,
        subLinks: [
            { name: 'Link 1', icon: ['far', 'bar-chart'], to: '/link', link: true },
            { name: 'Link 2', icon: ['far', 'address-book'], to: '/link', link: true },
            { name: 'Link 3', icon: ['fab', 'magento'], to: '/link', link: true },
            { name: 'Link 4', icon: ['fas', 'pager'], to: '/link', link: true },
        ]
    },
    {
        name: 'Category 2',
        link: false,
        subLinks: [
            { name: 'Link 1', icon: ['far', 'bar-chart'], to: '/link', link: true },
            { name: 'Link 2', icon: ['far', 'address-book'], to: '/link', link: true },
            { name: 'Link 3', icon: ['fab', 'magento'], to: '/link', link: true },
            { name: 'Link 4', icon: ['fas', 'pager'], to: '/link', link: true },
        ]
    },
]

const Sidebar = (props) => {
    const assignedClasses = ['Menu', 'd-flex', 'flex-column'];
    if (props.collapsed) {
        assignedClasses.push('Collapsed');
    }
    if (props.hoverable) {
        assignedClasses.push('Hoverable');
    }

    console.log('sidebar');
    return (
        <aside className={assignedClasses.join(' ')}>
            <div className="d-flex">
                <Logo />
                <button className="Toggle d-flex justify-content-center align-items-center" onClick={props.toggle}><FontAwesomeIcon icon={['fas', 'angles-right']} /></button>
            </div>
            <PerfectScrollbar className="pb-2 flex-grow-1">
                <Menus menus={allMenus} />
            </PerfectScrollbar>
        </aside >
    )
}

export default Sidebar;

