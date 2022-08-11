import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { State } from './example';
import Navbar from './components/Navbar';
import Icon from './components/Icon';
import { BsSunFill, BsMoonFill, BsWind } from 'react-icons/bs';
import Footer from './components/Footer';
import Spinner from './components/Spinner'
const WKEY = '88776faebfa5cc484a2bd9136f5c2a6d'

function App() {


  const Temp = (x: number) => Math.floor((x - 273) * 10) / 10;
  // States
  const [res, setRes] = useState(State)
  const [err, setErr] = useState()
  const [country, setcountry] = useState('')
  const [lat, setLat] = useState(100)
  const [lon, setLon] = useState(100)
  const [theme, setTheme] = useState('dark')

  // Navigator
  navigator.geolocation.getCurrentPosition((arg) => {
    setLat(arg.coords.latitude);
    setLon(arg.coords.longitude);
  })
  // Get res from geolocation
  useEffect(() => {
    const Fetch = async () => {
      try {
        await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WKEY}`).then((res) => {
          setRes(res.data)
        });
      } catch (err) {
        console.log(err)
      }
    }
    Fetch()
  }, [lat, lon])
  // Get res from City name
  useEffect(() => {
    const Fetch = async () => {
      if (country === '') {
        return;
      } else {
        try {
          await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${WKEY}`).then(responce => {
            setRes(responce.data)
          }).catch(err => {
            setErr(err)
          })
        } catch (err) {
          console.log(err);
        }
      }
    }
    Fetch()
  }, [country])

  const toggleHandler = () => {
    if (theme === 'dark') {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.remove('bg-gray-900');
      console.log('light')
      setTheme('light');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.add('bg-gray-900');
      console.log('dark')
      setTheme('dark');
    }
  }

  return (
    <div className="App">
      <Navbar setCountry={setcountry} setTheme={setTheme} toggleHandler={toggleHandler} />
      {/* Cards */}
      <div className="w-full p-4 relative">
        <div className="flex flex-col backdrop-blur-md items-center my-4 bg-white rounded-lg border shadow-md md:flex-row w-9/12 sm:w-full dark:border-gray-700 dark:bg-gray-800">
          <div className="w-1/2 flex flex-col items-center">
            <div className="w-1/2 mb-1">
              {Icon(res.weather[0].main, theme)}
            </div>
            <div className="w-1/2">
              <h1 className="text-8xl dark:text-white" style={{ color: '#e6ff79' }}>{Temp(res.main.temp)} C</h1>
            </div>
          </div>
          <div className="relative p-4 leading-normal w-1/2">
            <h2 className="text-2xl dark:text-white text-gray-900">{res.name}</h2>
            {/* Table */}
            <div className="overflow-x-auto relative">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <tbody>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      Wind Speed
                      </th>
                    <td className="py-4 px-6">
                      {res.wind.speed}
                    </td>

                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      Time zone
                      </th>
                    <td className="py-4 px-6">
                      {res.timezone}
                    </td>

                  </tr>
                  <tr className="bg-white dark:bg-gray-800">
                    <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      Pressure
                      </th>
                    <td className="py-4 px-6">
                      {res.main.pressure}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* /Table */}
          </div>
        </div>


        <div className="flex dark:text-white text-gray-900 flex-col backdrop-blur-md items-center my-4 p-4 bg-white rounded-lg border shadow-md md:flex-row w-9/12 sm:w-full dark:border-gray-700 dark:bg-gray-800">
          <div className="w-1/2 flex flex-col items-center">
            <h1 className="text-6xl w-full flex items-center justify-center ">
              {<BsSunFill scale={10} fill={'#e6ff79'} />}
            </h1>
            <h1 className="text-[#e6ff79]">
              {Temp(res.main.temp_max)}
            </h1>
          </div>
          <div className="relative p-4 leading-normal w-1/2">
            <h1 className="text-2xl">
              in Day
            </h1>
          </div>
        </div>

        <div className="flex dark:text-white text-gray-900 flex-col backdrop-blur-md items-center my-4 p-4 bg-white rounded-lg border shadow-md md:flex-row w-9/12 sm:w-full dark:border-gray-700 dark:bg-gray-800">
          <div className="w-1/2 flex flex-col items-center">
            <h1 className="text-6xl w-full flex items-center justify-center ">
              {<BsMoonFill scale={10} fill={'#e6ff79'} />}
            </h1>
            <h1 className="text-[#e6ff79]">
              {Temp(res.main.temp_min)}
            </h1>
          </div>
          <div className="relative p-4 leading-normal w-1/2">
            <h1 className="text-2xl">
              in Evening
            </h1>
          </div>
        </div>

        <div className="flex dark:text-white text-gray-900 flex-col backdrop-blur-md items-center my-4 p-4 bg-white rounded-lg border shadow-md md:flex-row w-9/12 sm:w-full dark:border-gray-700 dark:bg-gray-800">
          <div className="w-1/2 flex flex-col items-center">
            <h1 className="text-6xl w-full flex items-center justify-center ">
              {<BsWind scale={10} fill={'#e6ff79'} />}
            </h1>
            <h1 className="text-[#e6ff79]">
              {res.wind.speed} m/s
            </h1>
          </div>
          <div className="relative p-4 leading-normal w-1/2">
            <h1 className="text-2xl">
              Wind Speed
            </h1>
          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
}

export default App;
