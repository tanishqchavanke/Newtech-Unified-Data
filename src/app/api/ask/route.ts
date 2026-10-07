import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { question, datasetSummary } = await request.json();

    if (!question) {
      return NextResponse.json({ error: 'Question is required' }, { status: 400 });
    }

    const apiKey = process.env.AI_API_KEY;

    // If an external AI API key is configured server-side, we can communicate with it
    if (apiKey) {
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `You are the business data assistant for N.U.D (Newtech Unified Data).
Tagline: One Platform. Infinite Insights.
Answer the user's question simply, clearly, and concisely based strictly on the provided dataset summary.
Do not use technical jargon or complicated data science terms.
If information is missing, politely say so.

Dataset Summary:
${JSON.stringify(datasetSummary, null, 2)}

User Question: ${question}

Provide your response in clear, friendly plain language. Format numbers cleanly (e.g. ₹ or percentages).`,
                  },
                ],
              },
            ],
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const answerText = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (answerText) {
            return NextResponse.json({ text: answerText });
          }
        }
      } catch (e) {
        // Fall back to local engine response if external call fails
      }
    }

    // Return empty so client falls back to instant local analytical engine
    return NextResponse.json({ text: null });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal error' }, { status: 500 });
  }
}
