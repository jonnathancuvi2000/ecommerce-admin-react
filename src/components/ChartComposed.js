import React from 'react'
import { Area, Bar, CartesianGrid, ComposedChart, Legend, Line, Tooltip, XAxis, YAxis } from 'recharts'
import '../styles/ChartComposed.css'

export default function ChartComposed() {
  const data = [
    {
      "name": "Jan",
      "uv": 40,
      "pv": 24,
      "amt": 24
    },
    {
      "name": "Feb",
      "uv": 30,
      "pv": 13,
      "amt": 22
    },
    {
      "name": "Mar",
      "uv": 20,
      "pv": 98,
      "amt": 22
    },
    {
      "name": "April",
      "uv": 27,
      "pv": 39,
      "amt": 20
    },
    {
      "name": "Jun",
      "uv": 18,
      "pv": 48,
      "amt": 21
    },
    {
      "name": "Jul",
      "uv": 23,
      "pv": 38,
      "amt": 25
    },
    {
      "name": "Agu",
      "uv": 34,
      "pv": 43,
      "amt": 21
    }
  ]
  return (
    <div className='chartComposed'>
      <h3 className="chartTitle">Products Analitics</h3>
      <ComposedChart width={530} height={250} data={data}>
        <XAxis dataKey="name" stroke="#fff"/>
        <YAxis stroke="#fff"/>
        <Tooltip />
        <Legend />
        <CartesianGrid stroke="#f5f5f5" />
        <Area type="monotone" dataKey="amt" fill="#8884d8" stroke="#8884d8" />
        <Bar dataKey="pv" barSize={20} fill="#413ea0" />
        <Line type="monotone" dataKey="uv" stroke="#ff7300" />
      </ComposedChart>
    </div>
  )
}
