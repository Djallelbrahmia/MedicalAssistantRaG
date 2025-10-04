import "../index.css"

function PopupDiv({ mainText, subText }) {
  return (
    <div className="slide-down flex flex-col md:flex-row items-start md:items-center gap-2 p-3 rounded-lg">
      {/* Title */}
      <div className="font-bold mainTextpopup md:mr-2 text-base md:text-lg">
        {mainText}:
      </div>
      
      {/* Description */}
      <div className="font-light text-sm md:text-base leading-relaxed">
        {subText}
      </div>
    </div>
  )
}

export default PopupDiv
