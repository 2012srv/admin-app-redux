import React, { useEffect } from "react";
import { axiosAuth } from '../../hoc/withErrorHandler';

const Dashboard = (props) => {
    console.log('dashboard');

    const fetchData = async () => {
        try {
            const res = await axiosAuth.get('users/find/62413a87c9ad66b525490bf3');
            console.log(res.data);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        // fetchData();
    }, []);

    return (
        <div>
            Dashboard
        </div>
    )
}

export default Dashboard;

