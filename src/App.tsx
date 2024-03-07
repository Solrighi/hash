import React from "react";
import { MantineProvider, Stack, Title, createTheme } from "@mantine/core";
import Game from "./components/Body";
import "@mantine/core/styles.css";
import Points from "./components/Ponts";

const theme = createTheme({
  fontFamily: "Quicksand, sans-serif",
});

function App() {
  return (
    <MantineProvider theme={theme}>
      <Stack
        h={"100vh"}
        w={"100vw"}
        bg={
          "radial-gradient(circle, rgba(135,135,163,1) 25%, rgba(69,91,125,1) 69%)"
        }
        align="center"
        justify="center"
        gap={"50px"}
      >
        <Stack>
          <Title fw={500} c={"white"} ta={"center"}>
            TicTacToe
          </Title>
          <Game />
          <Points you={5} other={7} tie={4} />
        </Stack>
      </Stack>
    </MantineProvider>
  );
}

export default App;
