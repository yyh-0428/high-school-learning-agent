export type DifficultyLevel = "beginner" | "intermediate" | "advanced";

export interface LearningMethod {
  id: string;
  title: {
    zh: string;
    en: string;
  };
  hook: string;
  description: string;
  steps: string[];
  recommendedSubjects: string[];
  difficulty: DifficultyLevel;
  timePerSession: string;
  icon: string;
}

export type ChatMode = "quick" | "deep";

export interface ChatMessage {
  id: string;
  role: "user" | "agent";
  content: string;
  timestamp: Date;
}

export interface Conversation {
  id: string;
  title: string;
  messageIds: string[];
  updatedAt: Date;
}

export interface StudyPlanItem {
  id: string;
  time: string;
  subject: string;
  method: string;
  goal: string;
  break: string;
  completed: boolean;
}

export interface AgentPersona {
  name: {
    chinese: string;
    english: string;
    alias: string;
  };
  persona: string;
  greetings: string[];
}

export interface ExampleConversation {
  topic: string;
  student: string;
  agent: string;
}
