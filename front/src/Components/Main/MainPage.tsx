import '../../css/login.css';
import MainSide from './MainSide';
import MainHeader from './MainHeader';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

interface UserInfo {
  userId: string;
  userPasswoed: string;
  userName: string;
  userBirth: string;
  userGender: string;
  userRoute: string;
  userNum: number;
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
    // 기존의 데이터 로딩 코드를 페이징을 고려하여 수정
    const fetchData = async () => {
      try {
        const response = await axios.get('test/allDriverInfo');
        const allDriverInfo = response.data.result;

        const totalPages = Math.ceil(allDriverInfo.length / pageSize);
        setTotalPages(totalPages);

        // 페이지당 사용자 수에 따라 데이터를 나누어 가져오기
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
      await axios.post(`/test/driverInfo/${userNumber}`);
      console.log('sf');

      navigate(`/driverInfo/${userNumber}`);
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
          <div className='driver_list_div'>
            <div className='driver_list'>
              <span>운전자 리스트</span>
            </div>
            <div className='driver_search_div'>
              <div className='driver_search_title'>
                <span>이름</span>
              </div>
              <div className='driver_search_input'>
                <input type='text' />
              </div>
            </div>
          </div>
          <div className='driver_list_container'>
            <table>
              <thead>
                <tr className='driver_table_tr'>
                  <th>아이디</th>
                  <th>이름</th>
                  <th>생년월일</th>
                  <th>성별</th>
                  <th>노선</th>
                </tr>
              </thead>
              <tbody>
                {usersForCurrentPage.map((user: UserInfo) => (
                  <tr key={user?.userNum} className='driver_table_tbody_tr'>
                    <td>{user.userId}</td>
                    <td>
                      <span onClick={() => handleNameClick(user.userNum)}>
                        {user.userName}
                      </span>
                    </td>
                    <td>{user.userBirth}</td>
                    <td>{user.userGender}</td>
                    <td>{user.userRoute}</td>
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
