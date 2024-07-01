import styled, { css } from 'styled-components';
import sb from '../util/styledBranch.ts';

interface ButtonProps {
  $size: 'small' | 'medium' | 'large';
  $shape: 'circle' | 'rounded' | 'square' | 'full';
  $color: 'primary' | 'white';
  $border?: boolean;
}

const Button = styled.button<ButtonProps>`
  ${(props) =>
    props.$border
      ? css`
          border: 1px solid #ccc;
          box-sizing: border-box;
        `
      : css`
          border: none;
        `}
  ${(props) =>
    sb(props.$size, {
      small: css`
        ${sb(props.$shape, {
          circle: css`
            width: 2.25rem;
            height: 2.25rem;
            border-radius: 50%;
          `,
          rounded: css`
            padding: 0.625rem 1.125rem;
            border-radius: 100px;
          `,
          square: css`
            padding: 0.625rem 1.125rem;
            border-radius: 0.75rem;
          `,
          full: css`
            width: 100%;
            padding: 0.625rem 1.125rem;
            border-radius: 0.75rem;
          `,
        })}
        font-size: 0.875rem;
      `,
      medium: css`
        ${sb(props.$shape, {
          circle: css`
            width: 2.75rem;
            height: 2.75rem;
            border-radius: 50%;
          `,
          rounded: css`
            padding: 0.75rem 1.5rem;
            border-radius: 200px;
          `,
          square: css`
            padding: 0.75rem 1.5rem;
            border-radius: 1rem;
          `,
          full: css`
            width: 100%;
            padding: 0.75rem 1.5rem;
            border-radius: 1rem;
          `,
        })}
        font-size: 1rem;
      `,
      large: css`
        ${sb(props.$shape, {
          circle: css`
            width: 3.375rem;
            height: 3.375rem;
            border-radius: 50%;
          `,
          rounded: css`
            padding: 1rem 2rem;
            border-radius: 200px;
          `,
          square: css`
            padding: 1rem 2rem;
            border-radius: 1.25rem;
          `,
          full: css`
            width: 100%;
            padding: 1rem 2rem;
            border-radius: 1.25rem;
          `,
        })}
        font-size: 1.25rem;
      `,
    })}
  ${(props) =>
    sb(props.$color, {
      primary: css`
        color: #fff;
        background-color: ${props.theme.color.primary};
        font-weight: ${props.theme.fontWeight.bold};
      `,
      white: css`
        color: #333;
        background-color: #fff;
        font-weight: ${props.theme.fontWeight.regular};
      `,
    })}
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    filter: brightness(95%);
  }
`;

Button.defaultProps = {
  $border: false,
};

export default Button;
