import { useState, useEffect, use } from "react";
import "../index.css"
function TypeWriter({text,speed}){

    useEffect(()=>{
        let index = 0;
        const interval = setInterval(() => {
            if (index < text.length) {
                setDisplayText(() => text.slice(0, index + 1));
                index++;
            } else {
                clearInterval(interval);
            }
        }, speed);
        return () => clearInterval(interval);
    },[text,speed]);

    const [displayedText, setDisplayText] = useState("");



    return (
    <div className="text-xl text-white font-semibold border-r-4 blinking-border pr-1 whitespace-pre-wrap">
      {displayedText}
    </div>
  );}

export default TypeWriter