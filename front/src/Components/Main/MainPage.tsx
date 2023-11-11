import '../../css/login.css';
import mainLogo from '../../img/mainLogo.png';

function MainPage() {
  return (
    <>
      <div className='wrapper'>
        <div className='main_sidebar'>
          <div className='brand_link'>
            <span className='brand_text'>음주 측정 시스템</span>
          </div>
          <div className='sidebar'>
            <div>
              <div className='nav_item_title'>
                <span>운전자 관리</span>
              </div>
              <div className='nav_item_a'>
                <a href=''>
                  <span>운전자 관리</span>
                </a>
              </div>
              <div className='nav_item_title'>
                <span>코드 관리</span>
              </div>
              <div className='nav_item_a'>
                <a href=''>
                  <span>노선번호 관리</span>
                </a>
              </div>
              <div className='nav_item_a'>
                <a href=''>
                  <span>차량번호 관리</span>
                </a>
              </div>
              <div className='nav_item_title'>
                <span>이력 관리</span>
              </div>
              <div className='nav_item_a'>
                <a href=''>
                  <span>음주여부 확인대장</span>
                </a>
              </div>
              <div className='nav_item_a'>
                <a href=''>
                  <span>음주측정결과</span>
                </a>
              </div>
              <div className='nav_item_title'>
                <span>통계 관리</span>
              </div>
              <div className='nav_item_a'>
                <a href=''>
                  <span>음주측정(일별)</span>
                </a>
              </div>
              <div className='nav_item_a'>
                <a href=''>
                  <span>음주측정(월별)</span>
                </a>
              </div>
              <div className='nav_item_a'>
                <a href=''>
                  <span>음주측정(연별)</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className='main_content'>
          <div className='main_header_container'>
            <div className='maing_header_content'>
              <div>
                <img src={mainLogo} />
              </div>
              <div className='header_button_div'>
                <form action='' id='fmm'>
                  <button>로그아웃</button>
                </form>
              </div>
            </div>
          </div>
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
                        <tr>
                            <th>아이디</th>
                            <th>이름</th>
                            <th>생년월일</th>
                            <th>성별</th>
                        </tr>
                    </thead>
                </table>
          </div>
        </div>
      </div>
    </>
  );
}
export default MainPage;
