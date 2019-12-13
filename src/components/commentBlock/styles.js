import styled, { css } from 'styled-components';

const GridBox = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 7px;
  grid-column: 1 / 3;
`;

const Block = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  width: 450px;
  border: 1px solid #ededed;
  padding: 7px 10px;
`;

const TextBlock = styled.div`
  grid-column: 1 / 4;
`;

const BlockTitle = styled.span`
  font-size: 12px;
  color: #000;
  ${(props) => props.date && css`
    color: #A0A4A5;
  `}
  ${(props) => props.main && css`
    color: #A0A4A5;
  `}
`;
const OnlyReadStar = styled.span.attrs((props) => ({
  starsFill: () => {
    switch (props.rating) {
    case 1:
      return css`
        &.r_one {
          color:#f7be20;
        }
        `;
    case 2:
      return css`
        &.r_one, &.r_two {
          color:#f7be20;
        }
      `;
    case 3:
      return css`
        &.r_one, &.r_two, &.r_three {
          color:#f7be20;
        }
      `;
    case 4:
      return css`
        &.r_one, &.r_two, &.r_three, &.r_four {
        color:#f7be20;
        }
      `;
    case 5:
      return css`
        &.r_one, &.r_two, &.r_three, &.r_four, &.r_five {
          color:#f7be20;
        }
      `;
    default:
      return '';
    }
  },
}))`
  color: rgba(209, 209, 209, 0.6);
  ${(props) => props.starsFill};
`;
export {
  GridBox,
  Block,
  TextBlock,
  BlockTitle,
  OnlyReadStar,
};
