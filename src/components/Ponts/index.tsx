import { SimpleGrid, Stack, Text } from "@mantine/core";

interface Props {
  X: number;
  O: number;
  tie: number;
}

const mediaQuery = window.matchMedia("(max-device-width: 600px)");

const styleDescription = {
  p: 0,
  ff: "DM Serif Display, serif",
  fz: mediaQuery.matches ? "25px" : "10px",
};
const stylePoint = {
  fz: mediaQuery.matches ? "45px" : "35px",
  lh: 1,
};
const styleBlock = {
  align: "center",
  gap: 0,
};

function Points(prop: Props) {
  return (
    <SimpleGrid
      cols={3}
      spacing={"xl"}
      c={"white"}
      style={{
        borderRadius: "20px",
        padding: "20px",
        backgroundColor: "#ffffff12",
      }}
    >
      <Stack {...styleBlock}>
        <Stack {...stylePoint}>{prop.X}</Stack>
        <Text {...styleDescription}>Square</Text>
      </Stack>
      <Stack {...styleBlock}>
        <Stack {...stylePoint}>{prop.O}</Stack>
        <Text {...styleDescription}>Sphere</Text>
      </Stack>
      <Stack {...styleBlock}>
        <Stack {...stylePoint}>{prop.tie}</Stack>
        <Text {...styleDescription}>Tie</Text>
      </Stack>
    </SimpleGrid>
  );
}

export default Points;
