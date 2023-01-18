import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [promptInput, setPromptInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ promptInput: promptInput }),
    });
    let data = await response.json();
    console.log("DATA", data);
    setResult(data.result);
    setPromptInput("");
  }

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <img src="/dog.png" className={styles.icon} />
        <h3>Code generator</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="prompt"
            placeholder="Enter a prompt"
            value={promptInput}
            onChange={(e) => setPromptInput(e.target.value)}
          />
          <input type="submit" value="Generate response" />
        </form>
        {/* embed a code editor */}
        <div className={styles.code}>
          <textarea
            id="code"
            rows="20"
            cols="70"
            value={result}
            // onChange={(e) => setResult(e.target.value)}
          ></textarea>
        </div>
        {/* <div className={styles.code}>{result}</div> */}
      </main>
    </div>
  );
}
