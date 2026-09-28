import {GoogleGenerativeAI} from "@google/generative-ai";

const genAI=process.env.GEMINI_API_KEY
  ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  : null;

/**
 * Generate an AI hint for a debugging problem.
 * Falls back to hardcoded hints if Gemini is not available.
 */
export const generateHint = async ({ problemStatement, buggyCode, currentCode, hintLevel, hints }) => {
  // If we have pre-defined hints for this level, use them as fallback
  const fallbackHint = hints && hints[hintLevel - 1]
    ? hints[hintLevel - 1]
    : getGenericFallbackHint(hintLevel);

  // If Gemini API key is not configured, use fallback
  if (!genAI) {
    console.log("Gemini API key not configured, using fallback hint");
    return fallbackHint;
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const levelDescriptions = {
      1: "Give a very small, subtle nudge. Do NOT reveal the bug directly. Just hint at which area to look at. Keep it to 1-2 sentences.",
      2: "Give a moderate hint pointing toward the type of bug and the general location. Do NOT give the fix. Keep it to 2-3 sentences.",
      3: "Give a strong hint that clearly describes the nature of the bug without directly providing the corrected code. Keep it to 2-3 sentences.",
    };

    const prompt = `You are an AI debugging assistant for a coding education platform called CodeCrime.

A student is working on the following JavaScript debugging problem:

**Problem Statement:**
${problemStatement}

**Original Buggy Code:**
\`\`\`javascript
${buggyCode}
\`\`\`

**Student's Current Code:**
\`\`\`javascript
${currentCode}
\`\`\`

**Hint Level:** ${hintLevel} out of 3

**Instructions:** ${levelDescriptions[hintLevel] || levelDescriptions[1]}

Respond with ONLY the hint text. Do not include any markdown formatting, code blocks, or explanations beyond the hint itself.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return text.trim() || fallbackHint;
  } catch (error) {
    console.error("Gemini API error:", error.message);
    return fallbackHint;
  }
};

function getGenericFallbackHint(level) {
  switch (level) {
    case 1:
      return "Look carefully at the loop boundaries in the code.";
    case 2:
      return "Check whether the loop condition might cause the code to access an element that doesn't exist.";
    case 3:
      return "In JavaScript, array indices go from 0 to length - 1. Make sure your loop doesn't go past the last valid index.";
    default:
      return "Review the code carefully and think about edge cases.";
  }
}
