/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from 'next/link';



export async function getStaticProps() {

const resp = await fetch(

        // Data fetched from online storage

        "https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json");


return {
  props: {
    pokemon: await resp.json()
  }
}
}

const Home = ({ pokemon }) => {

  

  return (
    <div className={styles.container}>
      <Head>
        <title>Pokemon List</title>
      </Head>
      <h2>Pokemon List</h2>
      <div className={styles.grid}>

        {/* Show the data in the UI */}

      {pokemon.map((pokemon) => (
        <div className={styles.card} key={pokemon.id}>
          <Link href={`/pokemon/${pokemon.id}`}>
          <a>
            <img  
            src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`}
            alt={`pokemon.name`}
             />
            <h1>{pokemon.name}</h1>
          </a>
          </Link>
        </div>
      ))}
      </div>
      
    </div>
  )
}

export default Home
