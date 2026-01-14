export const lucidControlClass =
  "text-xs uppercase tracking-widest text-white/60 hover:text-white/80 transition cursor-pointer";

export const themeColors = {
  blockBg: "bg-neutral-800/20",
  blockBorder: "border border-white/10",
  blockBlur: "backdrop-blur-md",
  blockGlow: "hover:shadow-2xl transition-shadow",
  glowSoft: "hover:brightness-110 hover:shadow-md transition duration-300",
  subduedText: "text-white/70",
  subtleText: "text-white/50",
  accentRed: "text-rose-400/80 hover:text-rose-300",
};

export const themeEffects = {
  input: {
    base: "transition duration-300 ease-in-out shadow-[0_2px_6px_rgba(255,255,255,0.05)]",
    hover:
      "hover:brightness-105 hover:shadow-[0_2px_8px_rgba(255,255,255,0.06)]",
    focus: "focus:outline-none focus:ring-2 focus:ring-white/20",
  },

  button: {
    base: "transition duration-200 ease-in-out",
    hover: "hover:text-white hover:scale-102",
    active: "active:bg-white/10",
  },
  capsule: {
    base: "transition duration-200 ease-in-out",
    hover: "hover:bg-white/10 hover:text-white/80",
    active: "bg-white/10 text-white",
  },
  iconButton: {
    base: "transition duration-150 ease-in-out",
    hover: "hover:text-white hover:scale-105",
    active: "active:scale-95",
  },
  logoShadow: "drop-shadow-[0_0_16px_rgba(255,255,255,0.04)]",
  logoHover:
    "hover:shadow-[0_2px_25px_rgba(255,255,255,0.15)]",
};

export const themeFonts = {
  logo: `
  text-4xl font-nato font-extralight uppercase tracking-tight
  text-white/70
  drop-shadow-[0_0_12px_rgba(255,255,255,0.08)]
  ${themeEffects.logoShadow}
  ${themeEffects.logoHover}
`,

  title: `
  font-light tracking-tight
  text-3xl sm:text-4xl md:text-5xl
  text-white/80
`,

  sectionTitle:
    "text-xl md:text-2xl font-light tracking-wide uppercase text-white/70",
  subtitle: "text-sm font-light text-white/60 font-stretch-condensed ",
  tag: "text-xs uppercase tracking-widest text-white/60 ",
  smallInfo: "text-xs text-white/50",
  labelMuted: "text-xs uppercase text-white/60 hover:text-white/80",
  linkSubtle: "text-sm underline text-white/60 hover:text-white",
  input: "text-sm font-sora text-white/80 leading-relaxed placeholder-white/40",
  controlLabel: "text-xs text-white/50 leading-none",
  controlLabelMobile: "text-[10px] text-white/50 leading-none",
};

export const themeRadii = {
  sm: "rounded-md",
  base: "rounded-xl",
  lg: "rounded-2xl",
  full: "rounded-full",
};

export const themeBorders = {
  subtle: "border border-white/10",
  strong: "border border-white/20",
  input: "border border-white/10",
};

export const themeBlur = {
  subtle: "backdrop-blur-sm",
  medium: "backdrop-blur-md",
  strong: "backdrop-blur-xl",
};

export const themeBackgrounds = {
  input: "bg-white/5",
  block: "bg-neutral-800/20",
};
export const modalContentPaddingTop = "pt-24";
export const themeSpacing = {
  section: {
    paddingX: {
      mobile: "px-4",
      tablet: "md:px-6",
      desktop: "lg:px-12",
    },
    paddingY: {
      mobile: "py-6",
      tablet: "md:py-12",
      desktop: "lg:py-16 xl:py-20",
    },
  },

  card: {
    padding: {
      mobile: "p-4",
      tablet: "md:p-8",
    },
    gap: {
      mobile: "space-y-6",
      tablet: "md:space-y-8",
    },
    marginBottom: {
      mobile: "mb-2",
      desktop: "mb-6",
      tablet: "md:mb-8",
    },
  },
  inputControl: {
    height: "h-8",
    paddingX: "px-3",
    paddingY: "py-1",
  },
  grid: {
    gap: {
      mobile: "gap-6",
      tablet: "lg:gap-8",
      desktop: "xl:gap-16",
    },
    columns: {
      default: "grid-cols-1",
      desktop: "lg:grid-cols-[1.35fr_0.95fr]",
    },
  },
  textarea: {
    padding:
      "pt-4 pr-5 pb-5 pl-4 md:pt-5 md:pr-6 md:pb-6 md:pl-5 lg:pt-4 lg:pr-6 lg:pb-6 lg:pl-4",

    minHeight:
      "min-h-[100px] md:min-h-[120px] lg:min-h-[110px] xl:min-h-[100px]",
  },
  button: "px-3 py-1.5 sm:px-5 sm:py-2",
  block: {
    spacingY: {
      mobile: "space-y-4",
      tablet: "md:space-y-6",
    },
  },
  motifs: {
    height: `
    h-20       
    md:h-24    
    lg:h-28    
    xl:h-32    
    2xl:h-48   
  `,
  },

  height: {
    recentDreams: {
      desktop: "lg:max-h-[calc(100vh-8rem)]",
    },
  },
};
export const themeMotif = {
  base: `
  h-6          
  md:h-14       
  lg:h-28      
  xl:h-32       
  2xl:h-48 `,

  hover: "hover:bg-white/10 hover:text-white/80 transition",
  active: "bg-white/10 text-white",
};
