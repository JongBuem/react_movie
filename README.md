# react_movie

홈페이지 : [https://JongBuem.github.io/react_movie](https://JongBuem.github.io/react_movie)

## **목차**

- [동작화면](#1-동작화면)
- [주요기능](#2-주요기능)
- [코드리뷰](#3-코드리뷰)
- [문제해결](#4-문제해결)
- [개선방안](#5-개선방안)
- [사용기술](#6-사용기술)

---

## **1. 동작화면**

## ![사본 -ezgif com-gif-maker (1)](https://user-images.githubusercontent.com/75786010/113018179-3809a480-91bb-11eb-9b84-487e7a833c4c.gif)

## **2. 주요기능**

- 메인 화면
- 영화 차트
- 영화 정보
- 영화 예약

---

## **3. 코드리뷰**

<br>

## 3-1. 라우터

> 라우터는 원하는 컴포넌트를 동시에 출력하고 따로 출력하기 위해서 이용하였습니다.<br> axios는 영화 API를 가져오는데 사용하여 영화정보가 필요한 라우터에 props 를 전달하였습니다.

```js
class App extends React.Component {
  state = {
    Loading: true, //영화 API 정보들을 가져오기전, 로딩중
    Movies: [], //영화정보 배열
  };

  getMovies = async () => {
    //axios가 url 영화정보를 받아올때 까지 실행
    const {
      data: {
        data: { movies },
      },
    } = await axios.get(
      "https://yts-proxy.now.sh/list_movies.json?sort_by=rating"
    ); //영화 정보를 가져오기 위한 작은 레이아웃
    this.setState({
      Movies: movies, //영화정보를 배열로 수정
      Loading: false, //영화정보를 가져오기 성공, 로딩 끝
    });
  };

  componentDidMount() {
    //render() 호출 이후 실행
    this.getMovies(); //영화정보를 가져오는 함수
  }

  render() {
    //원하는 컴포넌트들을 화면에 동시에 출력하거나 따로 출력하기 위한 라우터 이용
    const { Loading, Movies } = this.state; //영화정보와 로딩상황을 변수로 나타냄
    return (
      <HashRouter>
        <Navigation />
        <Route
          path="/movie"
          exact={true}
          render={() => <Moviechart movies={Movies} loading={Loading} />}
        />
        <Route
          path="/ticketing"
          render={() => <Ticketing movies={Movies} loading={Loading} />}
        />
        <Route
          path="/"
          exact={true}
          render={() => <Home movies={Movies} loading={Loading} />}
        />
        <Route path="/about" component={About} />
        <Route path="/movie/:id" exact={true} component={Detail} />
      </HashRouter>
    );
  }
}
// 라우터 컴포넌트에 props를 전달할때에 "component="를 사용하면 렌더링할때 마다 새로운 컴포넌트 생성한다 이를 개선하기위해서 "render="를 이용해봄
```

<br>

## 3-2. 메인 화면

> Home 컴포넌트는 라우터로 전달받은 영화정보를 movies.map()로 다시 배열로 반환하여 Boxoffice 컴포넌트로 전달합니다.<br>Boxoffice 컴포넌트는 영화 평점이 높은순으로 4개의 영화를 보여주고 해당 포스터를 클릭시 Link를 이용하여 영화정보(Detail) 컴포넌트로 이동합니다.

```js
//Home 컴포넌트
function Home(data) {
  //라우터에서 전달한 props를 인자로 받아옴
  const movies = data.movies; //영화정보 변수
  let loading = data.loading; //로딩상황 변수
  let boxoffice = []; //영화정보를 출력할 배열
  const movie = movies.map((
    movie //영화정보를 새로운배열로 취하고 배열을 반환
  ) => (
    <Boxoffice //Boxoffice 컴포넌트 호출
      key={movie.id} //영화정보의 id를 map의 key로 설정
      id={movie.id} //영화고유 id
      year={movie.year} //영화 개봉시기
      title={movie.title} //영화 제목
      summary={movie.summary} //영화 줄거리
      medium_cover_image={movie.medium_cover_image} //영화 포스터
      large_cover_image={movie.large_cover_image}
      genres={movie.genres} //영화 장르
      rating={movie.rating} //영화 평점
      runtime={movie.runtime} //영화 상영시간
    />
  ));

  for (let i = 0; i < 4; i++) {
    //메인홈에 보여줄 영화의 갯수
    boxoffice[i] = movie[i]; //갯수만큼 Boxoffice 컴포넌트를 저장
  }

  return (
    <section className="App">
      {loading ? (
        <div className="loading">
          {" "}
          <span className="loading_text">Loading...</span>{" "}
        </div>
      ) : (
        <div className="movies home">
          <h4 className="home_menu_title">박스오피스</h4>
          <Link to="/movie" className="addmovie">
            더 많은 영화보기 +
          </Link> {/*클릭시 무비차트 컴포넌트로 이동*/}
          {boxoffice} {/*갯수만큼 Boxoffice 컴포넌트를 호출*/}
        </div>
      )}
    </section>
  );
}

//Boxoffice 컴포넌트
let rank = 0; //평점순위
function Boxoffice({
  id,
  year,
  title,
  summary,
  medium_cover_image,
  genres,
  rating,
  runtime,
}) {
  rank = rank + 1; //평점순위 증가
  if (rank > 4) {
    //폄점순위를 4위까지만 보여줌
    rank = 1; //더이상 순위증가를 막기위한 초기화
  }

  return (
    <div className="Boxoffice">
      <Link
        to={{
          pathname: `/movie/${id}`,
          state: {
            year: year,
            title: title,
            summary: summary,
            medium_cover_image: medium_cover_image,
            genres: genres,
            rating: rating,
            runtime: runtime,
          },
        }}
        className="movie_link"
      >
        <div className="movie_rank">{rank}</div> {/*영화 평점순위*/}
        <img src={medium_cover_image} alt={title} title={title}></img>{" "}
        {/*영화 포스터*/}
      </Link>{" "}
      {/*클릭시 영화정보 컴포넌트로 이동하면서 영화정보를 전달*/}
      <div className="Boxoffice_menu">
        <div className="good">
          <i className="far fa-heart"> {id}</i>{" "}
          {/*영화 좋아요 갯수를 id로 임시 출력*/}
        </div>
        <Link to="/ticketing">예매</Link> {/*클릭시 예매 컴포넌트로 이동*/}
      </div>
    </div>
  );
}
```

<br>

## 3-3. 영화 차트

> Moviechart 컴포넌트는 라우터로 전달받은 영화정보를 movies.map()로 다시 배열로 반환하여 Movie 컴포넌트로 전달합니다.<br>Movie 컴포넌트는 전달받은 영화정보를 바탕으로 화면에 간략한 영화정보를 출력하며, 클릭시 Link를 이용하여 영화정보(Detail) 컴포넌트로 이동합니다.

```js
//Moviechart 컴포넌트
function Moviechart(data) {
  //라우터에서 전달한 props를 인자로 받아옴
  const movies = data.movies; //영화정보 변수
  let loading = data.loading; //로딩상황 변수

  return (
    <section className="App">
      {loading ? (
        <div className="loading">
          <span className="loading_text">Loading...</span>
        </div>
      ) : (
        <div className="movies">
          {movies.map((movie) => (
            <Movie
              key={movie.id}
              id={movie.id}
              year={movie.year}
              title={movie.title}
              summary={movie.summary}
              small_cover_image={movie.small_cover_image}
              medium_cover_image={movie.medium_cover_image}
              large_cover_image={movie.large_cover_image}
              genres={movie.genres}
              rating={movie.rating}
              runtime={movie.runtime}
            />
          ))}
        </div>
      )}
    </section>
  );
}

//Movie 컴포넌트
let rank = 0; //평점순위
function Movie({
  id,
  year,
  title,
  summary,
  medium_cover_image,
  genres,
  rating,
  runtime,
}) {
  rank = rank + 1; //평점순위 증가
  if (rank > 20) {
    //폄점순위를 20위 까지만 보여줌
    rank = 1; //더이상 순위증가를 막기위한 초기화
  }

  let _title = title; //영화 제목
  if (_title.length > 24) {
    //영화 제목이 24글자가 넘으면
    _title = <span>{title.slice(0, 24)}...</span>; //24글자 뒤에는 ... 으로 표시
  }

  return (
    <div className="movie">
      <Link
        to={{
          pathname: `/movie/${id}`,
          state: {
            year: year,
            title: title,
            summary: summary,
            medium_cover_image: medium_cover_image,
            genres: genres,
            rating: rating,
            runtime: runtime,
          },
        }}
        className="movie_link"
      >
        <div className="movie_rank">{rank}</div> {/*영화 평점순위*/}
        <img src={medium_cover_image} alt={title} title={title}></img>{" "}
        {/*영화 포스터*/}
      </Link>{" "}
      {/*클릭시 영화정보 컴포넌트로 이동하면서 영화정보를 전달*/}
      <div className="movie_main_title">
        {" "}
        {/*간단한 영화 정보, 제목, 평점, 개봉일*/}
        <h1 className="movie_title">{_title}</h1>
        <h5 className="movie_rating_year">
          평점:{rating}점 | 개봉일 : {year}
        </h5>
      </div>
    </div>
  );
}
```

<br>

## 3-4. 영화 정보

> Detail 컴포넌트는 전달받은 영화정보를 자세하게 출력하고 있습니다.<br>영화의 정보를 받아오지 않고 해당 페이지를 여는것을 방지하기 위해 조건문(if)를 이용하여 올바른 접근 방법을 구현 하였습니다.

```js
function Detail({ location, history }) {
  //영화정보와 페이지 history를 인자로 가져옴
  if (location.state === undefined) {
    //영화포스터를 클릭하지 않고 해당주소로 이동할때
    history.push("/"); //메인페이지로 이동시킴, 전달받은 영화정보가 없기 때문
  }
  if (location.state) {
    //영화정보가 전달 됬다면
    let title = location.state.title; //영화 제목
    let genre = location.state.genres; //영화 장르
    let summary = location.state.summary; //영화 줄거리
    let image = location.state.medium_cover_image; //영화 포스터
    let rating = location.state.rating; //영화평점
    let year = location.state.year; //영화 개봉시기
    let runtime = location.state.runtime; //영화 상영시간
    return (
      <div className="movie_data">
        <img src={image}></img>
        <div className="movie_data_info">
          <h3 className="movie_data_title">{title}</h3>
          <div className="data_box">
            <ul>
              장르
              {genre.map((genre, index) => (
                <li key={index}> - {" " + genre}</li>
              ))}
            </ul>
            <ul>
              <li>개봉 : {year} 년</li>
              <li>평점 : {rating}</li>
              <li>{runtime}분</li>
            </ul>
          </div>
          줄거리
          <div className="movie_data_summary">{summary}</div>
        </div>
      </div>
    );
  } else {
    return null; // 영화정보가 전달 되지 않을때 에러 발생을 방지
  }
}
```

<br>

## 3-5. 영화 예매

> 영화를 예매하기 위한 "영화선택", "날짜" 메뉴를 구분하였습니다.<br>Calendar API를 이용하여 달력을 구현하였습니다.

```js
let _calendar = <Calendar />; //켈린더 API
let today = new Date(); //현재 시간, 날짜 정보
let _year = today.getFullYear(); //년도
let _month = today.getMonth() + 1; //월
let _date = today.getDate(); //몇일
let _date_1 = today.getDate(); //켈린더가 선택한 일과 비교하기 위한 변수
let _day = today.getDay(); //요일
let _day_1 = today.getDay(); //켈린더가 선택한 요일과 비교하기 위한 변수
let _ticketingmovie_time_title = "영화를 선택해 주세요."; //영화 선택전 제목
let _ticket = null; //매표 출력

const Day_1_Array = ["오늘", "오늘", "오늘", "오늘", "오늘", "오늘", "오늘"]; //오늘 배열
const Day_2_Array = ["일", "월", "화", "수", "목", "금", "토"]; //요일 배열
_day = Day_1_Array[_day]; //현재는 오늘이기 때문에 오늘배열 출력

function Ticketingmovieposter({ title, small_cover_image }) {
  //영화정보를 인자로 받아옴
  let _title = title; //영화 제목
  if (_title.length > 20) {
    //영화제목이 20글자가 넘으면
    _title = <span>{title.slice(0, 20)}...</span>; //20글자이후는 ...으로 표시
  }
  return (
    //해당영화를 클릭시 영화제목을 전역변수의 영화제목으로 변경
    <div className="Ticketinposter">
      <Link
        to="/ticketing"
        className="Ticketinposter"
        onClick={function () {
          _ticketingmovie_time_title = title;
        }.bind(this)}
      >
        <img src={small_cover_image} className="Ticketinposter"></img>
        <h4>{_title}</h4>
      </Link>
    </div>
  );
}

function Ticketing(data) {
  //라우터에서 전달한 props를 인자로 받아옴
  const [state, setState] = useState({ mode: "off", ticket: "off" }); //켈린더 와 매표의 초기모드
  const [times, setTimes] = useState({
    count: 0, //몇관
    time: [
      //상영시간
      { when: "10:30", where: "1관" },
      { when: "11:30", where: "2관" },
      { when: "12:00", where: "3관" },
      { when: "12:50", where: "14관" },
      { when: "14:30", where: "10관" },
      { when: "17:00", where: "7관" },
      { when: "19:23", where: "6관" },
      { when: "20:00", where: "10관" },
      { when: "21:10", where: "5관" },
      { when: "22:10", where: "1관" },
      { when: "23:30", where: "6관" },
    ],
  });
  const time = times.time;
  const movies = data.movies;

  const toggle = () => {
    //날짜 선택, 켈린더 이미지 클릭시
    if (state.mode === "on") {
      //켈린더 모드가 on일경우
      _calendar = (
        <Calendar
          onSelect={function (date: moment[]) {
            //켈린더 API를
            let _today = date._d; //켈린더가 선택한 날짜의 데이터의
            _year = _today.getFullYear(); //연도
            _month = _today.getMonth() + 1; //월
            _date = _today.getDate(); //일
            _day = _today.getDay(); //요일
            if (_day === _day_1 && _date === _date_1) {
              //오늘 [요일,일] 과 선택한 [요일,일] 이 같으면
              _day = Day_1_Array[_day]; //켈린더의 요일을 오늘로 변경
            } else {
              //그렇지 않다면
              _day = Day_2_Array[_day]; //켈린더의 해당 요일로 변경
            }
          }}
        />
      );
      setState({ ...state, mode: "off", ticket: "off" }); //켈린더와 티켓 모드를 off으로 변경
    } else if (state.mode === "off") {
      //켈린더 모드가 off일경우
      setState({ ...state, mode: "on", ticket: "on" }); //켈린더와 티켓 모드를 on으로 변경
      _calendar = null; //켈린더를 지움
    }
  };

  if (state.ticket === "on") {
    //매표의 모드가 on일 경우
    _ticket = ( //"_ticket"은 매표정보를 출력
      <div className="movie_ticket">
        <span>매표</span>
        <div>영화 : {_ticketingmovie_time_title}</div>
        <div>
          날짜 : {Number(_year)}. {Number(_month)}. {Number(_date)}(
          {String(_day)})
        </div>
        <div>
          시간 : {time[times.count].when} ({time[times.count].where})
        </div>
      </div>
    );
  } else if (state.ticket === "off") {
    //매표의 모드가  off일 경우
    _ticket = null; //매표정보를 지움
  }

  return (
    <div className="ticketing">
      <div className="ticketing_topmenu">
        <div className="ticketing_movie own">
          {" "}
          {/* 영화선택 메뉴 */}
          <div className="ticketingmovie">영화 선택</div>
          <div data={data} className="ticketingmovie_poster">
            {movies.map((movie) => (
              <Ticketingmovieposter
                key={movie.id}
                title={movie.title}
                small_cover_image={movie.small_cover_image}
              />
            ))}
          </div>
        </div>

        <div className="ticketing_movie">
          {" "}
          {/* 상영시간, 날짜, 메표 정보 메뉴 */}
          <div className="ticketingmovie" onClick={toggle}>
            {Number(_year)}. {Number(_month)}. {Number(_date)}({String(_day)})
          </div>
          <i className="far fa-calendar-alt" onClick={toggle}></i>
          <div className="ticketingmovie_calendar">
            <button onClick={toggle}>{_calendar}</button>
            <div data={data} className="ticketingmovie_time">
              {_ticketingmovie_time_title}
              <div className="twoD">2D</div>
              <div className="ticketingmovie_time_info">
                <div className="_time_info_1">
                  <div
                    onClick={() => {
                      setTimes({ ...times, count: 0 });
                    }}
                  >
                    {time[0].when}
                    <span>{time[0].where}</span>
                  </div>
                  <div
                    onClick={() => {
                      setTimes({ ...times, count: 1 });
                    }}
                  >
                    {time[1].when}
                    <span>{time[1].where}</span>
                  </div>
                  <div
                    onClick={() => {
                      setTimes({ ...times, count: 2 });
                    }}
                  >
                    {time[2].when}
                    <span>{time[2].where}</span>
                  </div>
                </div>
                <div className="_time_info_1">
                  <div
                    onClick={() => {
                      setTimes({ ...times, count: 3 });
                    }}
                  >
                    {time[3].when}
                    <span>{time[3].where}</span>
                  </div>
                  <div
                    onClick={() => {
                      setTimes({ ...times, count: 4 });
                    }}
                  >
                    {time[4].when}
                    <span>{time[4].where}</span>
                  </div>
                  <div
                    onClick={() => {
                      setTimes({ ...times, count: 5 });
                    }}
                  >
                    {time[5].when}
                    <span>{time[5].where}</span>
                  </div>
                </div>
                <div className="_time_info_1">
                  <div
                    onClick={() => {
                      setTimes({ ...times, count: 6 });
                    }}
                  >
                    {time[6].when}
                    <span>{time[6].where}</span>
                  </div>
                  <div
                    onClick={() => {
                      setTimes({ ...times, count: 7 });
                    }}
                  >
                    {time[7].when}
                    <span>{time[7].where}</span>
                  </div>
                  <div
                    onClick={() => {
                      setTimes({ ...times, count: 8 });
                    }}
                  >
                    {time[8].when}
                    <span>{time[8].where}</span>
                  </div>
                </div>
                <div className="_time_info_1">
                  <div
                    onClick={() => {
                      setTimes({ ...times, count: 9 });
                    }}
                  >
                    {time[9].when}
                    <span>{time[9].where}</span>
                  </div>
                  <div
                    onClick={() => {
                      setTimes({ ...times, count: 10 });
                    }}
                  >
                    {time[10].when}
                    <span>{time[10].where}</span>
                  </div>
                </div>
              </div>
            </div>
            {_ticket}
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

## **4. 문제해결**

- 영화정보가 필요한 컴포넌트에 매번 axios작성하고 불러오는 것을 한번만 작성 하고 싶었습니다.<br>그래서 App.js에서 한번작성하고 영화정보를 필요로 하는 연결된 모든 라우터들에게 영화정보를 props의 형태로 전달 하였습니다.

<br>

- axios로 불러오는 시간을 기다리기 위해서 callback함수와 state의 모드를 지정하여 영화정보를 가져오는 시간에 다른 화면이 나오도록 하였습니다.

<br>

- 영화정보들을 하나씩 화면에 출력하기 위해서는 Component를 여러번 출력해야 하는 귀찮음을 줄이고 싶었습니다.<br>배열의 내장함수 map을 이용하여 반복적인 작성을 줄였고, 영화정보에 직접적으로 관여하지 않고 새로운 배열을 반환하므로서 immutable을 지킬 수 있었습니다.

<br>

- 포스터를 클릭시 원하는 페이지로 이동과 동시에 필요한 정보를 같이 전달 하기 위해서 Link를 이용 하였습니다.<br>Link는 to 를 통해서 원하는 페이지로 이동과 동시에 오브젝트로 변환하여 원하는 정보를 전달 할 수 있었습니다.

<br>

- 함수형 컴포넌트에서도 state값을 이용하여 이벤트를 발생 시키고 싶었습니다.<br>그래서 hooks를 이용하여 state관리 모두 가능한 함수형 컴포넌트를 생성하여 예약 컴포넌트에 다양한 이벤트를 추가 하였습니다.

---

## **5. 개선방안**

- 예약 컴포넌트에 반복된 구조를 간결하게 변환
- 이벤트와 할인 화면 추가

---

## **6. 사용기술**

<img width="150px" height="150px" src="https://user-images.githubusercontent.com/75786010/113030512-a4d76b80-91c8-11eb-96c7-0c6dd787b9aa.JPG"></img>
<img width="150px" height="150px" src="https://user-images.githubusercontent.com/75786010/113031495-c2590500-91c9-11eb-9b5a-9a1f667fe966.JPG"></img>
<img width="150px" height="150px" src="https://user-images.githubusercontent.com/75786010/104137565-20532900-53e1-11eb-8f6e-d39efeaf9285.JPG"></img>

---

### 실행환경

- [ ] Internet Explorer :poop:
- [x] Chrome :thumbsup:
- [x] Edge :thumbsup:
