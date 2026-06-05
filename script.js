const root = document.documentElement;

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));

function easedPresence(progress, start, visible, end) {
  const enter = clamp((progress - start) / (visible - start));
  const exit = clamp((end - progress) / (end - visible));
  return Math.min(enter, exit);
}

function updateScrollProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = clamp(scrollable > 0 ? window.scrollY / scrollable : 0);
  const wallMove = progress * 62;

  const revealEnd = 0.3;
  const climberOpacity = clamp((progress - 0.08) / (revealEnd - 0.08));
  const climberY = Math.max(0, progress - revealEnd) * 62;
  const copyOne = easedPresence(progress, 0.12, 0.24, 0.42);
  const copyTwo = easedPresence(progress, 0.34, 0.48, 0.68);
  const copyThree = easedPresence(progress, 0.58, 0.72, 0.94);

  root.style.setProperty("--scroll-progress", progress.toFixed(4));
  root.style.setProperty("--wall-rise", `${wallMove.toFixed(2)}vh`);
  root.style.setProperty("--climber-opacity", climberOpacity.toFixed(4));
  root.style.setProperty("--climber-scale", (0.94 + climberOpacity * 0.06).toFixed(4));
  root.style.setProperty("--climber-y", `${climberY.toFixed(2)}vh`);
  root.style.setProperty("--copy-one-opacity", copyOne.toFixed(4));
  root.style.setProperty("--copy-one-x", `${((1 - copyOne) * 56).toFixed(1)}px`);
  root.style.setProperty("--copy-two-opacity", copyTwo.toFixed(4));
  root.style.setProperty("--copy-two-x", `${((1 - copyTwo) * 56).toFixed(1)}px`);
  root.style.setProperty("--copy-three-opacity", copyThree.toFixed(4));
  root.style.setProperty("--copy-three-x", `${((1 - copyThree) * 56).toFixed(1)}px`);
}

updateScrollProgress();
window.addEventListener("scroll", updateScrollProgress, { passive: true });
window.addEventListener("resize", updateScrollProgress);
