/* eslint-disable no-nested-ternary */
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Container } from './styles';

export default function Header({ hasError, quatityOfContacts, quatityOfFilteredContacts }) {
  const alignment = hasError
    ? 'flex-end'
    : quatityOfContacts > 0
      ? 'space-between'
      : 'center';

  return (
    <Container
      justifyContent={alignment}
    >
      {!hasError && quatityOfContacts > 0 && (
      <strong>
        {quatityOfFilteredContacts}
        {quatityOfFilteredContacts === 1 ? ' contato' : ' contatos'}
      </strong>
      )}
      <Link to="/new">Novo contato</Link>
    </Container>
  );
}

Header.propTypes = {
  hasError: PropTypes.bool.isRequired,
  quatityOfContacts: PropTypes.number.isRequired,
  quatityOfFilteredContacts: PropTypes.number.isRequired,
};
