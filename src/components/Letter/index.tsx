import { Stack } from "@mantine/core";
import "./index.css";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Prop {
  letter: ReactNode;
  style: string;
}

function calculateWidth(style: string): string {
  const stylesRequiring150px = ["rotate(45deg)", "rotate(135deg)"];
  return stylesRequiring150px.includes(style) ? "150px" : "110px";
}

function Letter({ letter, style }: Prop) {
  const hasStyle = style !== "";

  return (
    <Stack w="100px" h="100px" align="center" justify="center">
      <Stack fz={100}>
        <motion.div
          key={letter?.toString()}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 15,
          }}
        >
          {letter}
        </motion.div>
      </Stack>
      {hasStyle && (
        <Stack
          style={{
            position: "absolute",
            width: calculateWidth(style),
            height: "5px",
            backgroundColor: "#455b7d",
            transform: style,
            borderRadius: "200px",
          }}
        />
      )}
    </Stack>
  );
}

export default Letter;
