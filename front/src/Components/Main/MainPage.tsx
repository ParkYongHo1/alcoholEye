import '../../css/login.css';
import '../../css/main.css';
import MainSide from './MainSide';
import MainHeader from './MainHeader';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

interface UserInfo {
  uno: number;
  id: string;
  passwoed: string;
  name: string;
  address: string;
  image: string;
  birth: string;
  gender: string;
}
function MainPage() {
  const [copyUser, setCopyUser] = useState('');
  const { userNumber } = useParams();
  const navigate = useNavigate();
  const pageSize = 10; // 한 페이지당 표시할 사용자 수
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [usersForCurrentPage, setUsersForCurrentPage] = useState<UserInfo[]>(
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('test/allDriverInfo');
        const allDriverInfo = response.data.result;

        const totalPages = Math.ceil(allDriverInfo.length / pageSize);
        setTotalPages(totalPages);
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const usersForCurrentPage = allDriverInfo.slice(startIndex, endIndex);

        setUsersForCurrentPage(usersForCurrentPage);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [currentPage]);
  const handleNameClick = async (userNumber: number) => {
    try {
      await axios.post(`/drive/driverInfo/${userNumber}`);
      console.log('sf');

      navigate(`/drive/${userNumber}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className='wrapper'>
        <div className='main_content'>
          <MainSide></MainSide>
          <MainHeader></MainHeader>
          <div className='content_header'>
            <div className='content_div'>
              <div className='content_title'>
                <h1>운전자 관리</h1>
              </div>
              <div className='content_categori'>
                <span>운전자 관리</span>
                <span> ➡️ </span>
                <span>운전자 관리</span>
              </div>
            </div>
          </div>

          <div className='driver_list_container'>
            <table>
              <thead>
                <tr className='driver_table_tr'>
                  <th style={{ textAlign: 'center' }}>아이디</th>
                  <th style={{ textAlign: 'center' }}>이름</th>
                  <th style={{ textAlign: 'center' }}>생년월일</th>
                  <th style={{ textAlign: 'center' }}>성별</th>
                  <th style={{ textAlign: 'center' }}>노선</th>
                </tr>
              </thead>
              <tbody>
                {usersForCurrentPage.map((user: UserInfo) => (
                  <tr key={user?.uno} className='driver_table_tbody_tr'>
                    <td>{user.id}</td>
                    <td>
                      <span onClick={() => handleNameClick(user.uno)}>
                        {user.name}
                      </span>
                    </td>
                    <td>{user.birth}</td>
                    <td>{user.gender}</td>
                    <td>{user.address}</td>
                  </tr>
                ))}
              </tbody>
              <div className='button_container'>
                <div className='button_div'>
                  <button
                    className='page_button'
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    이전 페이지
                  </button>
                  <span>
                    {currentPage} / {totalPages}
                  </span>
                  <button
                    className='page_button'
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    다음 페이지
                  </button>
                </div>
              </div>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
export default MainPage;
