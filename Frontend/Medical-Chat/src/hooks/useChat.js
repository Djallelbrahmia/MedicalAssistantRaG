import { useQueryClient } from "@tanstack/react-query";
import { useMutation, useQuery } from "@tanstack/react-query";

import { getChatHistory, sendMessage } from "../services/chatApi";
import { useNavigate } from 'react-router-dom';

export function useChat() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const handleUnauthorized = () => {
    queryClient.removeQueries({ queryKey: ["token"], exact: true });
    queryClient.removeQueries({ queryKey: ["chatHistory"], exact: true });
    navigate("/");
  };
    const token = localStorage.getItem("token");
    const getChatHistoryWithToken = async () => {
    try {
        return await getChatHistory(token);
      } catch (error) {
        if (error.message === "Unauthorized") {
          handleUnauthorized();
        }
        throw error; 
      }        }
    const { isLoading:sending, error:sendError, mutate:sendMessageMutation } = useMutation({
    mutationFn: async (message)=>{
      const token=  queryClient.getQueryData(["token"]);
        if(!token) throw new Error("No token found");
        return await sendMessage(message, token);
    },
    onError : (error) => {
    if (error.message === "Unauthorized") {


      handleUnauthorized();
    
    }        },
    onSuccess: (data) => {
        queryClient.invalidateQueries(["chatHistory"]);
        return data;
    }},
    );
const {isLoading: loadingHistory, data: chatHistory, error: historyError} = useQuery({
    queryKey: ["chatHistory"],
    queryFn: getChatHistoryWithToken,}
)
return {
    sending,
    sendError,
    sendMessage: sendMessageMutation,
    loadingHistory,
    chatHistory,
    historyError,
  };
}