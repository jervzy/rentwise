import Image from "next/image";

interface WordmarkProps {
  className?: string;
  preload?: boolean;
}

export function Wordmark({ className, preload = false }: WordmarkProps) {
  return (
    <Image
      src="/branding/main-logo.png"
      alt="Rent Wise"
      width={1275}
      height={277}
      preload={preload}
      unoptimized
      className={["brand-logo", className].filter(Boolean).join(" ")}
    />
  );
}
