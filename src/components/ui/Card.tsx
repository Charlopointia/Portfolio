import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import "./Card.css";

type CardProps<T extends ElementType> = {
  /** Balise HTML à rendre (div par défaut, ou article, li…) */
  as?: T;
  /** Active l'effet de survol (soulèvement + dégradé vert) */
  hoverable?: boolean;
  className?: string;
  children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className" | "children">;

/**
 * Carte de base du site : fond translucide, bordure fine, coins arrondis.
 * Ajoute ta propre classe pour la mise en page ou pour surcharger le style.
 *
 * <Card hoverable className="ma-carte">…</Card>
 */
export default function Card<T extends ElementType = "div">({
  as,
  hoverable = false,
  className = "",
  children,
  ...rest
}: CardProps<T>) {
  const Tag = as ?? "div";
  const classes = ["card", hoverable && "card--hoverable", className]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  );
}
