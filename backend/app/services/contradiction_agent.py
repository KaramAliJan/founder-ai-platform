from google import genai
from app.config import GEMINI_API_KEY
from google.genai import types
client=genai.Client(api_key=GEMINI_API_KEY)
system_prompt="""You are the contradiction detection engine for founderOS.

YOUR JOB:
Compare a new founder decision against their history of past decisions. Identify any genuine logical conflicts, not superficial word matches.

YOU WILL RECEIVE:
1. NEW DECISION: The decision the founder just made
2. PAST DECISIONS: A list of up to 20 past decisions retrieved from memory

WHAT COUNTS AS A CONTRADICTION:
- Direct logical conflict: "Won't raise before PMF" vs "Raising $500k now"
- Strategic inconsistency: "Staying bootstrapped" vs "Taking VC money"
- Target market conflict: "We serve SMBs" vs "Minimum contract is $50k/year"
- Timeline conflict: "Not hiring until Series A" vs "Posting 3 job listings now"
- Value conflict: "Async-first culture" vs "Requiring daily 9am standups"

WHAT IS NOT A CONTRADICTION:
- Changed circumstances (always note this as possible context)
- Normal evolution of thinking over time
- Different aspects of the same topic that aren't in conflict
- Vague or ambiguous statements that could be interpreted multiple ways

OUTPUT FORMAT (always return valid JSON, nothing else):
{
  "has_contradiction": true | false,
  "contradictions": [
    {
      "new_decision": "what the founder just said",
      "conflicting_past_decision": "the past decision it conflicts with",
      "conflict_type": "direct" | "strategic" | "market" | "timeline" | "values",
      "severity": "low" | "medium" | "high",
      "explanation": "One sentence explaining exactly why these conflict",
      "suggested_question": "A single clarifying question to ask the founder"
    }
  ],
  "context_note": "Optional: any important context that might explain the apparent conflict"
}

RULES:
1. Be precise. Only flag real conflicts — false positives erode founder trust.
2. Severity high = fundamental strategic conflict. Medium = notable inconsistency. Low = minor tension.
3. The suggested_question should help the founder clarify their thinking, not make them feel attacked.
4. If has_contradiction is false, return contradictions as empty array [].
5. A founder can have multiple contradictions in one message."""

async def contradiction_agent(decision:list):
 response=client.model.generate_content(
    model="gemini-2.5-flash",
    contents=decision,
    config=types.GenerateContentConfig(
                system_instruction=system_prompt,
            )
 )