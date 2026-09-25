export function AbstractMark({ label }: { label: string }) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-md">
      <div
        aria-hidden="true"
        className="absolute -top-6 -left-4 h-28 w-28 rounded-full bg-teal/15 blur-2xl"
      />
      <div
        aria-hidden="true"
        className="absolute right-0 -bottom-8 h-32 w-32 rounded-full bg-cobalt/15 blur-2xl"
      />
      <svg
        viewBox="0 0 360 360"
        role="img"
        aria-label={label}
        className="relative h-full w-full"
      >
        <circle cx="180" cy="180" r="176" fill="#fffef6" />
        <circle
          cx="180"
          cy="180"
          r="148"
          fill="none"
          stroke="#e8c4bc"
          strokeWidth="1.5"
          opacity="0.7"
        />
        <circle
          cx="180"
          cy="180"
          r="112"
          fill="none"
          stroke="#d6c4d4"
          strokeWidth="1"
          opacity="0.65"
        />
        <circle cx="96" cy="118" r="11" fill="#e8c4bc" />
        <circle cx="186" cy="82" r="8" fill="#f3d5cc" />
        <circle cx="268" cy="128" r="11" fill="#d6c4d4" />
        <circle cx="108" cy="228" r="8" fill="#c9b7c8" />
        <circle cx="204" cy="198" r="13" fill="#d4b8b0" />
        <circle cx="272" cy="248" r="8" fill="#f3d5cc" />
        <path
          d="M96 118 L186 82 L268 128 L204 198 L108 228 L96 118 M204 198 L272 248 L268 128"
          fill="none"
          stroke="#4e4540"
          strokeWidth="1.6"
          opacity="0.72"
        />
        <text
          x="180"
          y="312"
          textAnchor="middle"
          fill="#4e4540"
          fontSize="42"
          fontWeight="700"
          fontFamily="var(--font-outfit), sans-serif"
        >
          CCS
        </text>
      </svg>
    </div>
  );
}
