import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const AccountEdit = (props) => {
    const user = useSelector((state) => state.auth.user);

    if (!user) {
        return <Navigate to="/login" />;
    }

    return (
        <div>
            <h2>Edit</h2>
        </div>
    );
};

export default AccountEdit;
