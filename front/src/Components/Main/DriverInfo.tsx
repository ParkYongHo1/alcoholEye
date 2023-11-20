import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import MainHeader from './MainHeader';
import MainSide from './MainSide';
import '../../css/driverInfo.css';
import mainLogo from '../../img/mainLogo.png';
import axios from 'axios';
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
function DriverInfo() {
  const userNumber = useParams();
  console.log(userNumber.userUno);
  const [driverInfo, setDriverInfo] = useState<UserInfo>();
  useEffect(() => {
    axios
      .get(`driverInfo/${userNumber.userUno}`)
      .then((res) => {
        setDriverInfo(res.data.result[0]);
        console.log(res.data.result[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <div className='wrapper'>
        <div className='main_content'>
          <MainHeader></MainHeader>
          <MainSide></MainSide>
          <div className='content_header'>
            <div className='content_div'>
              <div className='content_title'>
                <h1>운전자 상세보기</h1>
              </div>
              <div className='content_categori'>
                <span>운전자 관리</span>
                <span> ➡️ </span>
                <span>운전자 관리</span>
                <span> ➡️ </span>
                <span>운전자 상세보기</span>
              </div>
            </div>
          </div>
          <div>
            <div className='driverInfo_container_top'>
              <div className='driverInfo_img_div'>
                <table>
                  <thead>
                    <tr className='driverInfo_table_tr'>
                      <th>
                        <div>
                          <img src={driverInfo?.image} alt='' />
                        </div>
                      </th>
                    </tr>
                  </thead>
                </table>
              </div>
              <div className='driver_info_container'>
                <table className='driverInfo_table'>
                  <thead>
                    <tr className='driver_table_tr'>
                      <th colSpan={5} rowSpan={5}>
                        운전자 정보
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className='driver_table_tr'>
                      <td className='dirverInfo_bold'>아이디</td>
                      <td>{driverInfo?.id}</td>
                      <td className='dirverInfo_bold'>이름</td>
                      <td>{driverInfo?.name}</td>
                    </tr>
                    <tr className='driver_table_tr'>
                      <td className='dirverInfo_bold'>생년월일</td>
                      <td>{driverInfo?.birth}</td>
                      <td className='dirverInfo_bold'>성별</td>
                      <td>{driverInfo?.gender}</td>
                    </tr>
                    <tr className='driver_table_tr'>
                      <td className='dirverInfo_bold'>노선</td>
                      <td>{driverInfo?.address}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DriverInfo;
