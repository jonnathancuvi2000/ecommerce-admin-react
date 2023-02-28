import React from 'react'
import '../styles/Analitics.css';
import { userData } from '../dummyData';
import Chart from '../components/Chart';
import ChartRadar from '../components/ChartRadar';
import ChartComposed from '../components/ChartComposed';


export default function Analitics() {
    return (
        <div className='analitics'>
            <div className="analiticsWidgets">
                <ChartRadar />
                <ChartComposed />
            </div>
            <Chart data={userData} title="User Analitics" grid dataKey="Active User" />
        </div>
    )
}
