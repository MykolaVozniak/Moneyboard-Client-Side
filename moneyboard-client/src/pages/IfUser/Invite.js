import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import config from "../../config";

const Invite = () => {

    const [error, setError] = useState(null);


    const navigate = useNavigate();


    const [projectInfo, setProjectInfo] = useState(null);
    const user = useSelector((state) => state.auth.user);
    const { projectId } = useParams();

    useEffect(() => {
        const fetchProjectInfo = async () => {
            try {
                const response = await fetch(`${config.API_PROJECT_INFO}${projectId}`, {
                    headers: {
                        'accept': '*/*',
                        'Authorization': `Bearer ${user.Token}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setProjectInfo(data);
                } else {
                    console.error('Error fetching project info:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching project info:', error);
            }
        };

        fetchProjectInfo();
    }, [projectId]);

    const handleApply = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${config.API_PROJECT_ADD_MEMBER}${projectId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json-patch+json',
                    'Authorization': `Bearer ${user.Token}`,
                },
            });

            if (response.ok) {
                setError(null);
                navigate(`/workspace`);
            } else {
                const dataError = await response.json();
                setError(dataError.error);
                console.error(dataError.error);
            }
        } catch (error) {
            console.error(error);
            setError(error);
        }
    };

    if (!projectInfo) {
        return <div>Loading...</div>;
    }

    if(projectInfo.IsOwner !== null){
        navigate(`/workspace`);
    }

    return (
        <div>
                                <h2>{projectInfo.Name}</h2>
        <p>Валюта проекту: {projectInfo.Currency}</p>
        <p>Базова зарплата: {projectInfo.BaseSalary}</p>
        <p>Дата виплати зарплати: {projectInfo.SalaryDate}</p>
          <button onClick={handleApply}>Apply</button>
          <button >Ignore</button>
        
      </div>
    );
};

export default Invite;