import React, { useState, useEffect } from 'react';

function ProjectInfoPage({ projectId }) {
  const [projectInfo, setProjectInfo] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    // Виконуємо запит для отримання інформації про проект при завантаженні компонента
    fetch(`https://localhost:44339/api/Project/info/${projectId}`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer YOUR_ACCESS_TOKEN', // Замініть на свій токен доступу
      }
    })
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error('Не вдалося отримати інформацію про проект.');
        }
      })
      .then(data => {
        setProjectInfo(data);
      })
      .catch(error => {
        setErrorMessage(error.message);
      });
  }, [projectId]);

  // Функція для виклику другого ендпоінта
  const handleAddMemberClick = () => {
    fetch(`https://localhost:44339/api/Project/add-member/${projectId}`, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer YOUR_ACCESS_TOKEN', // Замініть на свій токен доступу
      }
    })
      .then(response => {
        if (response.status === 200) {
          // Додатковий код, якщо запит був успішним
        } else if (response.status === 400) {
          return response.json();
        } else {
          throw new Error('Помилка при додаванні користувача до проекту.');
        }
      })
      .then(data => {
        if (data.error) {
          setErrorMessage(data.error);
        }
      })
      .catch(error => {
        setErrorMessage(error.message);
      });
  };

  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  if (projectInfo) {
    return (
      <div>
        <h2>{projectInfo.Name}</h2>
        <p>Валюта проекту: {projectInfo.Currency}</p>
        <p>Базова зарплата: {projectInfo.BaseSalary}</p>
        <p>Дата виплати зарплати: {projectInfo.SalaryDate}</p>
        {projectInfo.IsOwner && (
          <button onClick={handleAddMemberClick}>Додати користувача до проекту</button>
        )}
      </div>
    );
  }

  return <div>Завантаження інформації про проект...</div>;
}

export default ProjectInfoPage;