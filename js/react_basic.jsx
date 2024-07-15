const app = document.getElementById('app');
// function Header(props) {
//   console.log(props);
//   // { title:"React" }
//   // props를 부모 컴포넌트에서 자식 컴포넌트로 전달(단방향 데이터 흐름)
//   return <h1>Develop. Preview. Ship.</h1>;
// }

// props는 객체이므로 객체 분해를 사용할 수 있다
function Header({ title }) {
  console.log(title);
  // return <h1>title</h1>;
  // 이렇게 쓰면 안되고 변수라고 알려줘야 함 {} 
  return <h3>{title}</h3>;
  /** js표현식 모두 사용가능
  1. 점표기법을 사용한 객체속성
    function Header(props) {
      return <h1>{props.title}</h1>;
    }
  2. 템플릿리터럴
    function Header({ title }) {
      return <h1>{`Cool ${title}`}</h1>;
    }
  3. 함수반환값
    function createTitle(title) {
      if (title) {
        return title;
      } else {
        return 'Default title';
      }
    }
    function Header({ title }) {
      return <h1>{createTitle(title)}</h1>;
    }
  4. 삼항연산자
    function Header({ title }) {
      return <h1>{title ? title : 'Default Title'}</h1>;
    }
   */
}

function HomePage() {
  // 리스트 반복을 위해 데이터 추가
  const names = ['Ada Lovelace', 'Grace Hopper', 'Margaret Hamilton'];

  // 좋아요클릭이벤트
  function handleClick01() {
    console.log('increment like count');
  }
  function handleClick02() {
    // 컴포넌트 에서 상태 업데이터 함수를 호출
    setLikes(likes + 1);
  }

  // 훅을 활용하여 상호작용 구현, 배열분해 사용
  // const [state상태변수, 업데이트값에대한 함수] = React.useState();
  const [likes, setLikes] = React.useState(0); // 초깃값 반영
  /**
  첫 번째 함수 매개변수로 컴포넌트에 전달되는 props와 달리, state는 컴포넌트 내에서 초기화되고 저장됨. 자식 컴포넌트에 props로 state 정보를 전달할 수 있지만, state를 업데이트하는 로직은 state가 처음 생성된 컴포넌트 내에 유지해야한다.
  */

  return (
    // <div>
    <div className="main">
      <h1>리액트 레이아웃 구성하기</h1>
      <h2>헤더컴포넌트 삽입</h2>
      <Header title="React" />
      일반 HTML 요소에는 해당 요소의 동작을 변경하는 정보를 전달하는 데 사용할 수 있는 속성attribute이 있다.
      React에는 구성 요소에 정보 조각을 속성attribute으로 전달할 수 있다.

      props를 통한 전달이 자유로워지니, 값에 할당할 문자열만 바꿔넘기면 된다.
      <Header title="이것도 별개로 넘어가네" />
      <Header title="title이 넘겨지니 값은 내맘대로!!" />

      <h2>반복문 표현하기</h2>
      {/* <ul>
        {names.map((name) => (<li>{name}</li>))}
      </ul>
      누락된 prop에 대한 경고있음 */}

      <ul>
        {names.map((name) => (<li key={name}>{name}</li>))}
      </ul>
      고유성이 보장된 이름을 사용하여 업데이트 안전하게 연결하기

      <h2>이벤트 처리하기</h2>
      <button onClick={handleClick01}>Like</button>
      클릭이벤트 처리

      <h2>훅(함수셋트)을 활용하여 상태관리해보기</h2>
      <button onClick={handleClick02}>Like({likes})</button>
      훅에 의해 카운터도 변경되며, 상태가 변경될 때마다 HomePage()에 대한 렌더링을 다시 한다.
    </div>
  );
}

const root = ReactDOM.createRoot(app);
// 컴포넌트 형식으로 렌더링하기
// root.render(<Header />);
root.render(<HomePage />);