import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Box, createTheme, CssBaseline, Paper, TextField, ThemeProvider, Typography } from "@mui/material";
import TeamViewer from "./TeamViewer";

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: "#f44336",
      contrastText: "#fff"
    },
    secondary: {
      main: "#2196f3",
      contrastText: "#fff"
    }
  }
});



function App() {
  const [teamText, setTeamText] = useState("");
  const [team, setTeam] = useState("");

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className="App" m={2} p={2}>
        <Typography variant="h3">
          LoL Bets
        </Typography>
        <TextField
          label="Team"
          value={teamText}
          onChange={(e) => setTeamText(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              setTeam(teamText);
            }
          }
          }
          style={{ marginBlock: 20 }}
        />
        {team && <TeamViewer team={team} />}
      </Box>
    </ThemeProvider>
  );
}

export default App;
