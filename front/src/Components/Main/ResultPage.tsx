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
  bus_data: string;
  image: string;
  birth: string;
  gender: string;
  alcohol_data: string;
  reg_date: string;
}
function ResultPage() {
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
        console.log(response);
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
      await axios.get(`/drive/driverInfo/${userNumber}`);
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
                <h1>음주운전 측정 결과</h1>
              </div>
              <div className='content_categori'>
                <span>이력 관리</span>
                <span> ➡️ </span>
                <span>음주운전 측정 결과</span>
              </div>
            </div>
          </div>

          <div className='driver_list_container'>
            <table>
              <thead>
                <tr aria-colspan={7} className='driver_table_tr'>
                  <th colSpan={1} style={{ textAlign: 'center' }}>아이디</th>
                  <th colSpan={1} style={{ textAlign: 'center' }}>이름</th>
                  <th colSpan={1} style={{ textAlign: 'center' }}>생년월일</th>
                  <th colSpan={1} style={{ textAlign: 'center' }}>노선</th>
                  <th colSpan={1} style={{ textAlign: 'center' }}>측정결과</th>
                  <th colSpan={2} style={{ textAlign: 'center' }} >측정일시</th>
                </tr>
              </thead>
              <tbody>
                {usersForCurrentPage.map((user: UserInfo) => (
                  <tr key={user?.uno} className='driver_table_tbody_tr'>
                    <td colSpan={1} >{user.id}</td>
                    <td colSpan={1}>
                      <span onClick={() => handleNameClick(user.uno)}>
                        {user.name}
                      </span>
                    </td>
                    <td colSpan={1}>{user.birth}</td>
                 
                    <td colSpan={1}>{user.bus_data}</td>
                    <td colSpan={1}>{user.alcohol_data}</td>
                    <td colSpan={1}>{user.reg_date}</td>
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
export default ResultPage;
