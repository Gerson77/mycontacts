import { Container } from './styles';
import Loader from '../../components/Loader';
import useHome from './useHome';

import InputSearch from './components/InputSearch';
import Header from './components/Header';
import ErrorStatus from './components/ErrorStatus';
import EmptyList from './components/EmptyList';
import SearchNotFound from './components/SearchNotFound';
import ContactList from './components/ContactList';
import Modal from '../../components/Modal';

export default function Home() {
  const {
    isLoading,
    isLoadingDelete,
    isDeleteModalVisible,
    contactBeingDeleted,
    handleCloseDelete,
    handleConfirmDeletedContact,
    contacts,
    searchTerm,
    handleChangeSearchTerm,
    hasError,
    handleDeleteContact,
    filteredContacts,
    handleTryAgain,
    orderBy,
    handleToggleOrderBy,
  } = useHome();

  const hasContacts = contacts.length > 0;
  const isListEmpty = !hasError && (!isLoading && !hasContacts);
  const isSearchEmpty = !hasError && (hasContacts && filteredContacts.length < 1);

  return (
    <Container>
      <Loader isLoading={isLoading} />

      {hasContacts && (
        <InputSearch
          onChange={handleChangeSearchTerm}
          value={searchTerm}
        />
      )}
      <Header
        hasError={hasError}
        quatityOfContacts={contacts.length}
        quatityOfFilteredContacts={filteredContacts.length}
      />

      {hasError && <ErrorStatus onTryAgain={handleTryAgain} />}
      {isListEmpty && <EmptyList />}
      {isSearchEmpty && <SearchNotFound searchTerm={searchTerm} />}

      {hasContacts && (
        <>
          <ContactList
            filteredContacts={filteredContacts}
            orderBy={orderBy}
            onToggleOrderBy={handleToggleOrderBy}
            onDeleteContact={handleDeleteContact}
          />

          <Modal
            danger
            isLoading={isLoadingDelete}
            visible={isDeleteModalVisible}
            title={`Tem certeza que deseja remover o contato "${contactBeingDeleted?.name}"?`}
            confirmLabel="Deletar"
            onCancel={handleCloseDelete}
            onConfirm={handleConfirmDeletedContact}
          >
            <p>Esta ação podera não poderá ser desfeita!</p>
          </Modal>
        </>
      )}
    </Container>
  );
}
