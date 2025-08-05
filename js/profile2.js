const form = document.querySelector('form');
const submitButton = document.querySelector('#sendEmail');
const dimOverlay = document.querySelector('#dimOverlay');

const sendEmail = () => {
  // 스피너와 dim 화면 표시
  dimOverlay.classList.add('on');

  emailjs
    .sendForm('service_5cs4jon', 'runauxlabsTemplate', form, {
      publicKey: 'user_stJBqz5kKC5LyQt7X5M88',
    })
    .then(
      () => {
        // 스피너와 dim 화면 숨기기
        dimOverlay.classList.remove('on');
        alert(`${form.from_name.value}님, 메일 전송에 성공했습니다 :)`);
        // 폼 리셋
        form.reset();
      },
      (error) => {
        // 스피너와 dim 화면 숨기기
        dimOverlay.classList.remove('on');
        alert(`${form.from_name.value}님, 메일 전송에 실패했습니다 :(`);
        console.error('메일 전송 실패:', error);
      },
    );
};

// 버튼 클릭 시 sendEmail 함수 호출
submitButton.addEventListener('click', sendEmail);