import React, { useEffect, useState } from 'react';
import './home.css';
const XMLParser = require('react-xml-parser');

export function Home() {
  const [ leagueInfo, setLeagueInfo ] = useState([]);

  useEffect(() => {
    const keynames = [
      'name',
      'felo_tier',
      'current_week',
      'start_date',
      'end_date',
      'season'
    ];

    fetch('/api/home', {
      headers: {
        refreshToken: window.localStorage.getItem('refreshToken') as string
      }
    })
      .then(res => res.text())
      .then(data => {
        let xml = new XMLParser().parseFromString(data);
        let leagueInfoObj = xml.children[0].children.filter((item: any) => keynames.includes(item.name));
        console.log(leagueInfoObj)
        setLeagueInfo(leagueInfoObj);
        if (xml.name === 'yahoo:error') {
          newToken(window.localStorage.getItem('refreshToken') as string);
        }
      })
      .catch(err => console.error(err));
  }, []);

  const newToken = async (token: string) => {
    await fetch('/api/new_token', {
      method: 'POST',
      body: JSON.stringify({ refreshToken: token }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
      })
      .catch(err => console.error(err));
  }

  const data = leagueInfo.map((item: any, index: number) => 
    <li key={index}>{item.value}</li>
  )

  return (
    <div className="home">
      <h1>{data}</h1>
    </div>
  )
}