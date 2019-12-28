import React from 'react';
import PropTypes from 'prop-types';
import { NoteTitle, NoteCount } from './styles';
import { RowGrid } from '../../comments/styles';

const Notifications = ({ title, bookId, count }) => {
  const handleNoteIsCheck = async () => {
    await fetch(`/profile/notifications/check/book${bookId}`);
  };

  return (
    <RowGrid style={{ gridTemplateColumns: '1fr 150px' }}>
      <NoteTitle to={`/book/${bookId}`} onClick={handleNoteIsCheck}>
        {title}
      </NoteTitle>
      <NoteCount>
        {`${count} новых отзывa`}
      </NoteCount>
    </RowGrid>
  );
};

Notifications.propTypes = {
  title: PropTypes.string.isRequired,
  bookId: PropTypes.string.isRequired,
  count: PropTypes.string.isRequired,
};

export default Notifications;
