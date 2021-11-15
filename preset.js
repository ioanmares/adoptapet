// Example preset
module.exports = {
  theme: {
    extend: {
      maxHeight: {
        200: "200px",
      },
      minWidth: {
        250: "250px",
        400: "400px",
      },
      maxWidth: {
        "3/4": "75%",
      },
      animation: {
        "reveal-first": "reveal-first 1s ease-out 1",
        "reveal-second": "reveal-second 2s ease-in 1",
        "reveal-third": "reveal-third 3s ease-out 1",
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
