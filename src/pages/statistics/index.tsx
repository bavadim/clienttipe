import React, {lazy} from 'react';
import dynamic from "next/dynamic";
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false, })
import style from "./index.module.scss"
import createPlotlyComponent from "react-plotly.js/factory";
import { Grades, UserStatistics } from '../api/psychometry';


const Plots = ({title, data}: { title: string, data: {[k: string]: Grades} }) => {
	return (
		<Plot data={[{
			type: 'bar',
			x: Object.entries(data).map( ([k, v]) => {
				return k
			}),
			y: Object.entries(data).map( ([k, v]) => {
				return {
					'мало': 0.0,
					'меньше среднего': 0.25,
					'средне': 0.5, 
					'больше среднего': 0.75, 
					'много': 1.0
				}[v]
			})
		}]} layout={{ title: title }} />
	)
}

const StatisticsWindow = ({userStats}: {userStats: UserStatistics}) => {
	return (
		<div className={style.container}>
			<h2>Оценка {userStats.name}</h2>
			<div className={style.plot}>
				<div className={style.psychotypes}>
					<Plots title='Психотип' data={userStats.psychotypes} />
				</div>
				<div className={style.temperaments}>
					<Plots title='Темперамент' data={userStats.temperament} />
				</div>
			</div>
		</div>
	)
}

export default StatisticsWindow