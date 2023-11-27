import { useEffect, useState } from "react"
import Items from "./Components/Items"

import real from './assets/img/club/real.png'
import mancity from './assets/img/club/mancity.png'
import barcelona from './assets/img/club/barcelona.png'
import bayern from './assets/img/club/bayern.png'
import chelsea from './assets/img/club/chelsea.png'
import arsenal from './assets/img/club/arsenal.png'
import dortmund from './assets/img/club/dortmund.png'
import liverpool from './assets/img/club/liverpool.png'
import Swal from "sweetalert2"

const cardItems:cardItemsType=[
    {src:real,matched:false},
    {src:mancity,matched:false},
    {src:barcelona,matched:false},
    {src:bayern,matched:false},
    {src:chelsea,matched:false},
    {src:arsenal,matched:false},
    {src:dortmund,matched:false},
    {src:liverpool,matched:false},
  ]

function App() {

  const [cards,setCards]=useState<cardItemsType>([])
  const [attempt,setAttempt]=useState<number>(0)
  const [firstChoice,setFirstChoice]=useState<itemsType|null>(null)
  const [secondChoice,setSecondChoice]=useState<itemsType|null>(null)
  const [disabled,setDisabled]=useState<boolean>(false)
  const [time,setTime]=useState<number>(0)
  const [endGameState,setEndGameState]=useState<boolean>(false)


  const shuffleCards=()=>{
    const shuffledCards:cardItemsType=[...cardItems,...cardItems]
    .sort(()=>Math.random()-0.5)
    .map((card)=>({...card,id:crypto.randomUUID()}))

    setFirstChoice(null)
    setSecondChoice(null)
    setCards(shuffledCards)
    setAttempt(0)   
    setEndGameState(false)
    setTime(0)
  }

  const restartGame=()=>{
    shuffleCards()
    
  }

  const handleChoice=(card:itemsType)=>{
    firstChoice ? setSecondChoice(card) :setFirstChoice(card)
  }


  const endGame = ()=>{
    const matchedCards=cards.filter(card=>card.matched)
    if(matchedCards.length===16){
      setEndGameState(true)
      Swal.fire({
        title: 'تبریک',
        text: `تبریک شما موفق به پایان بازی شدید در ${time} ثانیه و ${attempt} تلاش`,
        confirmButtonText: 'شروع مجدد',
        icon: 'success',
      }).then(()=>{
        restartGame()
      })
    }
  }

  useEffect(()=>{
    
    if(firstChoice&&secondChoice){
      setDisabled(true)

      if(firstChoice.src === secondChoice.src){
        setCards(prevCard=>{
          return prevCard.map(card=>{
            if(card.src === firstChoice.src){
              return{...card,matched:true}
            }else{
              return card
            }
          })
        })
       reset() 
      }else{
      setTimeout(()=>reset(),1000)
    }
  }
  endGame()
  },[firstChoice,secondChoice])
  
  useEffect(()=>{
    shuffleCards()
  },[])

  useEffect(() => {
    const timer = setInterval(() => {
        setTime((prev:number) =>prev+1);
      }, 1000);
      if(endGameState){
        endGame()
        clearInterval(timer as number)
      }
    return () => clearInterval(timer as number);
  }, [time]);


  const reset=()=>{
    setFirstChoice(null)
    setSecondChoice(null)
    setAttempt(prev=>prev+1)
    setDisabled(false)
  }

  return (
    <>
      <div className="container mx-auto flex flex-col items-center mt-10">
        <div className="py-2 px-6 border mb-3 border-sky-500 text-sky-950 ">
          <span className="font-medium text-2xl rounded">{`مدت : ${time} ثانیه`}</span>
        </div>
        <div className="bg-sky-800 w-[350px] h-[350px] lg:w-[850px] lg:h-[850px] p-5 lg:p-10 flex justify-center items-center shadow-lg rounded">
          <div className="grid grid-cols-4 gap-y-4 gap-x-4 lg:gap-x-6">

            {cards.map(item=>{
              return<Items
                key={item.id}
                item={item}
                handleChoice={handleChoice}
                disabled={disabled}
                flipped={item===firstChoice || item===secondChoice || item.matched}
              />
            })}
          </div>
        </div>
        <p className="font-medium text-lg mt-4  text-sky-950">تعداد تلاش ها : {attempt}</p>
        <button onClick={()=>restartGame()} className="bg-sky-400 text-slate-200 p-2 rounded mt-3 font-medium text-2xl">
          شروع دوباره
        </button>
      </div>
    </>
  )
}

export default App
