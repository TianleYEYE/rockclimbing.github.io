const root = document.documentElement;

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));

function updateScrollProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = clamp(scrollable > 0 ? window.scrollY / scrollable : 0);
  const wallMove = progress * 62;

  const revealEnd = 0.3;
  const climberOpacity = clamp((progress - 0.08) / (revealEnd - 0.08));
  const climberY = Math.max(0, progress - revealEnd) * 62;

  root.style.setProperty("--scroll-progress", progress.toFixed(4));
  root.style.setProperty("--wall-rise", `${wallMove.toFixed(2)}vh`);
  root.style.setProperty("--climber-opacity", climberOpacity.toFixed(4));
  root.style.setProperty("--climber-scale", (0.94 + climberOpacity * 0.06).toFixed(4));
  root.style.setProperty("--climber-y", `${climberY.toFixed(2)}vh`);
}

updateScrollProgress();
window.addEventListener("scroll", updateScrollProgress, { passive: true });
window.addEventListener("resize", updateScrollProgress);
