import React, { useMemo, useState } from "react";

import Sidebar from '../../containers/Sidebar/Sidebar';
import Header from '../../containers/Header/Header';
import classes from './Layout.module.scss';

const Layout = (props) => {
    const [menuCollapsed, setMenuCollapsed] = useState(false);
    const [menuHover, setMenuHover] = useState(false);

    const toggleCollapse = () => {
        const newValue = !menuCollapsed;
        setMenuCollapsed(newValue);

        setTimeout(() => {
            setMenuHover(newValue);
        }, 500);
    }

    const assignedClasses = [classes.Main];
    if (menuCollapsed) {
        assignedClasses.push(classes.Collapsed);
    }

    console.log('layout');

    return (
        <main className={assignedClasses.join(' ')}>
            {useMemo(() => <Header collapsed={menuCollapsed} />, [menuCollapsed])}
            <Sidebar toggle={toggleCollapse} hoverable={menuHover} collapsed={menuCollapsed} />
            {props.children}
        </main>
    )
}

export default Layout;

