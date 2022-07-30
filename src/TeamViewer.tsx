import { Paper, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import React from 'react'
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js'
import { Scatter } from 'react-chartjs-2'
// import faker from 'faker';

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend)

export const options = {
  layout: {
    padding: 20,
  },
  scales: {
    x: {
      ticks: { precision: 0 },
      offset: true,
    },
    y: {
      beginAtZero: true,
    },
  },
}

import { callAPI } from './api'

interface TeamViewerProps {
  team: string
}

export default function TeamViewer({ team }: TeamViewerProps) {
  const [teamData, setTeamData] = useState<any>()

  useEffect(() => {
    callAPI(`/getTeam/${team}`).then(setTeamData)
  }, [team])

  if (!teamData) {
    return <div>Loading...</div>
  }

  const data = {
    // labels,
    datasets: [
      {
        label: 'Kills per game',
        data: teamData.map((a: { Total_kills: number }, x: number) => ({
          x: x + 1,
          y: a.Total_kills,
        })),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  }

  console.log(teamData, data)

  return (
    <Paper>
      {/* <Typography variant="h4">
                {team} kills over time
            </Typography> */}
      <Scatter options={options} data={data} style={{ maxHeight: '50vh' }} />
    </Paper>
  )
}
