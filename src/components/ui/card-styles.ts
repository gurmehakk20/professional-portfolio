/*
 * Shared classes for clickable cards, kept in one place so every card
 * behaves the same way.
 */

/**
 * Put on a card's main link (usually its title) to make the whole card
 * clickable. The card needs `relative`; any other links inside it need
 * `relative z-10` to stay clickable. The focus ring outlines the whole card.
 */
export const stretchedLink =
  "after:absolute after:inset-0 after:z-1 after:rounded-2xl after:content-[''] " +
  "focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-3 " +
  "focus-visible:after:outline-(--focus-ring)";
