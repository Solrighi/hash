import { useEffect, useState } from "react";
import { SimpleGrid, Stack } from "@mantine/core";
import Letter from "../Letter";
import Square from "../Square";
import Sphere from "../Sphere";
import Points from "../Ponts";

interface LetterType {
  letter: string;
  id: number;
}

const potentialPlays = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

function Game() {
  const [cardList, setCardList] = useState<LetterType[]>([
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
  const [letter, setLetter] = useState("");

  function handleClick(card: LetterType) {
    let newCardList = [...cardList];
    let currentLetter = letter === "X" ? "O" : "X";

    newCardList = newCardList.map((c) => {
      if (c.id === card.id) {
        return { ...card, letter: currentLetter };
      } else {
        return c;
      }
    });

    setLetter(currentLetter);
    setCardList(newCardList);
  }

  function getGames(arr: LetterType[]) {
    return {
      x: arr.filter((a) => a.letter === "X").map((a) => a.id),
      o: arr.filter((a) => a.letter === "O").map((a) => a.id),
    };
  }

  useEffect(() => {
    const jogos = getGames(cardList);

    let xWin = potentialPlays.some((a) => a.every((b) => jogos.x.includes(b)));
    let oWin = potentialPlays.some((a) => a.every((b) => jogos.o.includes(b)));
  }, [cardList]);

  return (
    <Stack>
      <Stack bg={"#fefeff"} p={"40px"} style={{ borderRadius: "50px" }}>
        <SimpleGrid cols={3} spacing={"5px"} bg={"#f7f6f8"}>
          {cardList.map((card: LetterType) => {
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
      <Points you={5} other={7} tie={4} />
    </Stack>
  );
}

export default Game;
