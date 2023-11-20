import '../../css/mainSide.css';

function MainSide() {
  return (
    <>
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
              <a href='/main'>
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
    </>
  );
}

export default MainSide;
