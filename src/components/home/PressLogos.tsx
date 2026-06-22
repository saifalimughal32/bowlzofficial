type LogoProps = {
  className?: string;
};

export function WashingtonPostLogo({ className = "h-8 w-auto md:h-9" }: LogoProps) {
  return (
    <svg
      viewBox="0 0 220 36"
      className={className}
      role="img"
      aria-label="The Washington Post"
    >
      <text
        x="110"
        y="26"
        textAnchor="middle"
        fill="currentColor"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="17"
        fontWeight="700"
      >
        The Washington Post
      </text>
    </svg>
  );
}

export function NewYorkTimesLogo({ className = "h-10 w-auto md:h-11" }: LogoProps) {
  return (
    <svg
      viewBox="0 0 120 52"
      className={className}
      role="img"
      aria-label="The New York Times"
    >
      <text
        x="60"
        y="14"
        textAnchor="middle"
        fill="currentColor"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="11"
        fontWeight="700"
      >
        The
      </text>
      <text
        x="60"
        y="30"
        textAnchor="middle"
        fill="currentColor"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="13"
        fontWeight="700"
      >
        New York
      </text>
      <text
        x="60"
        y="46"
        textAnchor="middle"
        fill="currentColor"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="15"
        fontWeight="700"
      >
        Times
      </text>
    </svg>
  );
}

export function ForbesLogo({ className = "h-7 w-auto md:h-8" }: LogoProps) {
  return (
    <svg
      viewBox="0 0 120 32"
      className={className}
      role="img"
      aria-label="Forbes"
    >
      <text
        x="60"
        y="24"
        textAnchor="middle"
        fill="currentColor"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="26"
        fontWeight="400"
        letterSpacing="0.04em"
      >
        Forbes
      </text>
    </svg>
  );
}

export function IncLogo({ className = "h-8 w-auto md:h-9" }: LogoProps) {
  return (
    <svg
      viewBox="0 0 72 32"
      className={className}
      role="img"
      aria-label="Inc."
    >
      <text
        x="36"
        y="26"
        textAnchor="middle"
        fill="currentColor"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="30"
        fontWeight="900"
      >
        Inc.
      </text>
    </svg>
  );
}

export function HighTimesLogo({ className = "h-8 w-auto md:h-9" }: LogoProps) {
  return (
    <svg
      viewBox="0 0 150 32"
      className={className}
      role="img"
      aria-label="High Times"
    >
      <text
        x="75"
        y="24"
        textAnchor="middle"
        fill="currentColor"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="22"
        fontWeight="700"
        letterSpacing="0.02em"
      >
        High Times
      </text>
    </svg>
  );
}

export function RollingStoneLogo({ className = "h-7 w-auto md:h-8" }: LogoProps) {
  return (
    <svg
      viewBox="0 0 170 32"
      className={className}
      role="img"
      aria-label="Rolling Stone"
    >
      <text
        x="85"
        y="24"
        textAnchor="middle"
        fill="currentColor"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="20"
        fontWeight="700"
        letterSpacing="0.03em"
      >
        Rolling Stone
      </text>
    </svg>
  );
}

export function WiredLogo({ className = "h-7 w-auto md:h-8" }: LogoProps) {
  return (
    <svg
      viewBox="0 0 100 32"
      className={className}
      role="img"
      aria-label="Wired"
    >
      <text
        x="50"
        y="24"
        textAnchor="middle"
        fill="currentColor"
        fontFamily="Inter, system-ui, sans-serif"
        fontSize="24"
        fontWeight="800"
        letterSpacing="-0.04em"
      >
        WIRED
      </text>
    </svg>
  );
}

export function GqLogo({ className = "h-8 w-auto md:h-9" }: LogoProps) {
  return (
    <svg
      viewBox="0 0 56 32"
      className={className}
      role="img"
      aria-label="GQ"
    >
      <text
        x="28"
        y="26"
        textAnchor="middle"
        fill="currentColor"
        fontFamily="Inter, system-ui, sans-serif"
        fontSize="28"
        fontWeight="900"
        letterSpacing="0.08em"
      >
        GQ
      </text>
    </svg>
  );
}

export function EntrepreneurLogo({ className = "h-7 w-auto md:h-8" }: LogoProps) {
  return (
    <svg
      viewBox="0 0 170 32"
      className={className}
      role="img"
      aria-label="Entrepreneur"
    >
      <text
        x="85"
        y="24"
        textAnchor="middle"
        fill="currentColor"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="19"
        fontWeight="600"
        letterSpacing="0.06em"
      >
        Entrepreneur
      </text>
    </svg>
  );
}
