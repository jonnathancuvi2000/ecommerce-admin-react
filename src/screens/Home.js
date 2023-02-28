import React, { useEffect, useMemo, useState } from 'react';
import Chart from '../components/Chart';
import FeaturedInfo from '../components/FeaturedInfo';
import '../styles/Home.css';
import { userData } from '../dummyData';
import WidgetSm from '../components/WidgetSm';
import WidgetLg from '../components/WidgetLg';
import { userRequest } from '../requestMethods';

export default function Home() {
  // I use "userData" instead of "userStats" because there is not data there, so nothing is showing 
  const [userStats, setuserStats] = useState([]);

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get('/users/stats');
        res.data.map(item =>
          setuserStats(prev => [
            ...prev,
            { name: MONTHS[item._id - 1], "Active User": item.total }
          ])
        );
      } catch (error) {
        console.log(error);
      }
    }
    getStats();
  }, [MONTHS]);

  return (
    <div className='home'>
      <FeaturedInfo />
      <Chart data={userData} title="User Analitics" grid dataKey="Active User" />
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  )
}
