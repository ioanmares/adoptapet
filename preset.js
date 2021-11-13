// Example preset
module.exports = {
  theme: {
    extend: {
      animation: {
        "reveal-first": "reveal-first 0.5s ease-out 1",
        "reveal-second": "reveal-second 1s ease-in 1",
        "reveal-third": "reveal-third 2s ease-out 1",
      },
      keyframes: {
        "reveal-first": {
          "0%": {
            transform: "translate(-100px, -100px)",
            opacity: 0,
          },
          "20%": {
            opacity: 1,
          },
          "100%": {
            transform: "none",
          },
        },
        "reveal-second": {
          "0%, 50%": {
            opacity: 0,
          },
          "100%": {
            opacity: 1,
          },
        },
        "reveal-third": {
          "0%, 75%": {
            opacity: 0,
          },
          "75%": {
            transform: "rotate(0deg)",
          },
          "100%": {
            opacity: 1,
            transform: "rotate(360deg)",
          },
        },
      },
      zIndex: {
        "-1": "-1",
      },
    },
  },
};
