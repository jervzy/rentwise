type RentWiseHeroBackgroundProps = {
  className?: string;
};

export function RentWiseHeroBackground({
  className,
}: RentWiseHeroBackgroundProps) {
  const rootClassName = [
    "pointer-events-none absolute inset-0 overflow-hidden",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div aria-hidden="true" className={rootClassName}>
      <div className="absolute inset-0 bg-[#F3F4F1]" />

      <div className="absolute inset-0 [background:radial-gradient(80%_105%_at_82%_36%,rgba(116,138,124,0.22)_0%,rgba(230,236,232,0.94)_38%,rgba(243,244,241,0.72)_68%,#F3F4F1_90%)] max-[940px]:[background:radial-gradient(105%_78%_at_58%_72%,rgba(116,138,124,0.16)_0%,rgba(230,236,232,0.9)_40%,rgba(243,244,241,0.78)_72%,#F3F4F1_94%)] max-[700px]:[background:radial-gradient(120%_58%_at_52%_90%,rgba(116,138,124,0.12)_0%,rgba(230,236,232,0.86)_40%,rgba(243,244,241,0.86)_70%,#F3F4F1_94%)]" />

      <div className="absolute inset-0 [background:radial-gradient(50%_62%_at_18%_40%,rgba(252,252,250,0.92)_0%,rgba(243,244,241,0)_72%)] max-[700px]:opacity-50" />
    </div>
  );
}
