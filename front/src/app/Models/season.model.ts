export type Month =
  | "janvier"
  | "février"
  | "mars"
  | "avril"
  | "mai"
  | "juin"
  | "juillet"
  | "août"
  | "septembre"
  | "octobre"
  | "novembre"
  | "décembre";

export type Season = "printemps" | "été" | "automne" | "hiver";

export const SEASONS: Record<Season, Month[]> = {
  printemps: ["mars", "avril", "mai"],
  été: ["juin", "juillet", "août"],
  automne: ["septembre", "octobre", "novembre"],
  hiver: ["décembre", "janvier", "février"],
};
