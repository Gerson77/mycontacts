/* eslint-disable react/jsx-no-bind */
import PageHeader from '../../components/PageHeader';
import ContactForm from '../../components/ContactForm';
import ContactService from '../../services/utils/ContactService';

export default function NewContact() {
  async function handleSubmit(formData) {
    try {
      const contact = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        category_id: formData.categoryId,
      };

      const response = await ContactService.createContacts(contact);
      // eslint-disable-next-line no-console
      console.log(response);
    } catch {
      // eslint-disable-next-line no-alert
      alert('Ocorreu um erro');
    }
  }
  return (
    <>
      <PageHeader title="Novo contato" />
      <ContactForm buttonLabel="Cadastrar" onSubmit={handleSubmit} />
    </>
  );
}
