import '../index.css';

function StyledButton({ text, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`
        glow-btn
        px-6 py-3
        bg-blue-700 
        text-white font-semibold
        rounded-2xl
        border border-blue-400
        transition-transform duration-200 ease-in-out
        hover:scale-105 hover:skew-x-2 hover:skew-y-2
        hover:bg-blue-600 hover:border-blue-300
        active:scale-95
        ${className}
      `}
    >
      {text}
    </button>
  );
}

export default StyledButton;