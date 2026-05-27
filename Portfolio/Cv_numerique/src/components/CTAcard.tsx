import type { ReactNode } from "react";

type CTAcardProps = {
  title?: string;
  assetSrc: string;
  assetAlt?: string;
  className?: string;
  children?: ReactNode;
};

export default function CTAcard({
  title,
  assetSrc,
  assetAlt = "",
  className = "",
  children,
}: CTAcardProps) {
  return (
    <article className={`project-card ${className}`.trim()}>
      {title ? <h3>{title}</h3> : null}
      <figure className="cta-asset">
        <img src={assetSrc} alt={assetAlt} />
      </figure>
      {children}
    </article>
  );
}
