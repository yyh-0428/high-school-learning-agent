import { type ChatMode } from "@/lib/types";

export interface AgentDefinition {
  id: string;
  name: string;
  systemPrompt: string;
  keywords: string[];
  generateReply: (input: string, mode: ChatMode) => string;
}

const conceptTutor: AgentDefinition = {
  id: "conceptTutor",
  name: "知识点讲解小智",
  systemPrompt:
    "你是一位耐心细致的知识点讲解老师，擅长把高中知识点拆成容易理解的小块。用类比、步骤和例题帮助学生搞懂概念，语气亲切自然，不堆砌术语。",
  keywords: [
    "知识点",
    "概念",
    "公式",
    "定理",
    "怎么算",
    "为什么",
    "物理",
    "数学",
    "化学",
    "生物",
    "英语语法",
    "历史",
    "地理",
    "政治",
  ],
  generateReply: (input, mode) => {
    if (mode === "deep") {
      return `我们把这个知识点拆细一点讲。\n\n首先，你要明确它背后的“核心思想”：很多公式其实都在描述同一个关系，先别急着代数字。其次，找一道课本例题，遮住答案自己推一遍，推不通的地方就是你真正的卡点。最后，用一句话把今天学到的讲给自己听，能讲清楚才算真懂。\n\n你刚才提到“${input.slice(0, 20)}…”，具体是卡在理解上，还是做题不会用？`;
    }
    return `这个知识点我来帮你理一理：先回忆它的定义和公式，再找一个简单例子套进去，最后对比它和以前学过的有什么区别。\n\n关于“${input.slice(0, 20)}…”，你能告诉我具体哪一步没想通吗？`;
  },
};

const studyPlanner: AgentDefinition = {
  id: "studyPlanner",
  name: "学习计划小智",
  systemPrompt:
    "你是一位擅长时间管理和目标拆解的学习规划师。帮高中生把大目标拆成每天能完成的小任务，给出具体、可执行的计划，语气鼓励但不施压。",
  keywords: [
    "计划",
    "安排",
    "复习",
    "备考",
    "期中",
    "期末",
    "高考",
    "时间表",
    "规划",
    "每天",
    "周计划",
    "目标",
  ],
  generateReply: (input, mode) => {
    if (mode === "deep") {
      return `来，我们做一个能落地的计划：\n\n1. 先列出所有科目，按“最薄弱 → 最有把握”排序。\n2. 给每科分配固定时间段，薄弱科目优先安排在精力最好的时段。\n3. 每个学习块只做一个具体任务，比如“做完函数单调性 5 道题”。\n4. 每天留 15 分钟复盘：完成了什么、没完成的原因是什么。\n\n你说“${input.slice(0, 20)}…”，可以告诉我你从现在到考试还有多久、每天能拿出几小时学习吗？`;
    }
    return `计划的关键是“少而具体”。今晚先列出 3 件必须完成的事，按重要程度排序，完成一件勾掉一件。\n\n关于“${input.slice(0, 20)}…”，你更想先做长期规划，还是先解决今天的安排？`;
  },
};

const motivationCoach: AgentDefinition = {
  id: "motivationCoach",
  name: "动力鼓励小智",
  systemPrompt:
    "你是一位温暖的心理支持者，理解高中生的压力和疲惫。用轻松的语气帮他们接纳情绪、找回动力，强调“先迈出一小步”，不说教、不施压。",
  keywords: [
    "累",
    "不想学",
    "动力",
    "坚持",
    "焦虑",
    "压力",
    "迷茫",
    "没劲",
    "摆烂",
    "emo",
    "烦躁",
    "崩溃",
    "鼓励",
  ],
  generateReply: (input, mode) => {
    if (mode === "deep") {
      return `先深呼吸一下。学习不是一场永远冲刺的马拉松，累了停下来不是失败，是为了走得更远。\n\n我们可以这样做：\n1. 允许自己休息 10 分钟，离开书桌。\n2. 今天只定一个“最小目标”，比如背 5 个单词或弄懂 1 道错题。\n3. 完成后对自己说“我已经做到了一小步”，不需要立刻加码。\n\n你愿意和我聊聊，最近是什么让你感到“${input.slice(0, 20)}…”吗？`;
    }
    return `累了就先歇一下，别硬撑。动力像潮水，有高有低很正常。我们今天只做一件最小的事，完成后再决定要不要继续，好吗？\n\n你提到“${input.slice(0, 20)}…”，要不要我陪你一起定一个今天的小目标？`;
  },
};

const generalHelper: AgentDefinition = {
  id: "generalHelper",
  name: "学伴小智",
  systemPrompt:
    "你是一位温暖、耐心的 AI 学习伙伴，像一位比学生大几岁的大朋友。无论学习、情绪还是方法问题，都愿意倾听并给出实用建议，语气轻松自然。",
  keywords: [],
  generateReply: (input, mode) => {
    if (mode === "deep") {
      return `这个角度很有意思，我想多了解你一点。\n\n你现在是在高中阶段吗？最近主要在忙哪一科？你说的“${input.slice(0, 20)}…”是学习方法上的困惑，还是某个具体知识点卡住了？\n\n告诉我多一点，我才能给你更贴切的建议。`;
    }
    return `没问题，我们可以一点点来。先告诉我，你今天最想解决的学习问题是什么？\n\n或者换个说法：你说的“${input.slice(0, 20)}…”里，最让你头疼的是哪一部分？`;
  },
};

export const agents: Record<string, AgentDefinition> = {
  conceptTutor,
  studyPlanner,
  motivationCoach,
  generalHelper,
};

export const agentList: AgentDefinition[] = [
  conceptTutor,
  studyPlanner,
  motivationCoach,
  generalHelper,
];

export function routeAgent(input: string): AgentDefinition {
  const normalized = input.toLowerCase().trim();

  const scored = agentList
    .filter((agent) => agent.keywords.length > 0)
    .map((agent) => {
      const score = agent.keywords.reduce((total, keyword) => {
        if (normalized.includes(keyword.toLowerCase())) {
          return total + 1;
        }
        return total;
      }, 0);
      return { agent, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score);

  return scored[0]?.agent ?? generalHelper;
}

export function generateReply(
  input: string,
  options?: { mode?: ChatMode }
): Promise<string> {
  const mode = options?.mode ?? "quick";
  const agent = routeAgent(input);

  return new Promise((resolve) => {
    const delay = mode === "deep" ? 1200 : 600;
    setTimeout(() => {
      resolve(agent.generateReply(input, mode));
    }, delay + Math.random() * 400);
  });
}
