import Head from "next/head";
import { Fragment } from "react";
import Link from "next/link";
import Text from "next";
import ButtonCard from "../components/button-card";

export default function Home() {
  return (
    <Fragment>
      <Head>
        <title>Buttons!</title>
        <meta
          name="description"
          content="Simple form filler and data fetcher created with nextjs and mongodb"
        />
      </Head>
      <div align="center">
        <ButtonCard
          title="Button 1"
          description="This button takes you to the form page"
          number={1}
          link="buttone"
        />
        <ButtonCard
          title="Button 2"
          description="This button takes you to the data page"
          number={2}
          link="buttwo"
        />
        <div>
          <Link href="/modal">Go here to test the modal!</Link>
        </div>
      </div>
    </Fragment>
  );
}
