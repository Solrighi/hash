import { MantineProvider, Stack, Title, createTheme } from "@mantine/core";
import Game from "./components/Body";
import "@mantine/core/styles.css";

const theme = createTheme({
  fontFamily: "Passion One, sans-serif",
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
        gap={"30px"}
      >
        <Title fw={400} c={"white"} ta={"center"} fz={"50px"}>
          TicTacToe
        </Title>
        <Game />
      </Stack>
    </MantineProvider>
  );
}

export default App;
