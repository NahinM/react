import { useEffect, useState } from "react";
import Navbar from "./navbar";
import "./tictactoe.css";

function TicTacToe() {
    const [board, setBoard] = useState(Array(9).fill(""));
    const [currentPlayer, setCurrentPlayer] = useState("X");

    const [winner, setWinner] = useState<string | null>(null);

    const checkWinner = () => {
        const wincombo: number[][] = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (const combo of wincombo) {
            const [a, b, c] = combo;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                setWinner(`Winner is ${board[a]}`);
                return;
            }
        }

        if(winner) return;
        let flag: boolean = true;
        board.forEach(cell => {
            if(cell === "" ) flag = false;
        })
        if(flag) setWinner("It's a Draw");
    }

    useEffect(() => {
        checkWinner();
    }, [board]);

    const resetGame = () => {
        setBoard(Array(9).fill(""));
        setCurrentPlayer("X");
        setWinner(null);
    }

    const makeMove = (index: number) => {
        if(board[index] !== "" || winner) return;
        const newBoard = [...board];
        newBoard[index] = currentPlayer;
        setBoard(newBoard);
        setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }

    return (
        <>
        <Navbar />
        <h1 className="text-center">Tic Tac Toe</h1>

        { winner && <h2 className="text-center">{winner}</h2>}
        <div className="container text-center">
        <div className="board">

            {
                board.map((cell, index) => 
                    <button key={index} className="cell" onClick={() => makeMove(index)}>
                        {cell}
                    </button>
                )
            }
        </div>
        <br />
        <button className="btn btn-info text-center" onClick={resetGame}>Restart</button>
        </div>
        </>
    )
}

export default TicTacToe;