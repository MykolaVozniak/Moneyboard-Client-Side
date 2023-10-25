import { useParams } from 'react-router';
import { Col, Container, Row } from "react-bootstrap";
import RolesNPoints from '../../../components/ProjectEditComponents/RolesNPoints';
import config from '../../../config';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const ProjectCreateStep2 = () => {
    const { projectId } = useParams();
    const user = useSelector((state) => state.auth.user);
    const [error, setError] = useState(null);

    useEffect(() => {
        const processSalary = async () => {
            try {
                const response = await fetch(`${config.API_PROJECT_PROCESS_SALARY}${projectId}`, {
                    method: 'POST',
                    headers: {
                        'accept': '*/*',
                        'Authorization': `Bearer ${user.Token}`,
                    },
                });
    
                if (response.ok) {
                } else {
                    const dataError = await response.json();
                    setError(dataError.error);
                    //console.log(dataError.error);
                }
            } catch (error) {
                setError(error);
                //console.log(error);
            }
        };
    
        processSalary();
    }, [projectId, user.Token]);

    return (
        <>
            <div className='h-100'>
                <Container className='h-100'>
                    <Row>
                        <Col xs={12} className='d-flex align-items-center justify-content-center'>
                            <Container className='bg-white border-0 rounded-4 shadow-lg px-5 py-4 mt-5 col-sm-12 col-md-5'>
                                <RolesNPoints projectId={projectId} buttonLink={`/project/${projectId}`}/>
                            </Container>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
};

export default ProjectCreateStep2;