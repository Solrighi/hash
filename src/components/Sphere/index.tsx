import { Stack } from "@mantine/core";

function Sphere() {
  return (
    <Stack
      bg={"#6db1cd"}
      h={"50px"}
      w={"50px"}
      style={{ borderRadius: "200px", boxShadow: "0 0 10px -5px black" }}
    />
  );
}

export default Sphere;
