import { Stack } from "@mantine/core";
import "./index.css";
import { ReactNode } from "react";

interface Prop {
  letter: ReactNode;
}

function Letter(prop: Prop) {
  return (
    <Stack w={"100px"} h={"100px"} align="center" justify="center" fz={100}>
      {prop.letter}
    </Stack>
  );
}

export default Letter;
