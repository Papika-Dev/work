import styled from 'styled-components';
import { CartRowTitle } from '../../cart/cartStyles';
import { BookTitle } from '../../bookCard/bookCardStyles';

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const NoteTitle = styled(CartRowTitle)`
  padding-right: 15px;
`;

const NoteCount = styled.span`
  font-size: 12px;
  color: #E9776C;
  font-weight: 500;
`;

const EmptyTitle = styled(BookTitle)`
  font-size: 14px;
`;

export {
  FlexColumn,
  NoteTitle,
  NoteCount,
  EmptyTitle,
};
