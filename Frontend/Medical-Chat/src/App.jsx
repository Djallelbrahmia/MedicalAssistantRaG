import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/landing_page";
import ChatPage from "./pages/ChatPage";
import {QueryClientProvider, QueryClient} from "@tanstack/react-query"
import {ReactQueryDevtools} from "@tanstack/react-query-devtools"

const queryClient=new QueryClient({
    defaultOptions:{
        queries:{
staleTime:1000*60,
        }} })
function App(){
 return   <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools initialIsOpen={false}/>
 <div className="flex flex-col">

        <BrowserRouter>
        <Navbar />

        <Routes>
                <Route path="/" element={<LandingPage />}></Route>
                <Route path="/chat" element={<ChatPage />}></Route>


        </Routes>
        </BrowserRouter>
       
    </div>
    </QueryClientProvider>
    
}
export default App