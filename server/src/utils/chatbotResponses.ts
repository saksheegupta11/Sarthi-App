type Rule = {
  keywords: string[];
  response: string;
};

const rules: Rule[] = [
  {
    keywords: ["hi", "hello", "hey", "namaste"],
    response: `Namaste! 🙏 Welcome to Sarthi AI. How can I help you today?`,
  },
  {
    keywords: ["career", "job", "which field"],
    response: `I can help you explore careers! What stream are you interested in? (Science, Commerce, Arts)`,
  },
];

const DEFAULT_RESPONSE = `I'm here to help with career and education guidance. Please ask me about streams, exams, scholarships, or study tips.`;

export function getChatbotResponse(message: string): string {
  const normalized = message.toLowerCase().trim();
  for (const rule of rules) {
    for (const keyword of rule.keywords) {
      const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`(^|\\s)${escaped}(\\s|$)`);
      if (regex.test(normalized)) {
        return rule.response;
      }
    }
  }
  return DEFAULT_RESPONSE;
}