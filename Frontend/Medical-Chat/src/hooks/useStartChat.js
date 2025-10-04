import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { startChat } from "../services/chatApi";

export function useStartChat() {
  const queryClient = useQueryClient();
  const TOKEN_KEY = "token";

  const EXPIRY_KEY = "token_expiry";
  const TOKEN_TTL = 24 * 60 * 60 * 1000; 

  function getStoredToken() {
    const token = localStorage.getItem(TOKEN_KEY);
    const expiry = localStorage.getItem(EXPIRY_KEY);

    if (!token || !expiry) return null;

    const now = Date.now();
    if (now > Number(expiry)) {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(EXPIRY_KEY);
      return null;
    }

    return token;
  }


    async function fetchOrCreateToken() {
    let token = getStoredToken();
    if (!token) {
      const data = await startChat();
      token = data.token;
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(EXPIRY_KEY, String(Date.now() + TOKEN_TTL));
    }
    return token;
  }

  const {
    isLoading,
    error: mutationError,
    mutate: startChatMutation,
  } = useMutation({
    mutationFn:  fetchOrCreateToken,
    onSuccess: (token) => {
      queryClient.setQueryData(["token"], token);

    },
  });

  const { data: token, error: queryError } = useQuery({
    queryKey: ["token"],
    queryFn: fetchOrCreateToken,
  });

  return {
    isLoading,
    token,
    error: mutationError || queryError || null,
    startChatMutation,
  };
}
