import { Link } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import {
  Container,
  Header,
  ListHeader,
  Card,
  InputSearchContainer,
} from './styles';

import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';
import Loader from '../../components/Loader';
import ContactService from '../../services/utils/ContactService';

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const filteredContacts = useMemo(() => contacts.filter((contact) => (
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  )), [contacts, searchTerm]);

  function handleToggleOrderBy() {
    setOrderBy((prevState) => (prevState === 'asc' ? 'desc' : 'asc'));
  }

  function handleChangeSearchTerm(event) {
    setSearchTerm(event.target.value);
  }

  useEffect(() => {
    async function loadContacts() {
      setIsLoading(true);

      try {
        setIsLoading(false);
        const contactsList = await ContactService.listContacts(orderBy);

        setContacts(contactsList);
      } catch (error) {
        // eslint-disable-next-line
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    loadContacts();
  }, [orderBy]);

  return (
    <Container>
      <Loader isLoading={isLoading} />
      <InputSearchContainer>
        <input
          type="text"
          value={searchTerm}
          placeholder="Pesquisar contato"
          onChange={handleChangeSearchTerm}
        />
      </InputSearchContainer>
      <Header>
        <strong>
          {filteredContacts.length}
          {filteredContacts.length === 1 ? ' contato' : ' contatos'}
        </strong>
        <Link to="/new">Novo contato</Link>
      </Header>

      {filteredContacts.length > 0 && (
        <ListHeader orderBy={orderBy}>
          <header>
            <button
              onClick={handleToggleOrderBy}
              type="button"
              className="sort-button"
            >
              <span>Nome</span>
              <img src={arrow} alt="arrow" />
            </button>
          </header>
        </ListHeader>
      )}

      {filteredContacts.map((contact) => (
        <Card key={contact.id}>
          <div className="info">
            <div className="contact-name">
              <strong>{contact.name}</strong>
              {contact.category_name && <small>{contact.category_name}</small>}
            </div>
            <span>{contact.email}</span>
            <span>{contact.phone}</span>
          </div>

          <div className="actions">
            <Link to={`/edit/${contact.id}`}>
              <img src={edit} alt="editar" />
            </Link>

            <button type="button">
              <img src={trash} alt="deletar" />
            </button>
          </div>
        </Card>
      ))}
    </Container>
  );
}
