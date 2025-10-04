import Navbar from "./navbar";
import "./ludo.css";
import { useEffect, useState, useRef } from "react";

const  track: Record<string, number[]> = {
    "A" : [
        91,92,93,94,95, 81,66,51,36,21, 6,7,8,
        23,38,53,68,83, 99,100,101,102,103,
        104,119,134, 133,132,131,130,129, 143,158,173,188,203,
        218,217,216, 201,186,171,156,141, 125,124,123,122,121,
        120,105, 106,107,108,109,110,111
    ],
    "B" : [
        201,186,171,156,141, 125,124,123,122,121, 120,105,90,
        91,92,93,94,95, 81,66,51,36,21, 6,7,8, 23,38,53,68,83,
        99,100,101,102,103, 104,119,134, 133,132,131,130,129,
        143,158,173,188,203, 218,217, 202,187,172,157,142,127
     ],
    "C" : [
        133,132,131,130,129, 143,158,173,188,203, 218,217,216,
        201,186,171,156,141, 125,124,123,122,121, 120,105,90,
        91,92,93,94,95, 81,66,51,36,21, 6,7,8, 23,38,53,68,83,
        99,100,101,102,103, 104,119, 118,117,116,115,114,113
    ],
    "D" : [
        23,38,53,68,83, 99,100,101,102,103, 104,119,134,
        133,132,131,130,129, 143,158,173,188,203, 218,217,216,
        201,186,171,156,141, 125,124,123,122,121, 120,105,90,
        91,92,93,94,95, 81,66,51,36,21, 6,7, 22,37,52,67,82,97
    ]
}

const colMap:number[] = [
    2,2,2,2,2,2,1,1,1,4,4,4,4,4,4,
    2,0,0,0,0,2,1,4,4,4,0,0,0,0,4,
    2,0,1,1,0,2,6,4,1,4,0,1,1,0,4,
    2,0,1,1,0,2,1,4,1,4,0,1,1,0,4,
    2,0,0,0,0,2,1,4,1,4,0,0,0,0,4,
    2,2,2,2,2,2,1,4,1,4,4,4,4,4,4,
    1,2,1,1,1,1,0,0,0,1,1,1,6,1,1,
    1,2,2,2,2,2,0,0,0,5,5,5,5,5,1,
    1,1,6,1,1,1,0,0,0,1,1,1,1,5,1,
    3,3,3,3,3,3,1,3,1,5,5,5,5,5,5,
    3,0,0,0,0,3,1,3,1,5,0,0,0,0,5,
    3,0,1,1,0,3,1,3,1,5,0,1,1,0,5,
    3,0,1,1,0,3,1,3,6,5,0,1,1,0,5,
    3,0,0,0,0,3,3,3,1,5,0,0,0,0,5,
    3,3,3,3,3,3,1,1,1,5,5,5,5,5,5,
]
const Colors:string[] = ["black","white","red", "aqua", "green", "yellow","#c0c0c0ff","#33615c"];

function Dice({num,rolled,onClick}: {num: number,rolled:boolean, onClick: () => void}){
    return <svg onClick={onClick} viewBox="0 0 100 100" className="dice" xmlns="http://www.w3.org/2000/svg"
                style={{boxShadow: `0 0 15px ${(rolled?"orange":"green")}`}}>
        <rect width="96" height="96" x="0" y="0" rx="20" ry="20" fill="white" stroke="black" strokeWidth="2"/>
        {num==1 && <circle r="8" cx="48" cy="48" fill="black" />}
        {num==2 && (
            <>
                <circle r="8" cx="32" cy="32" fill="black" />
                <circle r="8" cx="64" cy="64" fill="black" />
            </>
        )}
        {num ==3 &&
            <>
                <circle r="8" cx="24" cy="24" fill="black" />
                <circle r="8" cx="48" cy="48" fill="black" />
                <circle r="8" cx="72" cy="72" fill="black" />
            </>
        }
        {num==4 &&
            <>
                <circle r="8" cx="32" cy="32" fill="black" />
                <circle r="8" cx="32" cy="64" fill="black" />
                <circle r="8" cx="64" cy="32" fill="black" />
                <circle r="8" cx="64" cy="64" fill="black" />
            </>
        }
        {num==5 &&
            <>
                <circle r="8" cx="48" cy="48" fill="black" />
                <circle r="8" cx="24" cy="24" fill="black" />
                <circle r="8" cx="24" cy="72" fill="black" />
                <circle r="8" cx="72" cy="24" fill="black" />
                <circle r="8" cx="72" cy="72" fill="black" />
            </>
        }
        {num==6 &&
            <>
                <circle r="8" cx="24" cy="24" fill="black" />
                <circle r="8" cx="48" cy="24" fill="black" />
                <circle r="8" cx="24" cy="72" fill="black" />
                <circle r="8" cx="72" cy="24" fill="black" />
                <circle r="8" cx="48" cy="72" fill="black" />
                <circle r="8" cx="72" cy="72" fill="black" />
            </>
        }
        </svg>;
}

function PawnSVG({color, left}: {color: string, left: number}) {
    return (
        <svg style={{ fill: color,left: `${left}px` }} className="pawn" height="25" width="25" xmlns="http://www.w3.org/2000/svg"
        viewBox="-20 -20 532 532">
    <path d="M256,0C149.3,0,64,85.3,64,192c0,36.9,11,65.4,30.1,94.3l141.7,215v0c4.3,6.5,11.7,10.7,20.2,10.7c8.5,0,16-4.3,20.2-10.7
        l141.7-215C437,257.4,448,228.9,448,192C448,85.3,362.7,0,256,0z M256,298.6c-58.9,0-106.7-47.8-106.7-106.8
        c0-59,47.8-106.8,106.7-106.8c58.9,0,106.7,47.8,106.7,106.8C362.7,250.8,314.9,298.6,256,298.6z"/>
    </svg>)
}

function WinBanner({winPos}:{winPos: number}) {
    return (
        <>
        <svg viewBox="0 0 100 100" className="winBanner" xmlns="http://www.w3.org/2000/svg">
            <text x="40" y="60" font-family="cursive" font-size="60" fill="black">
                {winPos}
            </text>
        </svg>
        </>
    )
}

class Pawn{
    at:number;
    house:number;
    constructor(at:number, house:number){
        this.at = at;
        this.house = house;
    }

    isMoveAble(steps:number){
        if(this.at===-1 && steps!==6) return false;
        if(this.at+steps>=57) return false;
        return true;
    }

    move(steps:number){
        if(!this.isMoveAble(steps)) return;
        if(this.at===-1 && steps===6) this.at=0;
        else this.at += steps;
    }

    getPosition(name:string){
        if(this.at===-1) return this.house;
        return track[name][this.at];
    }

    goHome(){
        this.at = -1;
    }

    reachedHome():boolean{
        return this.at===56;
    }
};

class Player{
    name:string;
    color:string;
    pawns:Pawn[];
    houses:number[];
    win:number;
    constructor(name:string, color:string, house:number[]){
        this.name = name;
        this.color = color;
        this.pawns = [new Pawn(-1, house[0]), new Pawn(-1, house[1]), new Pawn(-1, house[2]), new Pawn(-1, house[3])];
        this.houses = house;
        this.win = -1;
    }

    hasMove(steps:number):boolean{
        for(const p of this.pawns){
            if(p.isMoveAble(steps)) return true;
        }
        return false;
    }

    canMoveFrom(position:number,steps:number):boolean{
        for(let i=0; i<4; i++){
            if(position===this.houses[i]) return this.pawns[i].isMoveAble(steps);
            if(this.pawns[i].getPosition(this.name)===position) return true;
        }
        return false;
    }

    getPawn(position:number):Pawn|null{
        for(const p of this.pawns){
            if(p.getPosition(this.name)===position) return p;
        }
        return null;
    }

    pawnsIn(position:number):number{
        let n = 0;
        for(const pawn of this.pawns){
            if(pawn.getPosition(this.name)==position) n++;
        }
        return n;
    }

    checkWin(winPos:number){
        let n = 0;
        for(const pawn of this.pawns){
            if(pawn.reachedHome()) n++;
        }
        if(n===4) this.win = winPos;
        return n===4;
    }
};

class Game{
    players:Player[];
    dice:number;
    currentPlayer:number;
    diceRolled:boolean;
    stops:number[];
    winners:number;
    constructor(){
        this.players = [
            new Player("A", "red", [32,33,47,48]),
            new Player("B", "aqua", [167,168,182,183]),
            new Player("C", "yellow", [176,177,191,192]),
            new Player("D", "green", [41,42,56,57])
        ];
        this.dice = 1;
        this.currentPlayer = 0;
        this.diceRolled=false;
        this.stops = [23,91,133,201,36,122,102,188];
        this.winners=0;
    }

    nextPlayer(){
        if(this.winners>=4) return;
        this.currentPlayer = (this.currentPlayer+1)%4;
        while(this.players[this.currentPlayer].win>0) this.currentPlayer = (this.currentPlayer+1)%4;
        this.diceRolled = false;
    }

    rollDice(){
        if(this.diceRolled) return;
        this.dice = Math.floor(Math.random()*6)+1;
        this.diceRolled = true;
        if(this.players[this.currentPlayer].hasMove(this.dice)) return;
        this.nextPlayer();
    }

    collide(position:number):boolean{
        for(const i of this.stops) if(i===position) return false;
        for(const player of this.players){
            if(this.players[this.currentPlayer].name===player.name) continue;
            for(const pawn of player.pawns){
                if(pawn.getPosition(player.name)===position){
                    pawn.goHome();
                    return true;
                }
            }
        }
        return false;
    }

    clickCell(position:number){
        const player = this.players[this.currentPlayer];
        if(!this.diceRolled || !player.hasMove(this.dice)) return;
        const pawn = player.getPawn(position);
        if(!pawn) return;
        if(!pawn.isMoveAble(this.dice)) return;
        pawn.move(this.dice);
        if(player.checkWin(this.winners+1)) this.winners++;
        if(this.dice!==6 && !this.collide(pawn.getPosition(player.name)) && !pawn.reachedHome()) this.nextPlayer();
        this.diceRolled = false;
    }

    getPawns():{color:string, position:number}[]{
        let pawns: {color:string, position:number}[] = [];
        for(const player of this.players){
            for(const p of player.pawns){
                pawns.push({color: player.color, position: p.getPosition(player.name)});
            }
        }
        return pawns;
    }

    getWinners():boolean[]{
        let res = [false,false,false,false];
        for(let i=0; i<4; i++){
            if(this.players[i].win>0) res[i]=true;
        }
        return res;
    }
};

function Ludo() {
    const [board , setBoard] = useState<string[][]>(Array.from({length: 225}, () => [] as string[]));
    const [dice,setDice] = useState(1);
    const [diceRolled, setDiceRolled] = useState(false);
    const [currentPlayer, setCurrentPlayer] = useState(0);
    const [clickedCell, setClickedCell] = useState(false);
    const [winners, setWinners] = useState([false,false,false,false]);
    const game = useRef(new Game());
    
    useEffect(() => {
        let newBoard: string[][] = Array.from({length:225}, () => [] as string[]);
        for(let {color, position} of game.current.getPawns()){
            newBoard[position].push(color);
        }
        setBoard(newBoard);
        if(clickedCell) setClickedCell(false);
    },[clickedCell])

    const rollDice = () => {
        if(game.current.diceRolled) return;
        game.current.rollDice();
        setDice(game.current.dice)
        setCurrentPlayer(game.current.currentPlayer);
        setDiceRolled(game.current.diceRolled);
    }

    const clickCell = (position: number) => {
        game.current.clickCell(position);
        setClickedCell(true);
        setDiceRolled(game.current.diceRolled);
        setCurrentPlayer(game.current.currentPlayer);
        setWinners(game.current.getWinners());
    }

    return (
        <>
            <Navbar />
            <h1>Ludo Game Coming Soon!</h1>
            <div className="container text-center">
                <div className="board">
                    {
                        board.map((cell, index) =>
                            <div key={index} className="cell" style={{ background: Colors[colMap[index]]}} onClick={() => clickCell(index)}>
                                {colMap[index]===6 && <svg viewBox="0 0 100 100" className="star"><path d="M50,15 L61,35 L88,35 L67,50 L78,75 L50,60 L22,75 L33,50 L12,35 L39,35 Z" /></svg>}
                                {(index==0 && currentPlayer==0 || index==195 && currentPlayer==1 || index==208 && currentPlayer==2 || index==13 && currentPlayer==3) &&
                                <Dice num={dice} rolled={diceRolled} onClick={rollDice}/>}
                                {winners[0] && index==32 && <WinBanner winPos={game.current.players[0].win}/>}
                                {winners[1] && index==167 && <WinBanner winPos={game.current.players[1].win}/>}
                                {winners[2] && index==176 && <WinBanner winPos={game.current.players[2].win}/>}
                                {winners[3] && index==41 && <WinBanner winPos={game.current.players[3].win}/>}
                                {cell.length!==0 && cell.map( (color, i) =>
                                    <PawnSVG key={i} color={color} left={i*3}/>
                                )}
                            </div>
                        )
                    }
                </div>
                <br />
                <button className="btn btn-success" onClick={rollDice}>Dice:{dice}</button>
            </div>
        </>
    )
}

export default Ludo;