const theme = {
  colors: {
    black: "#000000",
    white: "#FFFFFF",
    gray: {
      25: "#F4F4F5",
      50: "#D1D5DB",
      100: "#C3C7CF",
      // 200: "#ADB1BB",
      300: "#9096A3",
      400: "#70737C",
      500: "#555A67",
      600: "#37393F",
      // 700: "#2E2F33",
      800: "#212225",
      // 900: "#151617",
    },
    purple: {
      50: "#F0ECFE",
      100: "#DBD3FE",
      // 200: "#C0B0FF",
      // 300: "#9E86FC",
      // 400: "#7D5EF7",
      // 500: "#6541F2",
      600: "#4F29E5",
      700: "#3A16C9",
      800: "#23098F",
      // 900: "#11024D",
    },
    red: {
      50: "#FEECEF",
      // 100: "#FFDADF",
      // 200: "#FFC2CB",
      300: "#FF9CAA",
      400: "#F6697D",
      500: "#F54C64",
      600: "#EB2743",
      // 700: "#DB1733",
      // 800: "#C10F29",
    },
    green: {
      // 50: "#F2FFF9",
      100: "#D7FFEB",
      // 200: "#66E1A0",
      // 300: "#2FD181",
      // 400: "#1DB469",
      // 500: "#0A9952",
      600: "#048746",
      // 700: "#036A37",
      // 800: "#02542B",
    },
    blue: {
      // 50: "#E8EDFF",
      // 100: "#B4C4FF",
      // 200: "#94ABFF",
      // 300: "#6E8EFF",
      // 400: "#4A72FF",
      500: "#1B4DFF",
      600: "#0F3CD9",
      // 700: "#042BB2",
      // 800: "#042185",
    },
  },
  fonts: {
    title1: {
      semibold: `
        font-size: 28px;
        line-height: 36px; /* 1.3 */
        letter-spacing: -0.02em;
        font-weight: 600;
      `,
      medium: `
        font-size: 28px;
        line-height: 36px; /* 1.3 */
        letter-spacing: -0.02em;
        font-weight: 500;
      `,
      regular: `
        font-size: 28px;
        line-height: 36px; /* 1.3 */
        letter-spacing: -0.02em;
        font-weight: 400;
      `,
    },
    title2: {
      semibold: `
        font-size: 24px;
        line-height: 32px; /* 1.3 */
        letter-spacing: -0.02em;
        font-weight: 600;
      `,
      medium: `
        font-size: 24px;
        line-height: 32px; /* 1.3 */
        letter-spacing: -0.02em;
        font-weight: 500;
      `,
      regular: `
        font-size: 24px;
        line-height: 32px; /* 1.3 */
        letter-spacing: -0.02em;
        font-weight: 400;
      `,
    },
    heading1: {
      semibold: `
        font-size: 22px;
        line-height: 30px; /* 1.4 */
        letter-spacing: 0em;
        font-weight: 600;
      `,
      medium: `
        font-size: 22px;
        line-height: 30px; /* 1.4 */
        letter-spacing: 0em;
        font-weight: 500;
      `,
      regular: `
        font-size: 22px;
        line-height: 30px; /* 1.4 */
        letter-spacing: 0em;
        font-weight: 400;
      `,
    },
    heading2: {
      semibold: `
        font-size: 20px;
        line-height: 28px; /* 1.4 */
        letter-spacing: 0em;
        font-weight: 600;
      `,
      medium: `
        font-size: 20px;
        line-height: 28px; /* 1.4 */
        letter-spacing: 0em;
        font-weight: 500;
      `,
      regular: `
        font-size: 20px;
        line-height: 28px; /* 1.4 */
        letter-spacing: 0em;
        font-weight: 400;
      `,
    },
    heading3: {
      semibold: `
        font-size: 18px;
        line-height: 26px; /* 1.4 */
        letter-spacing: 0em;
        font-weight: 600;
      `,
      medium: `
        font-size: 18px;
        line-height: 26px; /* 1.4 */
        letter-spacing: 0em;
        font-weight: 500;
      `,
      regular: `
        font-size: 18px;
        line-height: 26px; /* 1.4 */
        letter-spacing: 0em;
        font-weight: 400;
      `,
    },
    heading4: {
      semibold: `
        font-size: 17px;
        line-height: 24px; /* 1.5 */
        letter-spacing: 0em;
        font-weight: 600;
      `,
      medium: `
        font-size: 17px;
        line-height: 24px; /* 1.5 */
        letter-spacing: 0em;
        font-weight: 500;
      `,
      regular: `
        font-size: 17px;
        line-height: 24px; /* 1.5 */
        letter-spacing: 0em;
        font-weight: 400;
      `,
    },
    body1: {
      semibold: `
        font-size: 16px;
        line-height: 24px; /* 1.5 */
        letter-spacing: 0em;
        font-weight: 600;
      `,
      medium: `
        font-size: 16px;
        line-height: 24px; /* 1.5 */
        letter-spacing: 0em;
        font-weight: 500;
      `,
      regular: `
        font-size: 16px;
        line-height: 24px; /* 1.5 */
        letter-spacing: 0em;
        font-weight: 400;
      `,
    },
    body2: {
      semibold: `
        font-size: 15px;
        line-height: 22px; /* 1.6 */
        letter-spacing: 0em;
        font-weight: 600;
      `,
      medium: `
        font-size: 15px;
        line-height: 22px; /* 1.6 */
        letter-spacing: 0em;
        font-weight: 500;
      `,
      regular: `
        font-size: 15px;
        line-height: 22px; /* 1.6 */
        letter-spacing: 0em;
        font-weight: 400;
      `,
    },
    label1: {
      semibold: `
        font-size: 14px;
        line-height: 20px; /* 1.6 */
        letter-spacing: 0em;
        font-weight: 600;
      `,
      medium: `
        font-size: 14px;
        line-height: 20px; /* 1.6 */
        letter-spacing: 0em;
        font-weight: 500;
      `,
      regular: `
        font-size: 14px;
        line-height: 20px; /* 1.6 */
        letter-spacing: 0em;
        font-weight: 400;
      `,
    },
    label2: {
      semibold: `
        font-size: 13px;
        line-height: 18px; /* 1.6 */
        letter-spacing: 0em;
        font-weight: 600;
      `,
      medium: `
        font-size: 13px;
        line-height: 18px; /* 1.6 */
        letter-spacing: 0em;
        font-weight: 500;
      `,
      regular: `
        font-size: 13px;
        line-height: 18px; /* 1.6 */
        letter-spacing: 0em;
        font-weight: 400;
      `,
    },
    caption1: {
      semibold: `
        font-size: 12px;
        line-height: 16px; /* 1.6 */
        letter-spacing: 0em;
        font-weight: 600;
      `,
      medium: `
        font-size: 12px;
        line-height: 16px; /* 1.6 */
        letter-spacing: 0em;
        font-weight: 500;
      `,
      regular: `
        font-size: 12px;
        line-height: 16px; /* 1.6 */
        letter-spacing: 0em;
        font-weight: 400;
      `,
    },
  },
};

export default theme;
