import { useNavigate, useLocation } from 'react-router-dom';

const withRouter = (Component) => {
    return (props) => {
        const navigate = useNavigate();
        const location = useLocation();

        return (
            <Component
                navigate={navigate}
                location={location}
                {...props}
            />
        );
    };
};

export default withRouter;