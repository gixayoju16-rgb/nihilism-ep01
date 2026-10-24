import { z } from 'zod';
import { placementSchema, sizeRoleSchema } from '../../ondalib/canvas-schemas';
import { DURATION, STAGGER } from '../../ondalib/motion';

// ===== grain-overlay =====

/** Zod schema for {@link GrainOverlay} props. */
export const grainOverlaySchema = z.object({
  /** Discriminator literal — matches this entry's registry slug. Auto-populated when omitted (`schema.parse({})` works as before). Lets consumers build `z.discriminatedUnion('kind', [...])` directly over onda schemas. */
  kind: z.literal('grain-overlay').default('grain-overlay'),
  /** Layer opacity. Capped at `0.15` — CLAUDE.md tokens say ~2%. */
  opacity: z.number().min(0).max(0.15).default(0.04),
  /** SVG turbulence base frequency. Higher = finer grain. */
  baseFrequency: z.number().min(0).default(0.9),
  /** Noise complexity. */
  numOctaves: z.number().int().min(1).max(4).default(1),
  /** Deterministic noise variation — same seed always produces the same grain. */
  seed: z.number().int().min(0).default(0),
});

/** Inferred props for {@link GrainOverlay}. */
export type GrainOverlayProps = z.infer<typeof grainOverlaySchema>;

// ===== quote-card =====

/** Zod schema for {@link QuoteCard} props. */
export const quoteCardSchema = z.object({
  /** Discriminator literal — matches this entry's registry slug. Auto-populated when omitted (`schema.parse({})` works as before). Lets consumers build `z.discriminatedUnion('kind', [...])` directly over onda schemas. */
  kind: z.literal('quote-card').default('quote-card'),
  /** The pull-quote body. Cascaded word-by-word on a slower-than-canonical stagger. */
  quote: z.string().default('Motion is the difference between art and craft.'),
  /** Attribution name. */
  author: z.string().default('Saul Bass'),
  /** Attribution role / title. */
  role: z.string().default('Graphic Designer'),
  /** Frames before the quote starts. */
  delay: z.number().int().min(0).default(0),
  /** Show the accent divider between quote and attribution. */
  accent: z.boolean().default(true),
  /** Quote font size in px. Wins over `quoteSize` if both are passed. */
  quoteFontSize: z.number().default(56),
  /** Semantic role for the quote — resolves to canvas-aware pixels. `quoteFontSize` wins when both are passed. */
  quoteSize: sizeRoleSchema.optional(),
  /** Font weight for the quote. */
  quoteFontWeight: z.number().optional(),
  /** CSS letter-spacing for the quote (e.g. `'-0.02em'`). */
  quoteLetterSpacing: z.string().optional(),
  /** Unitless line height for the quote. */
  quoteLineHeight: z.number().optional(),
  /** Author / role font size in px. Wins over `authorSize` if both are passed. */
  authorFontSize: z.number().default(22),
  /** Semantic role for the author / role — resolves to canvas-aware pixels. `authorFontSize` wins when both are passed. */
  authorSize: sizeRoleSchema.optional(),
  /** Font weight for the author and role lines (they share styling). */
  authorFontWeight: z.number().optional(),
  /** CSS letter-spacing for the author and role lines (e.g. `'0.06em'`). */
  authorLetterSpacing: z.string().optional(),
  /** Unitless line height for the author and role lines. */
  authorLineHeight: z.number().optional(),
  /** Quote color. Defaults to `--onda-text`. */
  color: z.string().default('var(--onda-text, #F2F2F4)'),
  /** Author / role color. Defaults to `--onda-dim`. */
  authorColor: z.string().default('var(--onda-dim, #8E8E98)'),
  /** Divider color. Defaults to `--onda-accent`. */
  accentColor: z.string().default('var(--onda-accent, #D96B82)'),
  /** Onda display font. */
  fontFamily: z.string().default('var(--onda-font-display, "Clash Display", sans-serif)'),
  /** Where on the canvas this sits. Region (`'center'`, `'upper-third'`, ...) or `{ x, y, anchor }` in 0..1 canvas fractions. Coordinates may be negative or >1 for off-canvas. */
  placement: placementSchema.optional(),
});

/** Inferred props for {@link QuoteCard}. */
export type QuoteCardProps = z.infer<typeof quoteCardSchema>;

// ===== chapter-card =====

/** Zod schema for {@link ChapterCard} props. */
export const chapterCardSchema = z.object({
  /** Discriminator literal — matches this entry's registry slug. Auto-populated when omitted (`schema.parse({})` works as before). Lets consumers build `z.discriminatedUnion('kind', [...])` directly over onda schemas. */
  kind: z.literal('chapter-card').default('chapter-card'),
  /** The chapter heading — the focal text on the card. */
  chapter: z.string().default('The setup'),
  /** Numbered index displayed above the chapter. String so leading zeros (`"01"`) read as intended. */
  number: z.string().default('01'),
  /** Frames before the number starts fading in. The whole card is sequenced relative to this. */
  delay: z.number().int().min(0).default(0),
  /** When `true`, the number renders in `numberColor` (the rose) and a quiet underline punctuates the title. */
  accent: z.boolean().default(true),
  /** Number color when `accent` is `true`. Defaults to `--onda-accent`. */
  numberColor: z.string().default('var(--onda-accent, #D96B82)'),
  /** Chapter title color. Defaults to `--onda-text`. */
  color: z.string().default('var(--onda-text, #F2F2F4)'),
  /** Number color when `accent` is `false`. Defaults to `--onda-dim` so the number reads as quiet metadata. */
  subtitleColor: z.string().default('var(--onda-dim, #8E8E98)'),
  /** Number font size in px — smaller than the title, sitting above it. Wins over `numberSize` if both are passed. */
  numberFontSize: z.number().default(32),
  /** Semantic role for the number — resolves to canvas-aware pixels. `numberFontSize` wins when both are passed. */
  numberSize: sizeRoleSchema.optional(),
  /** Font weight for the number. */
  numberFontWeight: z.number().optional(),
  /** CSS letter-spacing for the number (e.g. `'0.16em'`). */
  numberLetterSpacing: z.string().optional(),
  /** Unitless line height for the number. */
  numberLineHeight: z.number().optional(),
  /** Chapter title font size in px — the focal element on the card. Wins over `titleSize` if both are passed. */
  titleFontSize: z.number().default(96),
  /** Semantic role for the title — resolves to canvas-aware pixels. `titleFontSize` wins when both are passed. */
  titleSize: sizeRoleSchema.optional(),
  /** Font weight for the title. */
  titleFontWeight: z.number().optional(),
  /** CSS letter-spacing for the title (e.g. `'-0.02em'`). */
  titleLetterSpacing: z.string().optional(),
  /** Unitless line height for the title. */
  titleLineHeight: z.number().optional(),
  /** Onda display font. Applied to both number and title for tonal consistency. */
  fontFamily: z.string().default('var(--onda-font-display, "Clash Display", sans-serif)'),
  /** Where on the canvas this sits. Region (`'center'`, `'upper-third'`, ...) or `{ x, y, anchor }` in 0..1 canvas fractions. Coordinates may be negative or >1 for off-canvas. */
  placement: placementSchema.optional(),
});

/** Inferred props for {@link ChapterCard}. */
export type ChapterCardProps = z.infer<typeof chapterCardSchema>;

// ===== ken-burns =====

/** Zod schema for {@link KenBurns} props. */
export const kenBurnsSchema = z.object({
  /** Discriminator literal — matches this entry's registry slug. Auto-populated when omitted (`schema.parse({})` works as before). Lets consumers build `z.discriminatedUnion('kind', [...])` directly over onda schemas. */
  kind: z.literal('ken-burns').default('ken-burns'),
  /**
   * Image URL. The default is a stable Picsum seed so the playground render
   * is reproducible — supply your own `src` in real compositions.
   */
  src: z.string().default('https://picsum.photos/seed/onda/1920/1080'),
  /** Frames before the drift starts. */
  delay: z.number().int().min(0).default(0),
  /** Frames over which the zoom + pan completes. 150f ≈ 5s @ 30fps. */
  duration: z.number().int().min(1).default(150),
  /** Starting scale. */
  fromScale: z.number().default(1.0),
  /** Ending scale. Keep the delta restrained (1.0 → 1.1). */
  toScale: z.number().default(1.1),
  /** Starting transform-origin X. `0` = left, `1` = right. */
  fromX: z.number().min(0).max(1).default(0.5),
  /** Starting transform-origin Y. `0` = top, `1` = bottom. */
  fromY: z.number().min(0).max(1).default(0.5),
  /** Ending transform-origin X. */
  toX: z.number().min(0).max(1).default(0.5),
  /** Ending transform-origin Y. */
  toY: z.number().min(0).max(1).default(0.5),
  /** Where on the canvas this sits. Region (`'center'`, `'upper-third'`, ...) or `{ x, y, anchor }` in 0..1 canvas fractions. When omitted, the component fills the entire canvas (default behavior). Coordinates may be negative or >1 for off-canvas. */
  placement: placementSchema.optional(),
});

/** Inferred props for {@link KenBurns}. */
export type KenBurnsProps = z.infer<typeof kenBurnsSchema>;

// ===== text-fade-replace =====

/** Zod schema for {@link TextFadeReplace} props. */
export const textFadeReplaceSchema = z.object({
  /** Discriminator literal — matches this entry's registry slug. Auto-populated when omitted. */
  kind: z.literal('text-fade-replace').default('text-fade-replace'),
  /** The phrases to cycle through, in order. */
  phrases: z.array(z.string()).default(['ship', 'render', 'repeat']),
  /** Frames each phrase holds (including its crossfade out). */
  interval: z.number().int().min(1).default(45),
  /** Frames of crossfade between phrases. */
  crossfade: z.number().int().min(1).default(12),
  /** Frames before the first phrase appears. */
  delay: z.number().int().min(0).default(0),
  /** Loop back to the first phrase after the last. */
  loop: z.boolean().default(true),
  /** Text color. Defaults to `--onda-text`. */
  color: z.string().default('var(--onda-text, #F2F2F4)'),
  /** Pixels. Wins over `size` if both are passed. */
  fontSize: z.number().default(96),
  /** Semantic typography role — canvas-aware pixels. */
  size: sizeRoleSchema.optional(),
  /** Onda display font. Never default to Inter / Arial / system. */
  fontFamily: z.string().default('var(--onda-font-display, "Clash Display", sans-serif)'),
  /** Font weight. */
  fontWeight: z.number().default(600),
  /** CSS letter-spacing. */
  letterSpacing: z.string().optional(),
  /** Unitless line height. */
  lineHeight: z.number().default(1.1),
  /** Text alignment. */
  align: z.enum(['left', 'center', 'right']).default('center'),
  /** Where on the canvas this sits. */
  placement: placementSchema.optional(),
});

/** Inferred props for {@link TextFadeReplace}. */
export type TextFadeReplaceProps = z.infer<typeof textFadeReplaceSchema>;

// ===== title-card =====

/** Zod schema for {@link TitleCard} props. */
export const titleCardSchema = z.object({
  /** Discriminator literal — matches this entry's registry slug. Auto-populated when omitted (`schema.parse({})` works as before). Lets consumers build `z.discriminatedUnion('kind', [...])` directly over onda schemas. */
  kind: z.literal('title-card').default('title-card'),
  /** Hero headline. */
  title: z.string().default('Onda'),
  /** Smaller phrase beneath the headline, cascaded word-by-word. */
  subtitle: z.string().default('premium motion graphics for Remotion'),
  /** Frames before the title starts. */
  delay: z.number().int().min(0).default(0),
  /** Show the accent underline beneath the title. */
  accent: z.boolean().default(true),
  /** Title font size in px. Wins over `titleSize` if both are passed. */
  titleFontSize: z.number().default(160),
  /** Semantic role for the title — resolves to canvas-aware pixels. `titleFontSize` wins when both are passed. */
  titleSize: sizeRoleSchema.optional(),
  /** Font weight for the title. */
  titleFontWeight: z.number().optional(),
  /** CSS letter-spacing for the title (e.g. `'-0.02em'`). */
  titleLetterSpacing: z.string().optional(),
  /** Unitless line height for the title. */
  titleLineHeight: z.number().optional(),
  /** Subtitle font size in px. Wins over `subtitleSize` if both are passed. */
  subtitleFontSize: z.number().default(32),
  /** Semantic role for the subtitle — resolves to canvas-aware pixels. `subtitleFontSize` wins when both are passed. */
  subtitleSize: sizeRoleSchema.optional(),
  /** Font weight for the subtitle. */
  subtitleFontWeight: z.number().optional(),
  /** CSS letter-spacing for the subtitle (e.g. `'0.06em'`). */
  subtitleLetterSpacing: z.string().optional(),
  /** Unitless line height for the subtitle. */
  subtitleLineHeight: z.number().optional(),
  /** Title color. Defaults to `--onda-text`. */
  color: z.string().default('var(--onda-text, #F2F2F4)'),
  /** Subtitle color. Defaults to `--onda-dim`. */
  subtitleColor: z.string().default('var(--onda-dim, #8E8E98)'),
  /** Accent rule color. Defaults to `--onda-accent` — the earned-color moment. */
  accentColor: z.string().default('var(--onda-accent, #D96B82)'),
  /** Onda display font. */
  fontFamily: z.string().default('var(--onda-font-display, "Clash Display", sans-serif)'),
  /** Where on the canvas this sits. Region (`'center'`, `'upper-third'`, ...) or `{ x, y, anchor }` in 0..1 canvas fractions. Defaults to centered. */
  placement: placementSchema.optional(),
});

/** Inferred props for {@link TitleCard}. */
export type TitleCardProps = z.infer<typeof titleCardSchema>;

// ===== mask-reveal =====

/** Zod schema for {@link MaskReveal} props. */
export const maskRevealSchema = z.object({
  /** Discriminator literal — matches this entry's registry slug. Auto-populated when omitted (`schema.parse({})` works as before). Lets consumers build `z.discriminatedUnion('kind', [...])` directly over onda schemas. */
  kind: z.literal('mask-reveal').default('mask-reveal'),
  /** What to reveal. */
  text: z.string().default('Onda'),
  /** Frames before the animation starts. */
  delay: z.number().int().min(0).default(0),
  /** Frames for the mask to fully retreat. */
  duration: z.number().int().min(1).default(DURATION.base),
  /** The side the text appears to come *in* from (mirrors `SlideIn`). */
  direction: z.enum(['left', 'right', 'top', 'bottom']).default('left'),
  /** Text color. Defaults to `--onda-text` (`#F2F2F4`). */
  color: z.string().default('var(--onda-text, #F2F2F4)'),
  /** Pixels. */
  fontSize: z.number().default(96),
  /** Onda display font. */
  fontFamily: z.string().default('var(--onda-font-display, "Clash Display", sans-serif)'),
  /** Font weight. Display default `600`. */
  fontWeight: z.number().optional(),
  /** CSS letter-spacing (e.g. `'-0.02em'`, `'0.06em'`). Default `'normal'`. */
  letterSpacing: z.string().optional(),
  /** Unitless line height. Default `1.1` for tight display copy. */
  lineHeight: z.number().optional(),
  /** Text alignment. */
  align: z.enum(['left', 'center', 'right']).optional(),
  /** CSS text-transform. Useful for eyebrow / kicker copy. */
  textTransform: z.enum(['none', 'uppercase', 'lowercase', 'capitalize']).optional(),
  /** CSS text-shadow value (e.g. `'0 4px 24px rgba(0,0,0,0.55)'`). Useful for readability over busy backgrounds. */
  textShadow: z.string().optional(),
  /** CSS font-style. */
  fontStyle: z.enum(['normal', 'italic', 'oblique']).optional(),
  /** CSS text-wrap. `'balance'` evens out headline line-breaks; `'pretty'` polishes body text. */
  textWrap: z.enum(['wrap', 'nowrap', 'balance', 'pretty']).optional(),
  /** Where on the canvas this sits. Region (`'center'`, `'upper-third'`, ...) or `{ x, y, anchor }` in 0..1 canvas fractions. Coordinates may be negative or >1 for off-canvas. */
  placement: placementSchema.optional(),
});

/** Inferred props for {@link MaskReveal}. */
export type MaskRevealProps = z.infer<typeof maskRevealSchema>;

// ===== split-screen =====

/**
 * Zod schema for {@link SplitScreen}'s *serializable* props.
 *
 * The two content panes (`left` / `right`) are `React.ReactNode` and can't be
 * Zod-validated, so — like `browser-frame` / `device-frame` do for `children`
 * — they live only on the component's TS props, not in this schema. This schema
 * covers everything that is plain data (layout, ratio, animation).
 */
export const splitScreenSchema = z.object({
  /** Discriminator literal — matches this entry's registry slug. Auto-populated when omitted. */
  kind: z.literal('split-screen').default('split-screen'),
  /** Pane axis: `horizontal` = side-by-side, `vertical` = stacked. */
  orientation: z.enum(['horizontal', 'vertical']).default('horizontal'),
  /** Fraction (0..1) of the main axis given to the `left` (or top) pane. */
  ratio: z.number().min(0).max(1).default(0.5),
  /** Gap between the two panes in px. */
  gap: z.number().min(0).default(0),
  /** Draw a thin token divider in the gap between the panes. */
  divider: z.boolean().default(true),
  /** Slide the two panes in from their outer edges on the house spring. */
  animate: z.boolean().default(true),
  /** Frames before the entrance. */
  delay: z.number().int().min(0).default(0),
  /** Overall width in px. */
  width: z.number().default(1280),
  /** Overall height in px. */
  height: z.number().default(720),
  /** Where on the canvas this sits. */
  placement: placementSchema.optional(),
});

/**
 * Inferred props for {@link SplitScreen}. The `left` / `right` `ReactNode`
 * panes are added on top of this in the component file (see `SplitScreenProps`).
 */
export type SplitScreenSchemaProps = z.infer<typeof splitScreenSchema>;

// ===== vignette =====

/** Zod schema for {@link Vignette} props. */
export const vignetteSchema = z.object({
  /** Discriminator literal — matches this entry's registry slug. Auto-populated when omitted (`schema.parse({})` works as before). Lets consumers build `z.discriminatedUnion('kind', [...])` directly over onda schemas. */
  kind: z.literal('vignette').default('vignette'),
  /** Edge darkness. `0` = no vignette, `1` = fully dark edges. */
  intensity: z.number().min(0).max(1).default(0.5),
  /** Percent from center where the darkening begins. Larger = bigger clean middle. */
  innerRadius: z.number().min(0).max(100).default(40),
  /** Edge color. Defaults to pure black for the classic cinematic frame. */
  color: z.string().default('#000000'),
});

/** Inferred props for {@link Vignette}. */
export type VignetteProps = z.infer<typeof vignetteSchema>;

// ===== typewriter =====

/** Zod schema for {@link Typewriter} props. */
export const typewriterSchema = z.object({
  /** Discriminator literal — matches this entry's registry slug. Auto-populated when omitted (`schema.parse({})` works as before). Lets consumers build `z.discriminatedUnion('kind', [...])` directly over onda schemas. */
  kind: z.literal('typewriter').default('typewriter'),
  /** What to type out. */
  text: z.string().default('motion graphics'),
  /** Frames before typing starts. */
  delay: z.number().int().min(0).default(0),
  /** Frames to type the full string. Linear pacing — chars-per-frame is constant. */
  duration: z.number().int().min(1).default(DURATION.slow),
  /** Show a blinking cursor at the leading edge. */
  cursor: z.boolean().default(true),
  /** Cursor color. Defaults to `--onda-accent` (`#D96B82`). */
  cursorColor: z.string().default('var(--onda-accent, #D96B82)'),
  /** Text color. Defaults to `--onda-text` (`#F2F2F4`). */
  color: z.string().default('var(--onda-text, #F2F2F4)'),
  /** Pixels. Wins over `size` if both are passed. */
  fontSize: z.number().default(64),
  /** Semantic typography role — resolves to canvas-aware pixels via the smaller canvas dimension. Overrides `fontSize`'s default when passed alone; `fontSize` wins when both are passed. */
  size: sizeRoleSchema.optional(),
  /** Body / technical font — Space Grotesk reads more "terminal" than Clash. */
  fontFamily: z.string().default('var(--onda-font-body, "Space Grotesk", sans-serif)'),
  /** Font weight. Body / technical default `500`. */
  fontWeight: z.number().optional(),
  /** CSS letter-spacing (e.g. `'0.04em'`). Default `'normal'`. */
  letterSpacing: z.string().optional(),
  /** Unitless line height. Default `1.4` for body / multi-line copy. */
  lineHeight: z.number().optional(),
  /** Text alignment. */
  align: z.enum(['left', 'center', 'right']).optional(),
  /** CSS text-transform. Useful for eyebrow / kicker copy. */
  textTransform: z.enum(['none', 'uppercase', 'lowercase', 'capitalize']).optional(),
  /** CSS text-shadow value (e.g. `'0 4px 24px rgba(0,0,0,0.55)'`). Useful for readability over busy backgrounds. */
  textShadow: z.string().optional(),
  /** CSS font-style. */
  fontStyle: z.enum(['normal', 'italic', 'oblique']).optional(),
  /** CSS text-wrap. `'balance'` evens out headline line-breaks; `'pretty'` polishes body text. */
  textWrap: z.enum(['wrap', 'nowrap', 'balance', 'pretty']).optional(),
  /** Where on the canvas this sits. Region (`'center'`, `'upper-third'`, ...) or `{ x, y, anchor }` in 0..1 canvas fractions. Coordinates may be negative or >1 for off-canvas. */
  placement: placementSchema.optional(),
});

/** Inferred props for {@link Typewriter}. */
export type TypewriterProps = z.infer<typeof typewriterSchema>;

// ===== count-up =====

/** Zod schema for {@link CountUp} props. */
export const countUpSchema = z.object({
  /** Discriminator literal — matches this entry's registry slug. Auto-populated when omitted (`schema.parse({})` works as before). Lets consumers build `z.discriminatedUnion('kind', [...])` directly over onda schemas. */
  kind: z.literal('count-up').default('count-up'),
  /** Starting value. */
  from: z.number().default(0),
  /** Ending value. */
  to: z.number().default(100),
  /** Frames before the count starts. */
  delay: z.number().int().min(0).default(0),
  /** Frames to count from `from` to `to`. Numbers want more time than text. */
  duration: z.number().int().min(1).default(DURATION.slow),
  /** Fraction digits to render. */
  decimals: z.number().int().min(0).default(0),
  /** Prepended to the number (e.g. `'$'`). */
  prefix: z.string().default(''),
  /** Appended to the number (e.g. `'%'`). */
  suffix: z.string().default(''),
  /** Text color. Defaults to `--onda-text` (`#F2F2F4`). */
  color: z.string().default('var(--onda-text, #F2F2F4)'),
  /** Pixels. Counters are usually large. Wins over `size` if both are passed. */
  fontSize: z.number().default(120),
  /** Semantic typography role — resolves to canvas-aware pixels via the smaller canvas dimension. Overrides `fontSize`'s default when passed alone; `fontSize` wins when both are passed. */
  size: sizeRoleSchema.optional(),
  /** Onda display font. */
  fontFamily: z.string().default('var(--onda-font-display, "Clash Display", sans-serif)'),
  /** Font weight. Display default `600`. */
  fontWeight: z.number().optional(),
  /** CSS letter-spacing (e.g. `'-0.02em'`). Default `'normal'`. */
  letterSpacing: z.string().optional(),
  /** Unitless line height. Default `1.1`. */
  lineHeight: z.number().optional(),
  /** Text alignment. */
  align: z.enum(['left', 'center', 'right']).optional(),
  /** Where on the canvas this sits. Region (`'center'`, `'upper-third'`, ...) or `{ x, y, anchor }` in 0..1 canvas fractions. Coordinates may be negative or >1 for off-canvas. */
  placement: placementSchema.optional(),
});

/** Inferred props for {@link CountUp}. */
export type CountUpProps = z.infer<typeof countUpSchema>;

// ===== fade-in =====

/** Zod schema for {@link FadeIn} props — drives Remotion `defaultProps` validation. */
export const fadeInSchema = z.object({
  /** Discriminator literal — matches this entry's registry slug. Auto-populated when omitted (`schema.parse({})` works as before). Lets consumers build `z.discriminatedUnion('kind', [...])` directly over onda schemas. */
  kind: z.literal('fade-in').default('fade-in'),
  /** What to reveal. */
  text: z.string().default('Onda'),
  /** Frames before the animation starts. */
  delay: z.number().int().min(0).default(0),
  /** Frames to fully reach opacity 1. Default `DURATION.base` (18). */
  duration: z.number().int().min(1).default(DURATION.base),
  /** Text color. Defaults to `--onda-text` (`#F2F2F4`). */
  color: z.string().default('var(--onda-text, #F2F2F4)'),
  /** Pixels. */
  fontSize: z.number().default(96),
  /** Onda display font. Never default to Inter / Arial / system. */
  fontFamily: z.string().default('var(--onda-font-display, "Clash Display", sans-serif)'),
  /** Font weight. Display default `600`. */
  fontWeight: z.number().optional(),
  /** CSS letter-spacing (e.g. `'-0.02em'`, `'0.06em'`). Default `'normal'`. */
  letterSpacing: z.string().optional(),
  /** Unitless line height. Default `1.1` for tight display copy. */
  lineHeight: z.number().optional(),
  /** Text alignment. */
  align: z.enum(['left', 'center', 'right']).optional(),
  /** CSS text-transform. Useful for eyebrow / kicker copy. */
  textTransform: z.enum(['none', 'uppercase', 'lowercase', 'capitalize']).optional(),
  /** CSS text-shadow value (e.g. `'0 4px 24px rgba(0,0,0,0.55)'`). Useful for readability over busy backgrounds. */
  textShadow: z.string().optional(),
  /** CSS font-style. */
  fontStyle: z.enum(['normal', 'italic', 'oblique']).optional(),
  /** CSS text-wrap. `'balance'` evens out headline line-breaks; `'pretty'` polishes body text. */
  textWrap: z.enum(['wrap', 'nowrap', 'balance', 'pretty']).optional(),
  /** Where on the canvas this sits. Region (`'center'`, `'upper-third'`, ...) or `{ x, y, anchor }` in 0..1 canvas fractions. Coordinates may be negative or >1 for off-canvas. */
  placement: placementSchema.optional(),
});

/** Inferred props for {@link FadeIn}. */
export type FadeInProps = z.infer<typeof fadeInSchema>;

// ===== blur-reveal =====

/** Zod schema for {@link BlurReveal} props — drives Remotion `defaultProps` validation. */
export const blurRevealSchema = z.object({
  /** Discriminator literal — matches this entry's registry slug. Auto-populated when omitted (`schema.parse({})` works as before). Lets consumers build `z.discriminatedUnion('kind', [...])` directly over onda schemas. */
  kind: z.literal('blur-reveal').default('blur-reveal'),
  /** What to reveal. */
  text: z.string().default('Onda'),
  /** Frames before the animation starts. */
  delay: z.number().int().min(0).default(0),
  /** Frames until blur reaches 0 and the text is fully readable. */
  duration: z.number().int().min(1).default(DURATION.base),
  /** Text color. Defaults to `--onda-text` (`#F2F2F4`). */
  color: z.string().default('var(--onda-text, #F2F2F4)'),
  /** Pixels. Wins over `size` if both are passed. */
  fontSize: z.number().default(96),
  /** Semantic typography role — resolves to canvas-aware pixels via the smaller canvas dimension. Overrides `fontSize`'s default when passed alone; `fontSize` wins when both are passed. */
  size: sizeRoleSchema.optional(),
  /** Onda display font. Never default to Inter / Arial / system. */
  fontFamily: z.string().default('var(--onda-font-display, "Clash Display", sans-serif)'),
  /** Font weight. Display default `600`. */
  fontWeight: z.number().optional(),
  /** CSS letter-spacing (e.g. `'-0.02em'`, `'0.06em'`). Default `'normal'`. */
  letterSpacing: z.string().optional(),
  /** Unitless line height. Default `1.1` for tight display copy. */
  lineHeight: z.number().optional(),
  /** Text alignment. */
  align: z.enum(['left', 'center', 'right']).optional(),
  /** CSS text-transform. Useful for eyebrow / kicker copy. */
  textTransform: z.enum(['none', 'uppercase', 'lowercase', 'capitalize']).optional(),
  /** CSS text-shadow value (e.g. `'0 4px 24px rgba(0,0,0,0.55)'`). Useful for readability over busy backgrounds. */
  textShadow: z.string().optional(),
  /** CSS font-style. */
  fontStyle: z.enum(['normal', 'italic', 'oblique']).optional(),
  /** CSS text-wrap. `'balance'` evens out headline line-breaks; `'pretty'` polishes body text. */
  textWrap: z.enum(['wrap', 'nowrap', 'balance', 'pretty']).optional(),
  /** Where on the canvas this sits. Region (`'center'`, `'upper-third'`, ...) or `{ x, y, anchor }` in 0..1 canvas fractions. Coordinates may be negative or >1 for off-canvas. */
  placement: placementSchema.optional(),
});

/** Inferred props for {@link BlurReveal}. */
export type BlurRevealProps = z.infer<typeof blurRevealSchema>;

// ===== underline =====

/** Zod schema for {@link Underline} props. */
export const underlineSchema = z.object({
  /** Discriminator literal — matches this entry's registry slug. Auto-populated when omitted (`schema.parse({})` works as before). Lets consumers build `z.discriminatedUnion('kind', [...])` directly over onda schemas. */
  kind: z.literal('underline').default('underline'),
  /** Text to reveal. Pass `""` to render the rule alone. */
  text: z.string().default('underline this'),
  /** Frames before the text starts revealing. */
  delay: z.number().int().min(0).default(0),
  /** Text reveal duration in frames. */
  duration: z.number().int().min(1).default(DURATION.base),
  /** Frames to wait after the text appears before the line starts drawing. */
  lineDelay: z.number().int().min(0).default(8),
  /** Line draw duration. Fast on purpose — emphatic. */
  lineDuration: z.number().int().min(1).default(DURATION.fast),
  /** Text color. Defaults to `--onda-text` (`#F2F2F4`). */
  color: z.string().default('var(--onda-text, #F2F2F4)'),
  /** Line color. Defaults to `--onda-accent` (`#D96B82`) — the earned rose. */
  accentColor: z.string().default('var(--onda-accent, #D96B82)'),
  /** Line thickness in px. */
  lineThickness: z.number().default(3),
  /** Pixel gap between text baseline and the line. */
  lineOffset: z.number().default(6),
  /** Pixels. Wins over `size` if both are passed. */
  fontSize: z.number().default(64),
  /** Semantic typography role — resolves to canvas-aware pixels via the smaller canvas dimension. Overrides `fontSize`'s default when passed alone; `fontSize` wins when both are passed. */
  size: sizeRoleSchema.optional(),
  /** Onda display font. */
  fontFamily: z.string().default('var(--onda-font-display, "Clash Display", sans-serif)'),
  /** Font weight. Display default `600`. */
  fontWeight: z.number().optional(),
  /** CSS letter-spacing (e.g. `'-0.02em'`). Default `'normal'`. */
  letterSpacing: z.string().optional(),
  /** Unitless line height. Default `1.1`. */
  lineHeight: z.number().optional(),
  /** Text alignment. */
  align: z.enum(['left', 'center', 'right']).optional(),
  /** Where on the canvas this sits. Region (`'center'`, `'upper-third'`, ...) or `{ x, y, anchor }` in 0..1 canvas fractions. Coordinates may be negative or >1 for off-canvas. */
  placement: placementSchema.optional(),
});

/** Inferred props for {@link Underline}. */
export type UnderlineProps = z.infer<typeof underlineSchema>;

// ===== word-stagger =====

/** Zod schema for {@link WordStagger} props. */
export const wordStaggerSchema = z.object({
  /** Discriminator literal — matches this entry's registry slug. Auto-populated when omitted (`schema.parse({})` works as before). Lets consumers build `z.discriminatedUnion('kind', [...])` directly over onda schemas. */
  kind: z.literal('word-stagger').default('word-stagger'),
  /** The phrase. Split on whitespace into one reveal per word. */
  text: z.string().default('motion that moves you'),
  /** Frames before the **first** word starts. */
  delay: z.number().int().min(0).default(0),
  /** Per-word reveal duration. */
  duration: z.number().int().min(1).default(DURATION.base),
  /** Frames between consecutive words. Canonical Onda stagger is `4`. */
  stagger: z.number().int().min(0).default(STAGGER),
  /**
   * Horizontal alignment of the words within the WordStagger container.
   * With `flex-wrap: wrap`, this controls how each line's words sit
   * relative to the line — `'center'` lets long quotes wrap with each
   * line centered (used by QuoteCard); the default `'flex-start'`
   * left-aligns like a tagline.
   */
  justify: z.enum(['flex-start', 'center', 'flex-end']).default('flex-start'),
  /** Text color. Defaults to `--onda-text` (`#F2F2F4`). */
  color: z.string().default('var(--onda-text, #F2F2F4)'),
  /** Pixels. Wins over `size` if both are passed. */
  fontSize: z.number().default(64),
  /** Semantic typography role — resolves to canvas-aware pixels via the smaller canvas dimension. Overrides `fontSize`'s default when passed alone; `fontSize` wins when both are passed. */
  size: sizeRoleSchema.optional(),
  /** Onda display font. */
  fontFamily: z.string().default('var(--onda-font-display, "Clash Display", sans-serif)'),
  /** Font weight. Display default `600`. */
  fontWeight: z.number().optional(),
  /** CSS letter-spacing (e.g. `'-0.02em'`, `'0.06em'`). Default `'normal'`. */
  letterSpacing: z.string().optional(),
  /** Unitless line height. Default `1.1` for tight display copy. */
  lineHeight: z.number().optional(),
  /** CSS text-transform. Useful for eyebrow / kicker copy. */
  textTransform: z.enum(['none', 'uppercase', 'lowercase', 'capitalize']).optional(),
  /** CSS text-shadow value (e.g. `'0 4px 24px rgba(0,0,0,0.55)'`). Useful for readability over busy backgrounds. */
  textShadow: z.string().optional(),
  /** CSS font-style. */
  fontStyle: z.enum(['normal', 'italic', 'oblique']).optional(),
  /** CSS text-wrap. `'balance'` evens out headline line-breaks; `'pretty'` polishes body text. */
  textWrap: z.enum(['wrap', 'nowrap', 'balance', 'pretty']).optional(),
  /** Where on the canvas this sits. Region (`'center'`, `'upper-third'`, ...) or `{ x, y, anchor }` in 0..1 canvas fractions. Coordinates may be negative or >1 for off-canvas. */
  placement: placementSchema.optional(),
});

/** Inferred props for {@link WordStagger}. */
export type WordStaggerProps = z.infer<typeof wordStaggerSchema>;

