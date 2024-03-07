import { SimpleGrid, Stack, Text } from "@mantine/core";

interface Props {
  you: number;
  other: number;
  tie: number;
}

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
      <Stack align="center" gap={0}>
        <Stack fz={"30px"} lh={1} fw={"bold"}>
          {prop.you}{" "}
        </Stack>
        <Text p={0}>You</Text>
      </Stack>
      <Stack align="center" gap={0}>
        <Stack fz={"30px"} lh={1} fw={"bold"}>
          {prop.other}
        </Stack>
        <Text p={0}>Other</Text>
      </Stack>
      <Stack align="center" gap={0}>
        <Stack fz={"30px"} lh={1} fw={"bold"}>
          {prop.tie}
        </Stack>
        <Text p={0}>Tie</Text>
      </Stack>
    </SimpleGrid>
  );
}

export default Points;
