/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from "next/head";
import styles from "../../styles/PokemonDetails.module.css"
import Link from 'next/link';


export default function PokemonDetails () {

    const { query: {id}} = useRouter()

    // Somewhere to store the data 

  const [ pokemon, setPokemon ] = useState(null)

  // Get the data, but only once 
  
  useEffect(() => {
    async function getPokemon() {
      const resp = await fetch(

        // Data fetched from online storage

        `https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${id}.json`);
        setPokemon(await resp.json())

         
    }
    if(id)  {
        getPokemon()
    }
    

  }, [id] )

  if(!pokemon) {
    return null
  }
       
  return (
    <div>
      <Head>
        <title>{pokemon.name}</title>
      </Head>
      <div>
        <Link href="/">
          <a>Back to Home</a>
        </Link>
      </div>
      <div className={styles.layout}>
        <div>
          <img
            className={styles.picture}
            src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`}
            alt={pokemon.name.english}
          />
        </div>
        <div>
          <div className={styles.name}>{pokemon.name}</div>
          <div className={styles.type}>{pokemon.type.join(", ")}</div>
          <table>
            <thead className={styles.header}>
              <tr>
                <th>Name</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {pokemon.stats.map(({ name, value }) => (
                <tr key={name}>
                  <td className={styles.attribute}>{name}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
    </div>
    </div>
  )
}
