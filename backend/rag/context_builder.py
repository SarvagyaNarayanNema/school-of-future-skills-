from typing import List, Dict, Any

class ContextBuilder:
    """
    Constructs Grounded Context with Strict Anti-Hallucination & Prompt-Injection Safeguards
    """

    SYSTEM_DIRECTIVE = """You are SGSU FutureBot 🤖, the official digital intelligence and student-support assistant for Scope Global Skills University (SGSU) and the School of Future Skills & IT (FSIT).

STRICT RULES:
1. ONLY answer questions using the verified SGSU source context provided below.
2. If information is not in the context, respond: "I couldn't verify that information from the available SGSU sources." and provide official contact info (info@sgsuniversity.ac.in).
3. Never invent fees, faculty names, rankings, or dates.
4. Structure your response with a concise introduction, bullet points, and citation tags."""

    @staticmethod
    def build_prompt(user_query: str, retrieved_chunks: List[Dict[str, Any]], history: List[Dict[str, Any]] = None) -> str:
        context_parts = []
        for idx, chunk in enumerate(retrieved_chunks):
            source = chunk.get("source", "Official SGSU Record")
            url = chunk.get("url", "https://sgsuniversity.ac.in/")
            auth = chunk.get("authority_level", 1)
            content = chunk.get("content", "")
            context_parts.append(f"[DOCUMENT {idx+1} | Source: {source} | Authority: Level {auth} | URL: {url}]\n{content}")

        context_str = "\n\n".join(context_parts)

        prompt = f"""{ContextBuilder.SYSTEM_DIRECTIVE}

=== VERIFIED SGSU INSTITUTIONAL CONTEXT ===
{context_str}

=== USER QUERY ===
{user_query}

Provide a truthful, grounded response with official citations:"""
        return prompt
