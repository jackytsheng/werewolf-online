const breakpoint = {
  medium: (...css: any) =>
    `@media (max-width: 600px) {
      ${css}
    }
  `,
};

export enum breakpoints {
  medium = 600,
}

export default breakpoint;
