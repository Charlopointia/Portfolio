import { useEffect, useRef, useState } from "react";
import "./CodeBackground.css";

type CodeLine = {
  id: number;
  text: string;
};

const verses: string[] = [
  `<section class="scripture">In the beginning God created the heaven and the earth.</section>`,
  `<p class="light">And God said, Let there be light: and there was light.</p>`,
  `<span class="truth">The light shineth in darkness; and the darkness comprehended it not.</span>`,
  `<div class="faith">For now we see through a glass, darkly; but then face to face.</div>`,
  `<article class="strength">Be strong and of a good courage, be not afraid.</article>`,
  `<code class="heart">For where your treasure is, there will your heart be also.</code>`,
  `<p class="seek">Ask, and it shall be given you; seek, and ye shall find.</p>`,
  `<section class="above">Set your affection on things above, not on things on the earth.</section>`,
  `<p class="invictus">Out of the night that covers me,Black as the pit from pole to pole,</p>`,
  `<article class="victory">It matters not how strait the gate,</article>`,
  `<p class="invictus">How charged with punishments the scroll,I am the master of my fate :</p>`,
  `<div class="victory">I am the captain of my soul.</div>`,
  `<div class="Laboetie">What makes a friend trustworthy is knowing their integrity.</div>`,
  `<div class="Friendly">This is guaranteed by their good nature, loyalty, and consistency.</div>`,
  `<p class="liberty">But this tyrant alone, there is no need to fight him or overthrow him.</p>`,
  `<p class="free">He is defeated of his own accord provided that the country does not consent to his servitude.</p>`,
  `<div class="heart">I am the alpha and the omega.</div>`,
];

export default function CodeBackground() {
  const [lines, setLines] = useState<CodeLine[]>([]);
  const [typed, setTyped] = useState<string>("");

  const lineIndexRef = useRef<number>(0);
  const charIndexRef = useRef<number>(0);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const typeNextChar = () => {
      const currentLine = verses[lineIndexRef.current % verses.length];
      const nextIndex = charIndexRef.current + 1;

      setTyped(currentLine.slice(0, nextIndex));
      charIndexRef.current = nextIndex;

      if (nextIndex < currentLine.length) {
        timeoutRef.current = window.setTimeout(typeNextChar, 12);
        return;
      }

      timeoutRef.current = window.setTimeout(() => {
        setLines((prev) =>
          [
            ...prev,
            {
              id: Date.now(),
              text: currentLine,
            },
          ].slice(-22)
        );

        setTyped("");
        charIndexRef.current = 0;
        lineIndexRef.current += 1;

        typeNextChar();
      }, 300);
    };

    timeoutRef.current = window.setTimeout(typeNextChar, 500);

    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="code-bg" aria-hidden="true">
      <div className="code-bg-gradient" />
      <div className="code-bg-scanlines" />

      <div className="code-bg-content">
        {lines.map((line, index) => (
          <div
            key={line.id}
            className="code-bg-line"
            style={{
              opacity: 0.18 + index * 0.025,
            }}
          >
            {line.text}
          </div>
        ))}

        <div className="code-bg-line code-bg-active">
          {typed}
          <span className="code-bg-cursor">_</span>
        </div>
      </div>
    </div>
  );
}
