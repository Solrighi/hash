import { useEffect, useState } from "react";
import { SimpleGrid, Stack } from "@mantine/core";
import Letter from "../Letter";
import Square from "../Square";
import Sphere from "../Sphere";
import Points from "../Ponts";
import { motion } from "framer-motion";

interface LetterType {
  letter: string;
  id: number;
  risk: boolean;
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
const horizontalArrays = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
const verticalArrays = [
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
];
const leftDiagonalArrays = [[1, 5, 9]];
const rightDiagonalArrays = [[3, 5, 7]];

const horizontalArraysRiskStyle = "rotate(180deg)";
const verticalArraysRiskStyle = "rotate(90deg)";
const leftDiagonalArraysRiskStyle = "rotate(45deg)";
const rightDiagonalArraysRiskStyle = "rotate(135deg)";

const initialCardListState = [
  { letter: "", id: 1, risk: false },
  { letter: "", id: 2, risk: false },
  { letter: "", id: 3, risk: false },
  { letter: "", id: 4, risk: false },
  { letter: "", id: 5, risk: false },
  { letter: "", id: 6, risk: false },
  { letter: "", id: 7, risk: false },
  { letter: "", id: 8, risk: false },
  { letter: "", id: 9, risk: false },
];

function Game() {
  const [cardList, setCardList] = useState<LetterType[]>(initialCardListState);
  const [letter, setLetter] = useState("");
  const [pointsX, setPointsX] = useState(0);
  const [pointsO, setPointsO] = useState(0);
  const [pointsTie, setPointsTie] = useState(0);
  const [risk, setRisk] = useState("");
  const [counter, setCounter] = useState(0);

  function handleClick(card: LetterType) {
    if (cardList.filter((c) => c.id === card.id)[0].letter !== "") {
      return;
    }

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

  function containsInWinningArrays(arr: number[][], games: number[]) {
    return arr.find((a) => a.every((b) => games.includes(b)));
  }

  function setStyleRisk(games: number[]) {
    const riskStyles = [
      { array: horizontalArrays, style: horizontalArraysRiskStyle },
      { array: verticalArrays, style: verticalArraysRiskStyle },
      { array: leftDiagonalArrays, style: leftDiagonalArraysRiskStyle },
      { array: rightDiagonalArrays, style: rightDiagonalArraysRiskStyle },
    ];

    riskStyles.forEach(({ array, style }) => {
      if (containsInWinningArrays(array, games)) {
        setRisk(style);
      }
    });
  }

  function restartGame(hasCountdown: boolean = true) {
    if (hasCountdown) {
      setCounter(5);
    }
    counter > 0 &&
      setTimeout(() => {
        setCounter((currentValue) => currentValue - 1);
        if (counter <= 1) setCardList(initialCardListState);
      }, 1000);
  }

  useEffect(() => {
    const games = getGames(cardList);
    let xWin = containsInWinningArrays(potentialPlays, games.x);
    let oWin = containsInWinningArrays(potentialPlays, games.o);
    let tie = !xWin && !oWin && cardList.every((c) => c.letter !== "");

    if (tie) {
      setPointsTie((current) => current + 1);
      restartGame();
      return;
    }

    let winner: number[] = [];
    if (xWin?.length) {
      setPointsX((current) => current + 1);
      winner = xWin;
    } else if (oWin?.length) {
      setPointsO((current) => current + 1);
      winner = oWin;
    }

    if (winner.length) {
      winner.forEach((num) => {
        const card = cardList.find((card) => card.id === num);
        if (card) card.risk = true;
      });
      setStyleRisk(winner);
      restartGame();
    }
  }, [cardList]);

  useEffect(() => {
    restartGame(false);
  }, [counter]);

  return (
    <Stack>
      <Stack
        bg={"#fefeff"}
        p={"40px"}
        style={{ borderRadius: "50px" }}
        pos={"relative"}
      >
        {counter > 0 && (
          <Stack
            style={{
              zIndex: "1",
              position: "absolute",
              width: "100%",
              alignItems: "center",
              height: "100%",
              top: "0",
              left: "0",
              justifyContent: "center",
              fontSize: "100px",
              color: "rgb(174, 255, 168)",
              textShadow: "0 2px 10px #00000057",
            }}
          >
            <motion.div
              key={counter}
              initial={{ scale: 2 }}
              animate={{ rotate: 360, scale: 2 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
            >
              {counter}
            </motion.div>
          </Stack>
        )}
        <SimpleGrid cols={3} spacing={"5px"} bg={"#f7f6f8"}>
          {cardList.map((card: LetterType) => {
            return (
              <Stack
                onClick={() => handleClick(card)}
                bg={"#fefeff"}
                w={"100%"}
                h={"100%"}
              >
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
                  style={card.risk ? risk : ""}
                />
              </Stack>
            );
          })}
        </SimpleGrid>
      </Stack>
      <Points X={pointsX} O={pointsO} tie={pointsTie} />
    </Stack>
  );
}

export default Game;
