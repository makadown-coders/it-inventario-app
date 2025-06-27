export type ChartConfig = {
  [k in string]: {
    label?: string;
    color?: string;
    theme?: { light?: string; dark?: string };
  };
};