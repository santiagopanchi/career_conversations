"use client";

import styles from "./page.module.css";
import { useState } from "react";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export default function Home() {
  const [scenario, setScenario] = useState("");
  const [output, setOutput] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<ChatMessage[]>([]);

  async function handleGenerate() {
    if (isLoading || !scenario.trim()) return;

    // keep prior requirement
    // eslint-disable-next-line no-console
    console.log("hello");

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: scenario, history }),
      });

      if (!response.ok) {
        throw new Error(`Request failed with ${response.status}`);
      }

      // Parse JSON and show only the `reply` property when present
      let parsed: unknown;
      try {
        parsed = await response.json();
      } catch (_) {
        parsed = await response.text();
      }

      const text =
        parsed && typeof parsed === "object" && "reply" in (parsed as any)
          ? String((parsed as any).reply)
          : typeof parsed === "string"
          ? parsed
          : JSON.stringify(parsed, null, 2);

      // Update history with user message and assistant reply
      setHistory((prev) => [
        ...prev,
        { role: "user", content: scenario },
        { role: "assistant", content: text },
      ]);

      setOutput(text);
      setScenario("");
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Unknown error";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={styles.page}>
      <main className={styles.mainCentered}>
        <div className={styles.avatar} aria-label="matrix animation">
          <img src="/matrix.gif" alt="Matrix animation" className={styles.matrixImage} />
        </div>
        <h2 className={styles.title}>Twin AI Example.</h2>

        <div className={styles.inputGroup}>
          <textarea
            className={styles.textarea}
            rows={5}
            placeholder="Ask your questions about me."
            value={scenario}
            onChange={(e) => setScenario(e.target.value)}
            onKeyDown={(e) => {
              // Submit on Enter (Shift+Enter creates a new line)
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleGenerate();
              }
            }}
          />
        </div>

        <button className={styles.generateButton} onClick={handleGenerate} disabled={isLoading}>
          {isLoading ? "Generating Answer..." : "Ask Question"}
        </button>

        {(output || error) && (
          <section className={styles.outputSection} aria-live="polite">
            <h3 className={styles.outputTitle}>From Santiago's AI Twin </h3>
            <pre className={styles.outputBox}>
{output ? output : `Error: ${error}`}
            </pre>
          </section>
        )}
      </main>
    </div>
  );
}
