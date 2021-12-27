export enum HeroKind {
  a = "a",
  b = "b",
}

export interface HeroSpec {
  maxHP: number;
}

export type HeroSpecMap = Record<HeroKind, HeroSpec>;

const heroSpecs: HeroSpecMap = {
  a: {
    maxHP: 800,
  },
  b: {
    maxHP: 600,
  },
};

const specForKind = (kind: HeroKind): HeroSpec => heroSpecs[kind];

export const HeroSpec = {
  specForKind,
};
