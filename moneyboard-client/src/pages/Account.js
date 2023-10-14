import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const Account = (props) => {
    const isLoggedIn = useSelector((state) => state.auth.user);
    const info = useSelector((state) => state.auth.info);

    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    }

    return (
        <div>
            <h2>Інформація про користувача</h2>
            <p>Name: {info.Firstname}</p>
            <p>Email: {info.Email}</p>
        </div>
    );
};

export default Account;
