module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    future: {
      hoverOnlyWhenSupported: true,
    },
    theme: {
      extend: {},
    },
    plugins: [
      require('@tailwindcss/typography'),
      require("daisyui")],
    daisyui: {
      themes: [
        {
          "simply-red": {
            "primary": "#ef4444",
            "primary-content": "#ffffff",
            "secondary": "#af9cff",
            "secondary-content": "#000000",
            "accent": "#ef4444",
            "accent-content": "#ffffff",
            "neutral": "#2b2b2b",
            "neutral-content": "#ffffff",
            "base-100": "#ffffff",
            "base-200": "#f5f5f5",
            "base-300": "#e8e8e8",
            "base-content": "#ef4444",
          },
          "spicy-tech": {
            "color-scheme": "dark",
            "primary": "#c3a5e1",
            "primary-content": "#10021e",
            "secondary": "#edf643",
            "secondary-content": "#10021e",
            "accent": "#edf643",
            "accent-content": "#10021e",
            "neutral": "#c3a5e1",
            "neutral-content": "#10021e",
            "base-100": "#10021e",
            "base-200": "#1a063c",
            "base-300": "#240850",
            "base-content": "#fffff3",
          },
        }
      ],
      darkTheme: "spicy-tech",
      base: true,
      styled: true,
      utils: true,
      prefix: "",
      logs: true,
      themeRoot: ":root",
    },
  };
