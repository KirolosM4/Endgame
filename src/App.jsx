import React, { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import axios from "axios";
import { FaSkullCrossbones } from "react-icons/fa";

const App = () => {
    const allAttempts = ["Html","Css","JavaScript","React","TypeScript","Node.js","Python","Ruby","Assembly"];
    const colors = ["red","green","blue","cyan"];
    const letter = "A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z";
    const [word,setWord] = useState([]);
    const [wordErr] = useState(["HTML,it's been real","Oh no, not CSS!","JavaScript,your watch has ended","R.I.P,React","R.I.P,TypeScript","The end of Node.js as we know it","Farewell, Python","Game over! You lose! Better start learning Assembly 😭"]);
    const [successLetter,setSuccessLetter] = useState([]);
    const [errLetter,setErrLetter] = useState([]);
    const [killAttempts,setKillAttempts] = useState([]);
    const getWord = () =>{ 
            axios({
                method:"get",
                url:"https://random-word-api.herokuapp.com/word"
            }).then((res)=>{
                setWord(res.data)
            })
            setSuccessLetter([]);
            setErrLetter([]);
            setKillAttempts([]);
    }

    const checkLetter = (letter) =>  {
        if(word[0].includes(letter.toLowerCase())){
            setSuccessLetter([
                ...successLetter,
                letter
            ])
        } else {
            setErrLetter([
                ...errLetter,
                letter
            ])
            setKillAttempts([
                ...killAttempts,
                allAttempts[errLetter.length]
            ])
        }
    }
    useEffect(()=>{
        getWord();
    },[])
    return(
        <div className="bg-[#262626] text-white md:h-screen h-fit text-center p-7 flex flex-col items-center">
            <p className="text-2xl py-5">Assembly:Endgame</p>
            <p className="text-gray-500">Guess the word within 8 attempts to keep the programming world safe from Assembly</p>
            {
                successLetter.length == word[0]?.split("")?.length
                ?
                <p className="md:w-1/3 md:m-5 md:p-5 w-full flex flex-col bg-green-700"> <span>You Win!🎉</span> <span>Well Done🏆</span></p>
                :
                <p className={`md:w-1/3 md:m-5 md:p-5 w-full ${killAttempts.length == 8 ? "bg-red-700" : "bg-purple-700"} ${errLetter.length > 0 ? "visible" : "invisible"}`}>{wordErr[errLetter.length - 1]}</p>
                
            }
            <div className="flex flex-wrap md:flex-nowrap gap-3 w-full md:w-1/3 justify-center">
                {
                    allAttempts.map((attempts)=>(
                        <Button className={`bg-${colors[Math.floor(Math.random() * 4)]}-500 px-2 py-3 flex items-center gap-3`} disabled={killAttempts.includes(attempts)}>{attempts} {killAttempts.includes(attempts) && <FaSkullCrossbones />}</Button>
                    ))
                }
            </div>
            <div className="flex flex-wrap p-7 gap-1 text-[#323232]  selection:text-[#323232]">
                {
                    word[0]?.split("")?.map((letterl)=>(
                        <p className={`bg-[#323232] py-2 px-3 border-b-[1px] border-white ${successLetter.includes(letterl.toUpperCase()) && "text-white"} ${killAttempts.length == 8 && "text-red-500"}`}>{letterl}</p>
                    ))
                }
            </div>
            <div className="grid grid-cols-7 text-black gap-3 text-center">
                {
                    letter.split(",").map((letter)=>(
                        <Button className={`py-3 px-4 border-[1px] border-white bg-yellow-700 text-black ${successLetter.includes(letter) && "bg-green-700"} ${errLetter.includes(letter) && "bg-red-700"}` } disabled={successLetter.includes(letter)|| errLetter.includes(letter) || killAttempts.length == 8} onClick={()=>checkLetter(letter)}>{letter}</Button>
                    ))
                }
            </div>
            {(killAttempts.length == 8 || successLetter.length == word[0]?.split("")?.length) && <Button color="blue" className="mt-5" onClick={()=>getWord()}>New Game</Button>}
        </div>
    )
}

export default App;