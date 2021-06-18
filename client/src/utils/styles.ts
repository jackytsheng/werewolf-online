import { CSSObject } from 'styled-components';

const windowFix: CSSObject = {
  position: 'fixed',
  top: 0,
  bottom: 0,
  right: 0,
  left: 0,
};

const flexCenter: CSSObject = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export { windowFix, flexCenter };
