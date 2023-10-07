/* eslint-disable react/jsx-one-expression-per-line */
import {
  useCallback, useDeferredValue, useEffect, useMemo, useState,
} from 'react';

import ContactService from '../../services/utils/ContactService';
import toast from '../../utils/toast';

export default function useHome() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [contactBeingDeleted, setContactBeingDelete] = useState(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const deferredSearchTerm = useDeferredValue(searchTerm);

  const filteredContacts = useMemo(() => contacts.filter((contact) => (
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  )), [contacts, deferredSearchTerm]);

  const handleToggleOrderBy = useCallback(() => {
    setOrderBy((prevState) => (prevState === 'asc' ? 'desc' : 'asc'));
  }, []);

  function handleChangeSearchTerm(event) {
    setSearchTerm(event.target.value);
  }

  const loadContacts = useCallback(async (signal) => {
    setIsLoading(true);

    try {
      setIsLoading(false);
      const contactsList = await ContactService.listContacts(orderBy, signal);

      setHasError(false);
      setContacts(contactsList);
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        return;
      }

      setHasError(true);
      setContacts([]);
    } finally {
      setIsLoading(false);
    }
  }, [orderBy]);

  useEffect(() => {
    const controller = new AbortController();
    loadContacts(controller.signal);
    return () => {
      controller.abort();
    };
  }, [loadContacts]);

  function handleTryAgain() {
    loadContacts();
  }

  const handleDeleteContact = useCallback((contact) => {
    setContactBeingDelete(contact);
    setIsDeleteModalVisible(true);
  }, []);

  function handleCloseDelete() {
    setIsDeleteModalVisible(false);
  }

  async function handleConfirmDeletedContact() {
    try {
      setIsLoadingDelete(true);
      await ContactService.deleteContact(contactBeingDeleted.id);

      setContacts((prevState) => prevState.filter(
        (contact) => contact.id !== contactBeingDeleted.id,
      ));

      handleCloseDelete();

      toast({
        type: 'success',
        text: 'Contato deletado com sucesso!',
      });
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao deletadar o contato!',
      });
    } finally {
      setIsLoadingDelete(false);
    }
  }

  return {
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
  };
}
