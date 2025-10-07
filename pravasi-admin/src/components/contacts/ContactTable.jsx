// // import ContactRow from "./ContactRow";

// // export default function ContactTable({ contacts, onView, onDelete, onToggleRead }) {
// //   return (
// //     <div className="bg-white rounded-xl shadow-lg overflow-hidden">
// //       <table className="w-full border-collapse">
// //         <thead className="bg-gray-100">
// //           <tr>
// //             <th className="p-3 text-left">Name</th>
// //             <th className="p-3 text-left">Email</th>
// //             <th className="p-3 text-left">Phone</th>
// //             <th className="p-3 text-left">Status</th>
// //             <th className="p-3 text-center">Actions</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {contacts.length > 0 ? (
// //             contacts.map((contact) => (
// //               <ContactRow
// //                 key={contact.id}
// //                 contact={contact}
// //                 onView={onView}
// //                 onDelete={onDelete}
// //                 onToggleRead={onToggleRead}
// //               />
// //             ))
// //           ) : (
// //             <tr>
// //               <td colSpan="5" className="text-center p-6 text-gray-500">
// //                 No messages found
// //               </td>
// //             </tr>
// //           )}
// //         </tbody>
// //       </table>
// //     </div>
// //   );
// // }

// import { AnimatePresence, motion } from "framer-motion";
// import ContactRow from "./ContactRow";

// export default function ContactTable({ contacts, onView, onDelete, onToggleRead }) {
//   return (
//     <motion.div
//       layout
//       initial={{ opacity: 0, y: 10 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
//     >
//       <table className="w-full border-collapse">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="p-3 text-left font-semibold text-gray-700">Name</th>
//             <th className="p-3 text-left font-semibold text-gray-700">Email</th>
//             <th className="p-3 text-left font-semibold text-gray-700">Phone</th>
//             <th className="p-3 text-left font-semibold text-gray-700">Status</th>
//             <th className="p-3 text-center font-semibold text-gray-700">Actions</th>
//           </tr>
//         </thead>
//         <AnimatePresence>
//           <tbody>
//             {contacts.length > 0 ? (
//               contacts.map((contact) => (
//                 <ContactRow
//                   key={contact.id}
//                   contact={contact}
//                   onView={onView}
//                   onDelete={onDelete}
//                   onToggleRead={onToggleRead}
//                 />
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="5" className="text-center p-6 text-gray-500">
//                   No messages found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </AnimatePresence>
//       </table>
//     </motion.div>
//   );
// }

import { AnimatePresence, motion } from "framer-motion";
import ContactRow from "./ContactRow";

export default function ContactTable({ contacts, onView, onDelete, onToggleRead, deleting }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
    >
      <table className="w-full border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left font-semibold text-gray-700">Name</th>
            <th className="p-3 text-left font-semibold text-gray-700">Email</th>
            <th className="p-3 text-left font-semibold text-gray-700">Phone</th>
            <th className="p-3 text-left font-semibold text-gray-700">Status</th>
            <th className="p-3 text-center font-semibold text-gray-700">Actions</th>
          </tr>
        </thead>
        <AnimatePresence>
          <tbody>
            {contacts.length > 0 ? (
              contacts.map((contact) => (
                <ContactRow
                  key={contact._id}
                  contact={contact}
                  onView={onView}
                  onDelete={onDelete}
                  onToggleRead={onToggleRead}
                  deleting={deleting}
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
        </AnimatePresence>
      </table>
    </motion.div>
  );
}
