import * as React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Login } from "@mui/icons-material";

const Dashboard = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <h1>Hello MUI Dashboarokd</h1>
      </Grid>
    </Container>
  );
};

export default Dashboard;
