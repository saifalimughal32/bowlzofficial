import Image from "next/image";

type Props = {
  src?: string;
  alt: string;
  label: string;
  hint?: string;
  aspect?: "square" | "video" | "portrait" | "landscape";
  className?: string;
  priority?: boolean;
};

const aspectClasses = {
  square: "aspect-square",
  video: "aspect-video",
  portrait: "aspect-[4/5]",
  landscape: "aspect-[4/3]",
};

export function ImageSlot({
  src,
  alt,
  label,
  hint,
  aspect = "landscape",
  className = "",
  priority = false,
}: Props) {
  if (src) {
    return (
      <div className={`image-slot relative ${aspectClasses[aspect]} ${className}`}>
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          priority={priority}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    );
  }

  return (
    <div className={`image-slot ${aspectClasses[aspect]} ${className}`}>
      <div className="image-slot-label">
        <span>{label}</span>
        {hint && <span className="normal-case tracking-normal opacity-70">{hint}</span>}
      </div>
    </div>
  );
}
