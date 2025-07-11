// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';

// function InteractiveDemo({ initialCode, editableFields }) {
//   const [code, setCode] = useState(initialCode);
//   const [preview, setPreview] = useState('');

//   useEffect(() => {
//     // Создаем безопасный iframe для предпросмотра
//     const iframe = document.createElement('iframe');
//     iframe.style.width = '100%';
//     iframe.style.height = '200px';
//     iframe.style.border = '1px solid #e5e7eb';
//     iframe.style.borderRadius = '0.5rem';
    
//     const previewContainer = document.getElementById('preview-container');
//     previewContainer.innerHTML = '';
//     previewContainer.appendChild(iframe);

//     const doc = iframe.contentDocument || iframe.contentWindow.document;
//     doc.open();
//     doc.write(code);
//     doc.close();

//     return () => {
//       previewContainer.innerHTML = '';
//     };
//   }, [code]);

//   const handleEdit = (field, value) => {
//     const newCode = code.replace(
//       new RegExp(`<${field}>.*?</${field}>`, 's'),
//       `<${field}>${value}</${field}>`
//     );
//     setCode(newCode);
//   };

//   return (
//     <div className="mt-8 space-y-4">
//       {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div className="space-y-4">
//           <h3 className="text-lg font-semibold">Редактор</h3>
//           {editableFields.map((field) => (
//             <div key={field} className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700">
//                 {field === 'h1' ? 'Заголовок' : 'Текст'}
//               </label>
//               <input
//                 type="text"
//                 className="w-full p-2 border rounded"
//                 value={code.match(new RegExp(`<${field}>(.*?)</${field}>`))?.[1] || ''}
//                 onChange={(e) => handleEdit(field, e.target.value)}
//               />
//             </div>
//           ))}
//         </div>
//         <div className="space-y-4">
//           <h3 className="text-lg font-semibold">Предпросмотр</h3>
//           <div id="preview-container" className="bg-white rounded-lg shadow-sm" />
//         </div>
//       </div>
      
//       <div className="mt-4 p-4 bg-gray-50 rounded-lg">
//         <h4 className="font-medium mb-2">Подсказка:</h4>
//         <p className="text-sm text-gray-600">
//           Попробуйте изменить текст в редакторе и посмотрите, как меняется результат в предпросмотре.
//           Это поможет вам лучше понять, как работают HTML-теги.
//         </p>
//       </div> */}
//     </div>
//   );
// }

// export default InteractiveDemo; 