import { useEffect, useState } from "react";
import { SimpleGrid, Stack } from "@mantine/core";
import Letter from "../Letter";
import Square from "../Square";
import Sphere from "../Sphere";

interface LetterType {
  letter: string;
  id: number;
}

function Game() {
  const [cardList, setCardList] = useState<LetterType[]>([]);
  const [letter, setLetter] = useState("");

  function handleClick(card: LetterType) {
    let newCardList = [...cardList];
    let currentLetter = "";

    if (letter === "") {
      currentLetter = "X";
      newCardList = newCardList.map((c) => {
        if (c.id === card.id) return { ...card, letter: currentLetter };
        else {
          return c;
        }
      });
    } else {
      if (letter === "X") {
        currentLetter = "O";
        newCardList = newCardList.map((c) => {
          if (c.id === card.id) return { ...card, letter: currentLetter };
          else {
            return c;
          }
        });
      } else {
        currentLetter = "X";
        newCardList = newCardList.map((c) => {
          if (c.id === card.id) return { ...card, letter: currentLetter };
          else {
            return c;
          }
        });
      }
    }
    setLetter(currentLetter);
    setCardList(newCardList);
  }

  useEffect(() => {
    setCardList([
      { letter: "", id: 1 },
      { letter: "", id: 2 },
      { letter: "", id: 3 },
      { letter: "", id: 4 },
      { letter: "", id: 5 },
      { letter: "", id: 6 },
      { letter: "", id: 7 },
      { letter: "", id: 8 },
      { letter: "", id: 9 },
    ]);
  }, []);

  return (
    <Stack bg={"#fefeff"} p={"40px"} style={{ borderRadius: "50px" }}>
      <SimpleGrid cols={3} spacing={"5px"} bg={"#f7f6f8"}>
        {cardList.map((card: LetterType) => {
          console.log(card);
          return (
            <Stack onClick={() => handleClick(card)} bg={"#fefeff"}>
              <Letter
                letter={
                  card.letter === "X" ? (
                    <Square />
                  ) : card.letter === "O" ? (
                    <Sphere />
                  ) : (
                    ""
                  )
                }
              />
            </Stack>
          );
        })}
      </SimpleGrid>
    </Stack>
  );
}

export default Game;
