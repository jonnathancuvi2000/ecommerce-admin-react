import React from 'react'
import { Legend, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart } from 'recharts'
import '../styles/ChartRadar.css'

export default function ChartRadar() {
  const data = [
    {
      "subject": "Coat",
      "A": 120,
      "B": 110,
      "fullMark": 150
    },
    {
      "subject": "Sweter",
      "A": 98,
      "B": 130,
      "fullMark": 150
    },
    {
      "subject": "Pants",
      "A": 86,
      "B": 130,
      "fullMark": 150
    },
    {
      "subject": "Shoes",
      "A": 99,
      "B": 100,
      "fullMark": 150
    },
    {
      "subject": "Shirts",
      "A": 85,
      "B": 90,
      "fullMark": 150
    },
    {
      "subject": "T-shirts",
      "A": 65,
      "B": 85,
      "fullMark": 150
    }
  ]

  return (
    <div className='radarChart'>
      <h3 className="chartTitle">Most Selled Products</h3>
      <RadarChart  width={300} height={250} data={data} >
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" stroke="#fff" />
        <PolarRadiusAxis angle={30} domain={[0, 150]} />
        {/* <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} /> */}
        <Radar name="Products" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
        <Legend />
      </RadarChart>
    </div>
  )
}
