# 🚔 alcoholEye

## 📝 개요
이번 산학 클러스터 프로젝트에서는 시민의 안전을 보장하고 음주운전을 사전에 방지하기 위해 보이스링크 회사에서 개발한 어플리케이션과 유사한 시스템을 구현했습니다. 이 시스템은 버스 운행 전 운전자의 음주 여부를 측정하여 안전 운전을 촉진하는 것을 목적으로 합니다.

## 🛠 개발 환경
<div align="center">
  <img src="https://github.com/user-attachments/assets/c9bcecbc-bb3a-4243-aca1-8c495b874150" alt="개발 환경">
</div>

## 🔄 흐름도
<div align="center">
  <img src="https://github.com/user-attachments/assets/227e4266-a3d6-4a54-b97f-fe8bf286f957" alt="프로젝트 흐름도">
</div>
프로젝트에서는 SSL 함수를 활용하여 안드로이드 애플리케이션과 서버 간의 통신을 보호했습니다. 또한, TensorFlow.js의 FaceAPI.js를 이용한 얼굴 인식 기능을 통해 사용자의 신원을 확인하며, BCrypt HASH 함수를 활용하여 비밀번호를 안전하게 암호화하여 저장했습니다.

## 📂 개발 내용
<div align="center">
  <img src="https://github.com/user-attachments/assets/b2f2407b-9e83-4c6b-8bc1-43bbb1170dfa" alt="개발 내용 1">
  <img src="https://github.com/user-attachments/assets/c5556110-4744-41a2-b22a-53ec5c0c1541" alt="개발 내용 2">
</div>

사진을 촬영하여 서버에 전송하면, 서버에서는 0.5% 이상의 차이가 있을 경우 '동일하지 않은 사람'으로 인식합니다. 반면, 0.5% 이하의 차이가 있을 경우 '동일한 사람'으로 인식됩니다. 만약 사진에 사람이 없을 경우에는 인식 불가 메시지가 출력됩니다.

<div align="center">
  <img src="https://github.com/user-attachments/assets/1c566e80-6723-4ed5-b6c8-07e65d960c21" alt="측정 데이터 전송">
</div>

동일한 사람으로 확인되면, 측정 데이터를 전송할 수 있으며, 이 데이터는 웹 서버에 저장되고, 웹사이트에 출력됩니다.

## 🌐 웹사이트 출력 화면
<div align="center">
  <img src="https://github.com/user-attachments/assets/6c2a5fa3-3d56-435e-ac18-c76a79c125ec" alt="웹사이트 출력 화면">
</div>

---

## 🧑‍💻 개발자 정보
- **프로젝트 팀**: 알콜아이
- **참여 개발자**: 전준호, 박용호,  문진호



