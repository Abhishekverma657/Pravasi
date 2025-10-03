import FAQRow from "./FAQRow";

export default function FAQTable({ faqs, onEdit, onDelete, onToggleActive }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <table className="w-full border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Question</th>
            <th className="p-3 text-left">Answer</th>
            <th className="p-3 text-center">Status</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {faqs.length > 0 ? (
            faqs.map((faq) => (
              <FAQRow
                key={faq.id}
                faq={faq}
                onEdit={onEdit}
                onDelete={onDelete}
                onToggleActive={onToggleActive}
              />
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center p-6 text-gray-500">
                No FAQs added yet
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
