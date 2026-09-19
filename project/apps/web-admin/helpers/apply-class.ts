export const applyToExtremities = (
  pos: { index: number; length: number },
  left: string,
  right: string,
) => {
  const { index, length } = pos;
  if (index === 0) return left;
  if (index === length - 1) return right;
  return "";
};
