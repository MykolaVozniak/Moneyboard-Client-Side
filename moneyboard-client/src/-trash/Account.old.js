import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const Account = (props) => {
    const user = useSelector((state) => state.auth.user);
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        if (user) {
            fetch('https://localhost:44339/api/User/Info', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${user.Token}`
                }
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data); // Тут ми можемо переглянути дані в консолі
                    setUserInfo(data); // Тут ми присвоюємо дані змінній userInfo
                })
                .catch(error => console.error('Error:', error));
        }
    }, [user]);

    if (!user) {
        return <Navigate to="/login" />;
    }

    return (
        <div>
            {userInfo && (
                <div>
                    <h2>Інформація про користувача</h2>
                    <p>Ім'я: {userInfo.Firstname}</p>
                    <p>Прізвище: {userInfo.Lastname}</p>
                </div>
            )}
        </div>

    );
};

export default Account;
