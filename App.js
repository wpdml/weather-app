import { useEffect, useState, useCallback } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import WeatherBox from "./component/weatherBox";
import WeatherButton from "./component/weatherButton";
import BounceLoader from "react-spinners/BounceLoader";

// 1. 앱이 실행 되자마자 현재 위치 기반의 날씨가 보인다
// 2. 날씨정보에는 도시, 섭씨 화씨 날씨 상태
// 3. 5개의 버튼이 있다 (1개는 현재 위치, 4개는 다른 도시)
// 4. 도시버튼을 클릭할때 마다 도시별 날짜가 나온다
// 5. 현위치 버튼을 누르면 다시 현재 위치 기반의 날씨가 나온다
// 6. 데이터를 들고 오는 동안 로딩 스피너가 돈다

// 1. 유저가 current location 버튼을 누르면 다시 현재 위치 날씨를 볼 수 있다.
// 2. 유저가 버튼을 클릭하면 클린된 버튼이 표시 된다. 
// 3. try-catch를 이용한 api 호출 에러 핸틀링도 해보자.
// 4. 배경 바꾸기. 
// 5. 각 위치의 데이터 불러오기

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(true);
  
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "black",
  };

  const cities = ["paris", "new york", "tokyo", "seoul"];

  const getCurrentLocation = useCallback(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeatherByCurrentLocation(lat, lon);
    });
  }, []);

  const getWeatherByCurrentLocation = async (lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=dcad1eb1896fe450ecfa71a2ef6b99f4&units=metric`;
    setLoading(true);
    try {
      let response = await fetch(url);
      let data = await response.json();
      setWeather(data);
    } catch (error) {
      console.error("Failed to fetch weather data: ", error);
    } finally {
      setLoading(false);
    }
  };

  const getWeatherByCity = async () => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=dcad1eb1896fe450ecfa71a2ef6b99f4&units=metric`;
    setLoading(true);
    try {
      let response = await fetch(url);
      let data = await response.json();
      setWeather(data);
    } catch (error) {
      console.error("Failed to fetch weather data: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (city === "") {
      getCurrentLocation();
    } else {
      getWeatherByCity();
    }
  }, [city, getCurrentLocation]);

  return (
    <div>
      {loading ? (
        <div className="container">
          <BounceLoader
            color="#FFC0CB"
            loading={loading}
            cssOverride={override}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <div className="container">
          <WeatherBox weather={weather} />
          <WeatherButton cities={cities} setCity={setCity} />
        </div>
      )}
    </div>
  );
}

export default App;
