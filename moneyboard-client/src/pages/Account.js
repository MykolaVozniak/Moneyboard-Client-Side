import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const Account = (props) => {
    const isLoggedIn = useSelector((state) => state.auth.user);
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        if (isLoggedIn) {
            fetch('https://localhost:44339/api/User/Info', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${isLoggedIn.Token}` // Додаємо токен до запиту
                }
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    setUserInfo(data); // Зберігаємо отриману інформацію у стані компоненту
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    }, [isLoggedIn]);

    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    }

    return (
        <div>
            {userInfo && (
                <div>
                    <h2>Інформація про користувача</h2>
                    <p>Ім'я: {userInfo.firstname}</p>
                    <p>Прізвище: {userInfo.lastname}</p>
                    {/* Додайте інші поля користувача */}
                </div>
            )}
        </div>

    );
};

export default Account;
