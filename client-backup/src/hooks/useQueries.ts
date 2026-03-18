import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api/axios';
import type { Profile, CareerQuizResult, Scholarship, Internship, ChatMessage } from '../backend';

// ========== Profile ==========
export const useGetCallerUserProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data } = await api.get('/profile');
      return data as Profile;
    },
  });
};

export const useSaveCallerUserProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (profile: Profile) => {
      const { data } = await api.put('/profile', profile);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
};

// ========== Quiz ==========
export const useGetCareerQuizQuestions = () => {
  return useQuery({
    queryKey: ['quizQuestions'],
    queryFn: async () => {
      const { data } = await api.get('/quiz/questions');
      return data;
    },
  });
};

export const useSubmitCareerQuiz = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (answers: number[]) => {
      const { data } = await api.post('/quiz/submit', { answers });
      return data as CareerQuizResult;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quizResult'] });
    },
  });
};

export const useGetCareerQuizResult = () => {
  return useQuery({
    queryKey: ['quizResult'],
    queryFn: async () => {
      const { data } = await api.get('/quiz/result');
      return data as CareerQuizResult | null;
    },
  });
};

// ========== Scholarships ==========
export const useGetAllScholarships = () => {
  return useQuery({
    queryKey: ['scholarships'],
    queryFn: async () => {
      const { data } = await api.get('/scholarships');
      return data as Scholarship[];
    },
  });
};

export const useGetSavedScholarships = () => {
  return useQuery({
    queryKey: ['savedScholarships'],
    queryFn: async () => {
      const { data } = await api.get('/scholarships/saved');
      return data as string[];
    },
  });
};

export const useSaveScholarship = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (title: string) => {
      const { data } = await api.post('/scholarships/save', { title });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['savedScholarships'] });
    },
  });
};

// ========== Internships ==========
export const useGetAllInternships = () => {
  return useQuery({
    queryKey: ['internships'],
    queryFn: async () => {
      const { data } = await api.get('/internships');
      return data as Internship[];
    },
  });
};

export const useGetSavedInternships = () => {
  return useQuery({
    queryKey: ['savedInternships'],
    queryFn: async () => {
      const { data } = await api.get('/internships/saved');
      return data as string[];
    },
  });
};

export const useSaveInternship = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (title: string) => {
      const { data } = await api.post('/internships/save', { title });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['savedInternships'] });
    },
  });
};

// ========== Mock Tests ==========
export const useGetMockTest = (subject: string) => {
  return useQuery({
    queryKey: ['mockTest', subject],
    queryFn: async () => {
      const { data } = await api.get(`/mocktest/questions/${subject}`);
      return data;
    },
    enabled: !!subject,
  });
};

export const useSubmitMockTest = () => {
  return useMutation({
    mutationFn: async ({ subject, answers }: { subject: string; answers: number[] }) => {
      const { data } = await api.post('/mocktest/submit', { subject, answers });
      return data;
    },
  });
};

// ========== Chatbot ==========
export const useGetChatHistory = () => {
  return useQuery({
    queryKey: ['chatHistory'],
    queryFn: async () => {
      const { data } = await api.get('/chatbot/history');
      return data as ChatMessage[];
    },
  });
};

export const useSendMessage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (message: string) => {
      const { data } = await api.post('/chatbot/message', { message });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chatHistory'] });
    },
  });
};