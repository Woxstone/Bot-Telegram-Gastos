// // COMO USAR UN MOCK MANUAL DE UNA CLASE ES6 
// //CREAS LOS METODOS ESTATICOS O DINAMICOS
// //los metodos dinamicos conviene exportarlos e importarlos en el test para poder modificar su implementacion
// // en este caso podemos crear nuevos metodos que no estan en la clase original NO SE RECOMIENDA
// export const testfunctmock = jest.fn();
// //los metodos estaticos no es necesario exportar o importar porque se puede accedera ellos desde el test de forma estatica
// const getByChatIdmock = jest.fn();



// //LOS METODOS DINAMICOS SE ASOCIAN MEDIANTE EL MOCK IMPLEMENTATION 
// const Ledger = jest.fn().mockImplementation(() => {
//   return {
//     testfunct: testfunctmock
//   };
// });

// // LOS METODOS DINAMICOS DIRECTAMENTE
// Ledger.getByChatId = getByChatIdmock;
// // tambien podemos hacerlo todo en una linea
// Ledger.addAndSave = jest.fn();

// //EXPORTAS LA CLASE
// export { Ledger };

const Ledger = jest.fn();

Ledger.collection = jest.fn().mockReturnValue({});
Ledger.add = jest.fn();
Ledger.save = jest.fn();
Ledger.addAndSave = jest.fn();
Ledger.load = jest.fn();
Ledger.getByChatId = jest.fn();

export { Ledger };