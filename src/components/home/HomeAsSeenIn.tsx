import {
  EntrepreneurLogo,
  ForbesLogo,
  GqLogo,
  HighTimesLogo,
  IncLogo,
  NewYorkTimesLogo,
  RollingStoneLogo,
  WashingtonPostLogo,
  WiredLogo,
} from "@/components/home/PressLogos";

const pressLogos = [
  { id: "wapo", Logo: WashingtonPostLogo },
  { id: "nyt", Logo: NewYorkTimesLogo },
  { id: "forbes", Logo: ForbesLogo },
  { id: "inc", Logo: IncLogo },
  { id: "high-times", Logo: HighTimesLogo },
  { id: "rolling-stone", Logo: RollingStoneLogo },
  { id: "wired", Logo: WiredLogo },
  { id: "gq", Logo: GqLogo },
  { id: "entrepreneur", Logo: EntrepreneurLogo },
];

export function HomeAsSeenIn() {
  const track = [...pressLogos, ...pressLogos];

  return (
    <section
      aria-label="As seen in press"
      className="border-y border-black/[0.08] bg-white py-8 md:py-10"
    >
      <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.22em] text-ink md:mb-8 md:text-sm">
        As Seen In
      </p>

      <div className="press-marquee-mask relative overflow-hidden">
        <div className="flex w-max animate-press-marquee items-center">
          {track.map(({ id, Logo }, index) => (
            <div
              key={`${id}-${index}`}
              className="flex shrink-0 items-center px-10 text-ink md:px-14"
            >
              <Logo />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
