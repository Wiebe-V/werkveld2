import "firebase/database";
import { getDatabase, ref, query, orderByChild, push, set, increment as rtdbIncrement } from "firebase/database";
import { DatabaseProvider, useDatabase, useDatabaseListData, useDatabaseObjectData, useFirebaseApp, SuspenseWithPerf } from "reactfire";

import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  // const database = useDatabase();
  // const counterRef = ref(database, "counter");

  // const { status, data: count } = useDatabaseObjectData(counterRef);

  const count = 0;

  // if (status === "loading") {
  //   return <span>loading...</span>;
  // }

  return <span> {count} </span>;
}
