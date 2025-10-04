import PopupDiv from '../components/PopupDiv'
import TypeWriter from '../components/TypeWriter'
import StyledButton from '../components/StyledButton'
import '../index.css'
import { useStartChat } from '../hooks/useStartChat';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();
  const { isLoading, startChatMutation } = useStartChat();

  const handleClick = () => {
    startChatMutation(undefined, {
      onSuccess: () => {
        navigate("/chat");
      },
    });
  };
  const features = [
    { title: "AI-Powered Chatbot", description: "Get instant answers to your medical questions with our advanced AI chatbot, designed to provide accurate and reliable information." },
    { title: "24/7 Availability", description: "Access medical advice and support anytime, anywhere, ensuring you have the help you need when you need it." },
    { title: "User-Friendly Interface", description: "Enjoy a seamless and intuitive experience with our easy-to-use chat interface, making it simple to get the information you need." },
    { title: "Confidential and Secure", description: "Your privacy is our priority. All interactions are confidential and protected with the highest security standards." },
    { title: "Comprehensive Medical Information", description: "Explore a wide range of medical topics, from symptoms and treatments to wellness tips and preventive care." },
    { title: "Personalized Responses", description: "Receive tailored advice based on your specific health concerns and questions, ensuring relevant and useful information." },
    { title: "Multilingual Support", description: "Communicate in your preferred language with our multilingual chatbot, breaking down language barriers in healthcare." },
    { title: "Regular Updates", description: "Stay informed with the latest medical research and health guidelines, as our AI is continuously updated with new information." }
  ];

  return (
    <div className="w-screen min-h-screen bg-blue-950 m-0 p-0 flex flex-col items-center">
      <div className="font-bold mt-12 w-[90%] md:w-[60%] text-center text-lg md:text-lg leading-relaxed">
        <TypeWriter 
          text="Need quick answers to health questions or guidance on medical concerns? MediAssist is here to help. Our AI-powered chatbot provides reliable, easy-to-understand medical information and support anytime, anywhere." 
          speed={30} 
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 px-6 w-full max-w-5xl">
        {features.map((feature, index) => (
          <PopupDiv 
            mainText={feature.title} 
            subText={feature.description} 
            key={index} 
          />
        ))}
      </div>

      <div className="mt-20 p-8 w-full flex justify-center">
        <StyledButton 
          text={isLoading ? "Starting Chat..." : "Start Chatting with MediAssist"}
          onClick={handleClick} 
          className="w-[80%] md:w-[30%] glow-btn"
          aria-label="Start chatting with MediAssist AI chatbot"
        />
      </div>
    </div>
  );
}

export default LandingPage;
