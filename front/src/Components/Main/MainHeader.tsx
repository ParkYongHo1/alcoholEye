import mainLogo from '../../img/mainLogo.png';
import '../../css/mainHeader.css';
function MainHeader() {
  return (
    <>
      <div className='main_header_container'>
        <div className='maing_header_content'>
          <div
            onClick={() => {
              window.location.href = '/main';
            }}
          >
            <img src={mainLogo} style={{ cursor: 'pointer' }} />
          </div>
          <div className='header_button_div'>
            <form action='' id='fmm'>
              <button>로그아웃</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default MainHeader;
