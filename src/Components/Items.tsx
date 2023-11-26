import './items.css'

function Items({ item, handleChoice, disabled, flipped }: ItemsProps) {

  const handleClick = () => {
    if (!disabled) {
      handleChoice(item);
    }
  };

  return (
    <>
      <div className="scene scene--card w-[70px] h-[70px] lg:w-44 lg:h-44">
        <div className={`card ${flipped ? 'is-flipped' : ''}`}>
          <div className="card__face bg-sky-500 w-[70px] h-[70px] lg:w-44 lg:h-44 " onClick={handleClick}/>
          <div className="card__face card__face--back bg-sky-400"><img src={item.src} alt="" className="w-[70px] h-[70px] lg:w-44 lg:h-44 transition "/></div>
        </div>
      </div>
    </>
  );
}

export default Items;
