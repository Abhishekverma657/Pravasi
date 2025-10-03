import ContactRow from "./ContactRow";

export default function ContactTable({ contacts, onView, onDelete, onToggleRead }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <table className="w-full border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Phone</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.length > 0 ? (
            contacts.map((contact) => (
              <ContactRow
                key={contact.id}
                contact={contact}
                onView={onView}
                onDelete={onDelete}
                onToggleRead={onToggleRead}
              />
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center p-6 text-gray-500">
                No messages found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
