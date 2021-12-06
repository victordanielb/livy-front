import React, { Component } from 'react'
import './style.css'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';


const data = [
    { name: 'Semana 1', Recebimentos: 800 },
    { name: 'Semana 2', Recebimentos: 1398 },
    { name: 'Semana 3', Recebimentos: 550 },
    { name: 'Semana 4', Recebimentos: 2500 },
];
export default class Graph extends Component {
    render() {
        return (
            <div className="graphContainer">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        width={385}
                        height={275}
                        data={data}
                        fontSize={12}
                        margin={{ top: 45, right: 5 }}
                    >
                        <Line
                            type='monotone'
                            dataKey='Recebimentos'
                            stroke='var(--color-default)'
                            activeDot={{ r: 8 }}
                        />
                        <CartesianGrid strokeDasharray='3 3' />
                        <Tooltip />
                        <YAxis />
                        <XAxis dataKey='name' />
                        <Legend />
                    </LineChart>
                </ResponsiveContainer>

            </div>
        )
    }
}
