import { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { Box, Paper, TextField, Typography, MenuItem } from '@mui/material'
import TeamViewer from './TeamViewer'
import { callAPI } from './api'
import React from 'react'

interface IState {
  team: string
  teamNames: Array<string>
  tournament: string
  tournamentNames: Array<string>
}

class App extends React.Component<any, IState> {
  constructor(props: any) {
    super(props)
    this.state = {
      team: '',
      teamNames: [],
      tournament: '',
      tournamentNames: [],
    }
  }

  componentDidMount = () => {
    this.getTournaments()
  }

  getTournaments = () => {
    callAPI('/getTournaments').then((res) => {
      console.log(res)
      const tournamentNames = res
        .map((t: { tournament_name: string }) => t.tournament_name)
        .map((val: string) => val.replaceAll('_', ' '))
        .sort()

      this.setState({ tournamentNames: tournamentNames })
    })
  }

  getTeamNames = (tournament: string) => {
    callAPI(`/getTeamNames/${tournament}`).then((res) => {
      console.log(res)
      const teamNames = res.sort()
      this.setState({ teamNames: teamNames })
    })
  }

  render() {
    return (
      <Box className='App' m={2} p={2}>
        <Typography variant='h3'>LoL Bets</Typography>
        <TextField
          label='Tournament'
          value={this.state.tournament}
          select
          onChange={(e) => {
            this.setState({
              tournament: e.target.value,
              team: '',
            })
            this.getTeamNames(e.target.value.replaceAll(' ', '_'))
          }}
          style={{ marginBlock: 20, minWidth: 240 }}
        >
          {this.state.tournamentNames.map((tournamentName, id) => (
            <MenuItem key={id} value={tournamentName}>
              {tournamentName}
            </MenuItem>
          ))}
        </TextField>
        {this.state.tournament && (
          <TextField
            label='Team'
            value={this.state.team}
            select
            onChange={(e) => this.setState({ team: e.target.value })}
            style={{ marginBlock: 20, minWidth: 240 }}
          >
            {this.state.teamNames.map((teamName, id) => (
              <MenuItem key={id} value={teamName}>
                {teamName}
              </MenuItem>
            ))}
          </TextField>
        )}
        {this.state.team && (
          <TeamViewer team={this.state.team.replaceAll(' ', '_')} />
        )}
      </Box>
    )
  }
}

export default App
