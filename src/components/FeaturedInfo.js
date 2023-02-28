import '../styles/FeaturedInfo.css';
import { ArrowDownward, ArrowUpward } from '@material-ui/icons';


import React, { useEffect, useState } from 'react'
import { userRequest } from '../requestMethods';

export default function FeaturedInfo() {
    // hora 2:17 la que empieza
    const [income, setIncome] = useState([]);
    const [perc, setPerc] = useState(0);

    useEffect(() => {
        const getIncome = async () => {
            try {
                const res = await userRequest.get('/orders/income');
                setIncome(res.data);
                if (res) {
                    setPerc((res.data[1].total) * 100 / res.data[0].total - 100);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getIncome();
    }, [])

    console.log(income)
    console.log(perc)
    return (
        <div className='featured'>
            <div className="feacturedItem">
                <span className="feacturedTitle">Revanue</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">$ 2,42</span>
                    <span className="featuredMoneyRate">-12.4 <ArrowDownward className="featuredIcon negative" /></span>
                </div>
                <span className="featuredSub">Compared to last month</span>
            </div>

            <div className="feacturedItem">
                <span className="feacturedTitle">Sales</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">$ 2,42</span>
                    <span className="featuredMoneyRate">-12.4 <ArrowDownward className="featuredIcon negative" /></span>
                </div>
                <span className="featuredSub">Compared to last month</span>
            </div>

            <div className="feacturedItem">
                <span className="feacturedTitle">Cost</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">$ 2,222</span>
                    <span className="featuredMoneyRate">+2.4 <ArrowUpward className="featuredIcon" /></span>
                </div>
                <span className="featuredSub">Compared to last month</span>
            </div>
        </div>
    )
}
