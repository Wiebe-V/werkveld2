import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
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

  useEffect(() => {
    let isTrue = false;

    if (!isTrue) {
      onValue(ref(database, `values`), (snapshot) => {
        const data = snapshot.val();
        if (data != values) {
          console.log(data);
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

  //   console.log(values);

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
        <div className="col-span-4 row-span-3 bg-white/80 rounded-3xl text-black grid content-center drop-shadow-md">
          <p className=" text-center">{values.temp}</p>
        </div>
        <div className="col-span-4 row-span-3 bg-white/80  rounded-3xl text-black grid content-center drop-shadow-md">
          <p className=" text-center">{values.distanceCm}</p>
        </div>
        <div className="col-span-4 row-span-3 bg-white/80  rounded-3xl text-black grid content-center drop-shadow-md">
          <p className=" text-center">{values.humidity}</p>
        </div>
        <div className="col-span-4 row-span-3 bg-white/80  rounded-3xl text-black grid content-center drop-shadow-md">
          <p className=" text-center">{values.plateTemp}</p>
        </div>
      </div>
    </div>
  );
}
