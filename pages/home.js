import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set } from "firebase/database";
import { useEffect, useState } from "react";
import LegacyImage from "next/legacy/image";
import profilePic from "../public/epichome.png";
import { FaChartPie } from "react-icons/fa";
import { FaSink } from "react-icons/fa";
import { FaWarehouse } from "react-icons/fa";
import { FaHeadset } from "react-icons/fa";
import { FaSlidersH } from "react-icons/fa";
import { FaLanguage } from "react-icons/fa";
import { FaBlender } from "react-icons/fa";
import { FaArrowCircleRight } from "react-icons/fa";

const firebaseConfig = {
  apiKey: "AIzaSyBQs225KxT8eXfOCw3RHuW_VoTfYkPtc7Y",
  authDomain: "arduino-b2dd1.firebaseapp.com",
  databaseURL: "https://arduino-b2dd1-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "arduino-b2dd1",
  storageBucket: "arduino-b2dd1.appspot.com",
  messagingSenderId: "212728881231",
  appId: "1:212728881231:web:e8d01de29d7634ee994a3a",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default function Home() {
  const [values, setValues] = useState(`Waiting`);

  let rgbStatus = false;
  let sensorStatus = false;
  let modus = 0;

  const Push = () => {
    set(ref(database, "values/"), {
      debugValue: values.debugValue,
      temp: values.temp,
      distanceCm: values.distanceCm,
      humidity: values.humidity,
      plateTemp: values.plateTemp,
      rgbStripStatus: rgbStatus ? 1 : 0,
      sensorStatus: sensorStatus ? 1 : 0,
      modus: modus,
    }).catch(alert);
  };

  useEffect(() => {
    let isTrue = false;

    if (!isTrue) {
      onValue(ref(database, `values`), (snapshot) => {
        const data = snapshot.val();
        if (data != values) {
          // console.log(data);
          setValues(data);
        } else {
          return;
        }
      });
    }
    return () => {
      isTrue = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   if (values.rgbStripStatus == 1) {
  //     setRgb(true);
  //   } else {
  //     setRgb(false);
  //   }
  //   console.log(rgb + ` rgb`);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [values.rgbStripStatus]);

  values.rgbStripStatus == 1 ? (rgbStatus = true) : (rgbStatus = false);
  console.log(rgbStatus);

  values.sensorStatus == 1 ? (sensorStatus = true) : (sensorStatus = false);
  console.log(sensorStatus);

  modus = values.modus;

  //   console.log(values);

  const rgbClick = () => {
    if (rgbStatus === true) {
      rgbStatus = false;
      Push();
    } else {
      rgbStatus = true;
      Push();
    }
    console.log(rgbStatus);
  };

  const sensorClick = () => {
    if (sensorStatus === true) {
      sensorStatus = false;
      Push();
    } else {
      sensorStatus = true;
      Push();
    }
    console.log(rgbStatus);
  };

  const modusClick = (n) => {
    if (rgbStatus) {
      modus = n;
      Push();
    }
  };

  return (
    <div className="bggrad flex flex-row h-screen w-screen overflow-hidden">
      {/* <div>{values.temp}</div>
      <div>{values.distanceCm}</div>
      <div>{values.humidity}</div>
      <div>{values.plateTemp}</div> */}
      <div className="min-w-[260px] max-w-[260px] h-[100vh - 16px] m-8  bg-white/80 rounded-3xl drop-shadow-md border-gray-200/60 border relative">
        <div className="text-black relative h-12 m-6">
          <LegacyImage src={profilePic} alt="Aaron, Xpress, Designer" priority={true} className="scale-90" />
        </div>
        <ul className="flex flex-col mt-16 text-gray-800 text-left text-lg ml-8">
          <il className="font-medium font-kanit border-r-4 my-3  opacity-60 hover:opacity-80 transition cursor-pointer hover:border-r-gray-400">
            <FaChartPie className="relative react-icons m-2 mr-8" size={`25px`} />
            Dashboard
          </il>
          <il className="font-normal font-kanit border-r-4 my-3  border-r-purple-800 ">
            <FaBlender className="relative react-icons m-2 mr-8 text-purple-800" size={`25px`} />
            Kitchen
          </il>
          <il className="font-normal font-kanit border-r-4 my-3 opacity-60  hover:opacity-80 transition cursor-pointer hover:border-r-gray-400">
            <FaSink className="relative react-icons m-2 mr-8" size={`25px`} />
            Bathroom
          </il>
          <il className="font-normal font-kanit  border-r-4 my-3 opacity-60  hover:opacity-80 transition cursor-pointer hover:border-r-gray-400">
            <FaWarehouse className="relative react-icons m-2 mr-8" size={`25px`} />
            Garage
          </il>
          <il className="font-normal font-kanit border-r-4 my-3 opacity-60  hover:opacity-80 transition cursor-pointer hover:border-r-gray-400">
            <FaSlidersH className="relative react-icons m-2 mr-8" size={`25px`} />
            Settings
          </il>
          <il className="font-normal font-kanit border-r-4 my-3 opacity-60  hover:opacity-80 transition cursor-pointer hover:border-r-gray-400">
            <FaLanguage className="relative react-icons m-2 mr-8" size={`25px`} />
            Language
          </il>
          <il className="font-normal font-kanit  border-r-4 my-3 opacity-60  hover:opacity-80 transition cursor-pointer hover:border-r-gray-400">
            <FaHeadset className="relative react-icons m-2 mr-8" size={`25px`} />
            Support
          </il>
        </ul>
        <div className="absolute bottom-0 w-full">
          <div className="w-[90%] mx-auto h-32 bg-gradient-to-r from-blue-500/60 to-violet-600/60 rounded-3xl m-3 ">
            <div className="mx-8 font-kanit pt-4 text-lg">Check all our other components</div>
            <FaArrowCircleRight className="relative react-icons mx-2 mr-8 float-right" size={`35px`} />
          </div>
        </div>
      </div>
      <div className=" w-[100vw] h-[100vh - 16px] grid-cols-12 grid-rows-7 grid mt-8 mb-8 mr-8 gap-8">
        <div className="col-span-8 font-kanit text-black text-6xl mt-2 font-semibold">Kitchen</div>
        <div className="col-span-4 font-kanit text-gray-700 mt-2 ">
          Showing:<span className="font-semibold"> Today</span>
        </div>
        <div className="col-span-4 row-span-3 bg-white/80 rounded-3xl text-black drop-shadow-md">
          <p className=" place-self-center text-8xl font-black drop-shadow-lg font-montserrat mt-20 mx-12">
            {values.temp}
            <span className="text-4xl">°C</span>
          </p>
          <p className=" font-bold text-3xl text-black/60 font-montserrat mx-12 mt-4">Ruimte</p>
        </div>
        <div className="col-span-4 row-span-3 bg-white/80  rounded-3xl text-black  drop-shadow-md">
          <p className=" place-self-center text-8xl font-black drop-shadow-lg font-montserrat mt-20 mx-12">
            {parseFloat(values.distanceCm).toFixed(0)}
            <span className="text-4xl">cm</span>
          </p>
          <p className=" font-bold text-3xl text-black/60 font-montserrat mx-12 mt-4">Afstand</p>
        </div>
        <div className="col-span-4 row-span-3 bg-white/80  rounded-3xl text-black drop-shadow-md">
          <p className=" place-self-center text-8xl font-black drop-shadow-lg font-montserrat mt-20 mx-12">
            {values.humidity}
            <span className="text-4xl">%</span>
          </p>
          <p className=" font-bold text-3xl text-black/60 font-montserrat mx-12 mt-4">Vochtigheid</p>
        </div>
        <div className="col-span-4 row-span-3 bg-white/80  rounded-3xl text-black  drop-shadow-md">
          <p className=" place-self-center text-8xl font-black drop-shadow-lg font-montserrat mt-20 mx-12">
            {parseFloat(values.plateTemp).toFixed(2)}
            <span className="text-4xl">°C</span>
          </p>
          <p className=" font-bold text-3xl text-black/60 font-montserrat mx-12 mt-4">Kookplaat</p>
        </div>
        <div className="col-span-4 row-span-3 bg-white/80  rounded-3xl text-black grid  drop-shadow-md grid-cols-2 grid-rows-4 overflow-hidden  ">
          <div className="col-span-1 row-span-2 text-center grid content-center font-montserrat text-4xl text-black font-black ">LED:</div>
          {rgbStatus ? (
            <div className={`col-span-1 row-span-2 bg-green-300 cursor-pointer text-center grid content-center font-montserrat text-4xl text-black/80 font-black `} onClick={rgbClick}>
              ON
            </div>
          ) : (
            <div className={`col-span-1 row-span-2 innershadow bg-red-300 cursor-pointer text-center grid content-center font-montserrat text-4xl text-black/80 font-black`} onClick={rgbClick}>
              OFF
            </div>
          )}
          <div className="col-span-1 row-span-2 text-center grid content-center font-montserrat text-4xl text-black font-black  border-t-2 border-black/20">Sensor:</div>

          {sensorStatus ? (
            <div
              className={`col-span-1 row-span-2 bg-green-300 cursor-pointer text-center grid content-center font-montserrat text-4xl text-black/80 font-black border-t-2 border-black/20`}
              onClick={sensorClick}>
              ON
            </div>
          ) : (
            <div
              className={`col-span-1 row-span-2 innershadow bg-red-300 cursor-pointer text-center grid content-center font-montserrat text-4xl text-black/80 font-black border-t-2 border-white/20`}
              onClick={sensorClick}>
              OFF
            </div>
          )}
        </div>
        <div className={`col-span-4 row-span-3 bg-white/80  rounded-3xl text-black grid content-center drop-shadow-md grid-cols-3 grid-rows-3 cursor-pointer`}>
          <div
            className={`col-span-1 row-span-1 border rounded-tl-3xl border-black/40  grid content-center text-center font-bold text-3xl font-montserrat ${
              modus == 7 ? `innershadow bg-gray-400/20` : ``
            }`}
            onClick={() => modusClick(7)}>
            7
          </div>
          <div
            className={`col-span-1 row-span-1 border border-black/40  grid content-center text-center font-bold text-3xl font-montserrat ${modus == 8 ? `innershadow bg-gray-400/20` : ``}`}
            onClick={() => modusClick(8)}>
            8
          </div>
          <div className={`col-span-1 row-span-1 border border-black/40 rounded-tr-3xl  grid content-center text-center font-bold text-3xl font-montserrat `} onClick={rgbClick}>
            {rgbStatus ? `aan` : `uit`}
          </div>
          <div
            className={`col-span-1 row-span-1 border border-black/40  grid content-center text-center font-bold text-3xl font-montserrat ${modus == 4 ? `innershadow bg-gray-400/20` : ``}`}
            onClick={() => modusClick(4)}>
            4
          </div>
          <div
            className={`col-span-1 row-span-1 border border-black/40  grid content-center text-center font-bold text-3xl font-montserrat ${modus == 5 ? `innershadow bg-gray-400/20` : ``}`}
            onClick={() => modusClick(5)}>
            5
          </div>
          <div
            className={`col-span-1 row-span-1 border border-black/40  grid content-center text-center font-bold text-3xl font-montserrat ${modus == 6 ? `innershadow bg-gray-400/20` : ``}`}
            onClick={() => modusClick(6)}>
            6
          </div>
          <div
            className={`col-span-1 row-span-1 border border-black/40 rounded-bl-3xl  grid content-center text-center font-bold text-3xl font-montserrat ${
              modus == 1 ? `innershadow bg-gray-400/20` : ``
            }`}
            onClick={() => modusClick(1)}>
            1
          </div>
          <div
            className={`col-span-1 row-span-1 border border-black/40  grid content-center text-center font-bold text-3xl font-montserrat ${modus == 2 ? `innershadow bg-gray-400/20` : ``}`}
            onClick={() => modusClick(2)}>
            2
          </div>
          <div
            className={`col-span-1 row-span-1 border border-black/40 rounded-br-3xl grid content-center text-center font-bold text-3xl font-montserrat ${
              modus == 3 ? `innershadow bg-gray-400/20` : ``
            }`}
            onClick={() => modusClick(3)}>
            3
          </div>
        </div>
      </div>
    </div>
  );
}
