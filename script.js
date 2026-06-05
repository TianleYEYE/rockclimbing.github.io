const root = document.documentElement;

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));

function easedPresence(progress, start, visible, end) {
  const enter = clamp((progress - start) / (visible - start));
  const exit = clamp((end - progress) / (end - visible));
  return Math.min(enter, exit);
}

function updateScrollProgress() {
  const story = document.querySelector(".scroll-story");
  const storyScrollable = story ? story.offsetHeight - window.innerHeight : 0;
  const progress = clamp(storyScrollable > 0 ? window.scrollY / storyScrollable : 0);
  const wallMove = progress * 76;

  const revealEnd = 0.3;
  const climberOneReveal = clamp((progress - 0.08) / (revealEnd - 0.08));
  const climberOneExit = clamp((0.96 - progress) / 0.18);
  const climberOneOpacity = Math.min(climberOneReveal, climberOneExit);
  const climberOneY = Math.max(0, progress - 0.24) * 76;
  const climberTwoCenterProgress = 0.76;
  const climberTwoRevealSpan = 0.16;
  const climberTwoOpacity = clamp(
    (progress - (climberTwoCenterProgress - climberTwoRevealSpan)) / climberTwoRevealSpan
  );
  const climberTwoY = (progress - climberTwoCenterProgress) * 76;
  const copyOne = easedPresence(progress, 0.12, 0.24, 0.42);
  const copyTwo = easedPresence(progress, 0.34, 0.48, 0.68);
  const copyThree = easedPresence(progress, 0.58, 0.72, 0.94);
  const heroPresence = clamp((0.24 - progress) / 0.16);

  root.style.setProperty("--scroll-progress", progress.toFixed(4));
  root.style.setProperty("--wall-rise", `${wallMove.toFixed(2)}vh`);
  root.style.setProperty("--climber-one-opacity", climberOneOpacity.toFixed(4));
  root.style.setProperty("--climber-one-scale", (0.94 + climberOneOpacity * 0.06).toFixed(4));
  root.style.setProperty("--climber-one-y", `${climberOneY.toFixed(2)}vh`);
  root.style.setProperty("--climber-two-opacity", climberTwoOpacity.toFixed(4));
  root.style.setProperty("--climber-two-scale", (0.94 + climberTwoOpacity * 0.06).toFixed(4));
  root.style.setProperty("--climber-two-y", `${climberTwoY.toFixed(2)}vh`);
  root.style.setProperty("--copy-one-opacity", copyOne.toFixed(4));
  root.style.setProperty("--copy-one-x", `${((1 - copyOne) * 56).toFixed(1)}px`);
  root.style.setProperty("--copy-two-opacity", copyTwo.toFixed(4));
  root.style.setProperty("--copy-two-x", `${((1 - copyTwo) * 56).toFixed(1)}px`);
  root.style.setProperty("--copy-three-opacity", copyThree.toFixed(4));
  root.style.setProperty("--copy-three-x", `${((1 - copyThree) * 56).toFixed(1)}px`);
  root.style.setProperty("--hero-opacity", heroPresence.toFixed(4));
  root.style.setProperty("--hero-y", `${((1 - heroPresence) * -24).toFixed(1)}px`);
}

updateScrollProgress();
window.addEventListener("scroll", updateScrollProgress, { passive: true });
window.addEventListener("resize", updateScrollProgress);
