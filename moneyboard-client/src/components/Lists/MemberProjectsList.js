import { useSelector } from 'react-redux';
import config from '../../config';
import { useEffect, useState } from 'react';
import { Link} from 'react-router-dom';
import { HexagonFill } from 'react-bootstrap-icons';
import { useDispatch} from 'react-redux';
import { setProjectsExist } from '../../redux/authSlice';

const MemberProjectsList = () => {
    const [projects, setProjects] = useState([]);
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch(config.API_PROJECT_MEMBER_LIST, {
                    headers: {
                        'accept': '*',
                        'Authorization': `Bearer ${user.Token}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setProjects(data);
                    if (data.length !==0) {
                        dispatch(setProjectsExist(true));
                    }
                    //console.log(data);
                } else {
                    console.error('Error', response.statusText);
                }
            } catch (error) {
                console.error('Error', error);
            }
        };

        fetchProjects();
    }, []);

    return (
        <>
            {projects.length !== 0 && (
                <>
                    <h5>Member in:</h5>
                    <div>
                        <ul className='ps-2'>
                            {projects.map(project => (
                                <li key={project.ProjectId} className="list-unstyled">
                                    <Link to={`/project/${project.ProjectId}`} className="text-decoration-none text-light">
                                        <div className='ms-0 m-1'>
                                            <HexagonFill className='me-1 pb-1' size={23}></HexagonFill>
                                            <span className='fw-semibold'>{project.Name}</span>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </>
            )}
        </>
    );
};


export default MemberProjectsList;