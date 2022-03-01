import { Parser } from '../../src/helpers/parser.js';

describe('Parser method itting of ctx.from', () => {

    const default_from = {
        id: 305,
        is_bot: false,
        first_name: 'Nacho',
        last_name: 'mi apellido',
        username: 'dfadfa',
        language_code: 'en'
    };

    it('should extrac the id of the user', () => {
        const expectedintake = 305;

        const intake = Parser.extractId(default_from);

        expect(intake).toEqual(expectedintake);
    });

    it('should extrac the first_name of the user', () => {
        const expectedintake = 'Nacho';

        const intake = Parser.extractFirstName(default_from);

        expect(intake).toEqual(expectedintake);
    });

    it('should extrac de name of the user', () => {
        const expectedintake = 'dfadfa';

        const intake = Parser.extractName(default_from);

        expect(intake).toEqual(expectedintake);
    });
});

describe('extractMoney', () => {
    it('should parse money from a formated string NN concept', () => {
        const expectedintake = 42;
        const intakeString = '42 manzanas';

        const intake = Parser.extractMoney(intakeString);
        expect(intake).toEqual(expectedintake);
    });
});

describe('extractConcept', () => {
    it('should parse concept from a formated string NN concept', () => {
        const expectedintake = 'manzanas verdes';
        const intakeString = '42 manzanas verdes 10/02/2022';

        const intake = Parser.extractConcept(intakeString);
        expect(intake).toEqual(expectedintake);
    });

    it('should parse concept from a formated string NN concept', () => {
        const expectedintake = 'manzanas verdes';
        const intakeString = '42 manzanas verdes';

        const intake = Parser.extractConcept(intakeString);
        expect(intake).toEqual(expectedintake);
    });
});

describe('extractDate', () => {
    it('should parse date from a formated string NN concept', () => {
        const expectedintake = undefined;
        const intakeString = '42 manzanas verdes  ';

        const intake = Parser.extractDate(intakeString);
        expect(intake).toEqual(expectedintake);
    });

    it('should parse date from a formated string NN concept', () => {
        const expectedintake = '10/02/2022';
        const intakeString = '42 manzanas verdes 10/02/2022';

        const intake = Parser.extractDate(intakeString);
        expect(intake).toEqual(expectedintake);
    });
});

describe('Combinaciones', () => {
    it('123 concepto = { money: 123, concept: "concepto", date: undefined } ', () => {
        const intake = '123 concepto';
        expect(Parser.extractMoney(intake)).toBe(123);
        expect(Parser.extractConcept(intake)).toBe("concepto");
        expect(Parser.extractDate(intake)).toBe(undefined);
    });

    it('23  tetera = { cantidad: 23, concepto: "tetera",  date: undefined }', () => {
        const intake = '23  tetera';
        expect(Parser.extractMoney(intake)).toBe(23);
        expect(Parser.extractConcept(intake)).toBe("tetera");
        expect(Parser.extractDate(intake)).toBe(undefined);
    });

    it('234€ patata = { cantidad: 234, concepto: "234€ patata", date: undefined}', () => {
        const intake = '234€ patata';
        expect(Parser.extractMoney(intake)).toBe(234);
        expect(Parser.extractConcept(intake)).toBe("patata");
        expect(Parser.extractDate(intake)).toBe(undefined);
    });

    it('patatas 123€ = { cantidad: 123, concepto: "patatas 123€", date: undefined}', () => {
        const intake = 'patatas 123€';
        expect(Parser.extractMoney(intake)).toBe(123);
        expect(Parser.extractConcept(intake)).toBe("patatas");
        expect(Parser.extractDate(intake)).toBe(undefined);
    });

    it('123€ = { cantidad: 123, concepto: "", date: undefined}', () => {
        const intake = '123€';
        expect(Parser.extractMoney(intake)).toBe(123);
        expect(Parser.extractConcept(intake)).toBe("Sin concepto");
        expect(Parser.extractDate(intake)).toBe(undefined);
    });

});
// describe("casos que puede tener add gasto", () => {
//     it('addgasto patatas 123 = { cantidad: 123, concepto: "patatas 123", error: false }', () => {
//       const intakeado = gasto.creaGasto('addgasto patatas 123');
//       expect(intakeado.cantidad).toBe(123);
//       // expect(intakeado.concepto).toBe("patatas 123");
//       expect(intakeado.concepto).toBe("patatas");
//       expect(intakeado.error).toBe(false);
//     });
//     it('addgasto 128 = { cantidad: 128, concepto: "Sin concepto", error: false }', () => {
//       const intakeado = gasto.creaGasto('addgasto 128');
//       expect(intakeado.cantidad).toBe(128);
//       expect(intakeado.concepto).toBe("Sin concepto");
//       expect(intakeado.error).toBe(false);
//     });
//   }
//   )
  
//   describe("throws an error when wrong format", () => {
//     it('If creaGasto return undefined throw error', () => {
//       const badGasto = 'Cosas cosas cosas';
//       let error = "";
//       try {
//         gasto.creaGasto(badGasto);
//       } catch (err) {
//         error = err;
//       }
//       expect(error).toEqual('El formato es incorrecto. use: /addgasto <cantidad> <concepto>')
//     })
//     it('addgasto patatas = { cantidad: undefined, concepto: "Sin concepto", error: true }', () => {
//       const badGasto = 'addgasto patatas';
//       let error = "";
//       try {
//         gasto.creaGasto(badGasto);
//       } catch (err) {
//         error = err;
//       }
//       expect(error).toEqual('El formato es incorrecto. use: /addgasto <cantidad> <concepto>')
//     });
//     it('addgasto = { cantidad: undefined, concepto: "Sin concepto", error: true }}', () => {
//       const badGasto = 'addgasto';
//       let error = "";
//       try {
//         gasto.creaGasto(badGasto);
//       } catch (err) {
//         error = err;
//       }
//       expect(error).toEqual('El formato es incorrecto. use: /addgasto <cantidad> <concepto>')
//     });
//     it('addgasto comida en el centro', () => {
//       const badGasto = 'addgasto comida en el centro';
//       let error = "";
//       try {
//         gasto.creaGasto(badGasto);
//       } catch (err) {
//         error = err;
//       }
//       expect(error).toEqual('El formato es incorrecto. use: /addgasto <cantidad> <concepto>')
//     });
  
//   })
//   describe("agregar gasto y comprueba", () => {
//     it('addgasto 140 comida en el centro', () => {
//       expect(gasto.creaGasto('addgasto 140 comida en el centro').cantidad).toBe(140);
//     });
//     it('addgasto comida en el centro 140', () => {
//       expect(gasto.creaGasto('addgasto comida en el centro 140').cantidad).toBe(140);
//     });
//     it('addgasto comida en el resturante 5 con 16€', () => {
//       expect(gasto.creaGasto('addgasto comida en el resturante 5 con 16€').cantidad).toBe(16);
//     });
//   })

//test_m

describe('comprueba que el elemento gasto no da problemas', () => {
    it('addgasto 100€ comida en restaurante', () => {
      const intake = 'addgasto 100€ comida en restaurante';
      expect(Parser.extractMoney(intake)).toBe(100);
    });
    it('addgasto -100€ comida en restaurante', () => {
      const intake = 'addgasto -100€ comida en restaurante';
      expect(Parser.extractMoney(intake)).toBe(-100);
    });
    it('addgasto 100.50€ comida en restaurante', () => {
      const intake = 'addgasto 100.50€ comida en restaurante';
      expect(Parser.extractMoney(intake)).toBe(100.50);
    });
    it('addgasto 0€ comida en restaurante', () => {
      const intake = 'addgasto 0€ comida en restaurante';
      expect(Parser.extractMoney(intake)).toBe(0);
    });
    it('addgasto -0€ comida en restaurante', () => {
      const intake = 'addgasto -0€ comida en restaurante';
      expect(Parser.extractMoney(intake)).toBe(-0);
    });
    it('addgasto 100,50€ comida en restaurante', () => {
      const intake = 'addgasto 100,50€ comida en restaurante';
      expect(Parser.extractMoney(intake)).toBe(100.50); 
    });
  
    it('addgasto 0,11111111111111111111€ comida en restaurante', () => {
      const intake = 'addgasto 0,11111111111111111111€ comida en restaurante';
      expect(Parser.extractMoney(intake)).toBe(0.11111111111111111111);
    });
    it('addgasto 5euros comida en restaurante', () => {
      const intake = 'addgasto 5euros comida en restaurante';
      expect(Parser.extractMoney(intake)).toBe(5);
    });
    it('addgasto 5,  comida en restaurante', () => {
      const intake = 'addgasto 5,  comida en restaurante';
      expect(Parser.extractMoney(intake)).toBe(5);
    });
    // it('addgasto ,5  comida en restaurante', () => {
    //   const intake = 'addgasto ,5  comida en restaurante';
    //   try {
    //     Parser.extractMoney(intake);
    //   } catch (error) {
    //     expect(error).toBe("El formato es incorrecto. use: /addgasto <cantidad> <concepto>")
    //   }
    // });
    it(`addgasto 5'50  comida en restaurante`, () => {
      const intake = `addgasto 5'50  comida en restaurante`;
      expect(Parser.extractMoney(intake)).toBe(5.5); //must be 5.5
    });
    it('addgasto 100,50€ comida en restaurante', () => {
      const intake = 'addgasto 100,50€ comida en restaurante';
      expect(Parser.extractMoney(intake)).toBe(100.50); 
    });
    // it("addgasto '50€ comida en restaurante", () => {
    //   const intake = `addgasto '50€ comida en restaurante`;
    //   let error = "";
  
    //   try {
    //    console.log(Parser.extractMoney(intake))
    //   } catch (err) {
    //     error = err;
  
    //   }
    //   expect(error).toBe("El formato es incorrecto. use: /addgasto <cantidad> <concepto>")
    // })
  
  }
  );


  // test_p 



//   describe(`test sobre comando bien escrito`, () =>{
//   it('"addgasto 23 sardina" cantidad=23 concepto=sardina', () =>{ 
//     const intake = gasto.creaGasto("addgasto 23 sardina");
//     expect(Parser.extractMoney(intake)).toBe(23);
//     expect(Parser.extractConcept(intake)).toBe("sardina");
//   })
//   it('"adDGasto 23 sardina" cantidad=23 concepto=sardina', () =>{ 
//     const intake = gasto.creaGasto("adDGasto 23 sardina");
//     expect(Parser.extractMoney(intake)).toBe(23);
//     expect(Parser.extractConcept(intake)).toBe("sardina");
//   })
//   it('"adgasto 23 sardina" cantidad=23 concepto=sardina', () =>{ 
//     let errata = ""
//     try {gasto.creaGasto("adgasto 23 sardina");
      
//     } catch (error) {errata=error
      
//     }
//     expect(errata).toBe("El formato es incorrecto. use: /addgasto <cantidad> <concepto>");
  
//   })
//   it('"add gasto 23 sardina" cantidad=23 concepto=sardina', () =>{ 
    
//     let errata;
//     try {
//       gasto.creaGasto("add gasto 23 sardina")
//     } catch (error) {
//       errata=error;
//     }
//     expect(errata).toBe("El formato es incorrecto. use: /addgasto <cantidad> <concepto>"); 
    
//   })
  
//   it('"addgasto: 23 sardina" cantidad=23 concepto=sardina', () =>{ 
//     const intake = gasto.creaGasto("addgasto: 23 sardina");
//     expect(Parser.extractMoney(intake)).toBe(23);
//     expect(Parser.extractConcept(intake)).toBe('sardina'); 
//   })
//   it('"/addgasto 23 sardina" cantidad=23 concepto=sardina', () =>{ 
//     const intake = gasto.creaGasto("/addgasto 23 sardina");
//     expect(Parser.extractMoney(intake)).toBe(23);
//     expect(Parser.extractConcept(intake)).toBe("sardina");
//   })
//   it('"/adDGasto 23 sardina" cantidad=23 concepto=sardina', () =>{ 
//     const intake = gasto.creaGasto("/adDGasto 23 sardina");
//     expect(Parser.extractMoney(intake)).toBe(23);
//     expect(Parser.extractConcept(intake)).toBe("sardina");
//   })
//   it('"/adgasto 23 sardina" cantidad=23 concepto=sardina', () =>{ 
//     let errata = ""
//     try {gasto.creaGasto("/adgasto 23 sardina");      
//     } catch (error) {errata=error
//     }
//     expect(errata).toBe("El formato es incorrecto. use: /addgasto <cantidad> <concepto>"); 
//   })

//   it('"/add gasto 23 sardina" cantidad=23 concepto=sardina', () =>{ 
//      let errata = ""
//     try {gasto.creaGasto("/add gasto 23 sardina");      
//     } catch (error) {errata=error
//     }
//     expect(errata).toBe("El formato es incorrecto. use: /addgasto <cantidad> <concepto>"); 
//   })
//   it('"/addgasto: 23 sardina" cantidad=23 concepto=sardina', () =>{ 
//     const intake = gasto.creaGasto("addgasto: 23 sardina");
//     expect(Parser.extractMoney(intake)).toBe(23);
//     expect(Parser.extractConcept(intake)).toBe("sardina");
//   })  
// })



describe(`it sobre posicion cantidad y concepto`, () =>{
  it('"23 sardina" cantidad=23 concepto=sardina', () =>{ 
    const intake ="23 sardina";
    expect(Parser.extractMoney(intake)).toBe(23);
    expect(Parser.extractConcept(intake)).toBe("sardina");
  });
  it('"23 sardina" cantidad=23 concepto=sardina', () =>{ 
    const intake = "23 sardina";
    expect(Parser.extractMoney(intake)).toBe(23);
    expect(Parser.extractConcept(intake)).toBe("sardina");
 });
  it('"23 sardina" cantidad=23 concepto=sardina', () =>{ 
    const intake = ("23 sardina");
    expect(Parser.extractMoney(intake)).toBe(23);
    expect(Parser.extractConcept(intake)).toBe("sardina");
 });
  it('"sardina 23" cantidad=23 concepto=sardina', () =>{ 
    const intake = ("sardina 23");
    expect(Parser.extractMoney(intake)).toBe(23);
    expect(Parser.extractConcept(intake)).toBe("sardina"); 
  });
  it('"sardina 23" cantidad=23 concepto=sardina', () =>{ 
    const intake = ("sardina 23");
    expect(Parser.extractMoney(intake)).toBe(23);
    expect(Parser.extractConcept(intake)).toBe("sardina"); 
  });
//   it('"addgastosardina23" cantidad=23 concepto=sardina', () =>{ 
//     let errata = ""
//     try {gasto.creaGasto("addgastosardina23");      
//     } catch (error) {errata=error
//     }
//     expect(errata).toBe("El formato es incorrecto. use:  <cantidad> <concepto>");  
//   });
//   it('"addgasto23sardina" cantidad=23 concepto=sardina', () =>{ 
//     const intake = gasto.creaGasto("sardina 23");
//     expect(Parser.extractMoney(intake)).toBe(23);
//     expect(Parser.extractConcept(intake)).toBe("sardina"); 
//   });
//   it('"23addgastosardina" cantidad=23 concepto=sardina', () =>{ 
//     const intake = gasto.creaGasto("23addgastosardina");
//     expect(Parser.extractMoney(intake)).toBe(23);
//     expect(Parser.extractConcept(intake)).toBe("sardina"); 
//   });
//   it('"23sardinaaddgasto" cantidad=23 concepto=sardina', () =>{ 
//     const intake = gasto.creaGasto("23sardinaaddgasto");
//     expect(Parser.extractMoney(intake)).toBe(23);
//     expect(Parser.extractConcept(intake)).toBe("sardina"); 
//   });
//   it('"addgastosardina23" cantidad=23 concepto=sardina', () =>{ 
//     let errata = ""
//     try {gasto.creaGasto("addgastosardina23");      
//     } catch (error) {errata=error
//     }
//     expect(errata).toBe("El formato es incorrecto. use:  <cantidad> <concepto>");  
//   });
  it('"23 sardina" cantidad=23 concepto=sardina', () =>{ 
    const intake = ("23 sardina");
    expect(Parser.extractMoney(intake)).toBe(23);
    expect(Parser.extractConcept(intake)).toBe("sardina");
  });

  it('"sardina 23 " cantidad=23 concepto=sardina', () =>{ 
    const intake = ("sardina 23 ");
    expect(Parser.extractMoney(intake)).toBe(23);
    expect(Parser.extractConcept(intake)).toBe("sardina");
  });
  it('"sardina  23" cantidad=23 concepto=sardina', () =>{ 
    const intake = ("sardina  23");
    expect(Parser.extractMoney(intake)).toBe(23);
    expect(Parser.extractConcept(intake)).toBe("sardina");
  });
});


describe(`it sobre caracteres posibles`, () =>{
  it('"23 sardiná perü ?¿?+`-0=!!dfaªº,%&4fs" cantidad=23 concepto=sardiná perü ?¿?+`-0=!!dfaªº,%&4fs', () =>{ 
    const intake = ("23 sardiná perü ?¿?+`-0=!!dfaªº,%&4fs");
    expect(Parser.extractMoney(intake)).toBe(23);
    expect(Parser.extractConcept(intake)).toBe("sardiná perü ?¿?+`-0=!!dfaªº,%&4fs");
  });
});

describe(`it sobre ausencia de concepto`, () =>{
  it('"23" cantidad=23 concepto=Sin concepto', () =>{ 
    const intake = ("23");
    expect(Parser.extractMoney(intake)).toBe(23);
    expect(Parser.extractConcept(intake)).toBe("Sin concepto");
  })
//   it('"" cantidad=undefined concepto="Sin concepto"', () =>{ 
//     let intake = ""
//     expect(Parser.extractMoney(intake)).toBe("Sin cantidad");
//     expect(Parser.extractConcept(intake)).toBe("Sin concepto");
// })
})

// describe(`it sobre  concepto entremezclado`, () =>{
//   it('"addgasto patatas 23 pagadas en metalico" cantidad=23 concepto= ', () =>{ 
//     const intake = gasto.creaGasto("addgasto patatas 23 pagadas en metalico");
//     expect(Parser.extractMoney(intake)).toBe(23);
//     expect(Parser.extractConcept(intake)).toBe("patatas pagadas en metalico");
//   })
// })

















// const gasto = require("./it_p.js");


// describe(`it sobre comando bien escrito`, () =>{
//   it('"addgasto 23 sardina" cantidad=23 concepto=sardina', () =>{ 
//     const intake = gasto.creaGasto("addgasto 23 sardina");
//     expect(Parser.extractMoney(intake)).toBe(23);
//     expect(Parser.extractConcept(intake)).toBe("sardina");
//   })
//   it('"adDGasto 23 sardina" cantidad=23 concepto=sardina', () =>{ 
//     const intake = gasto.creaGasto("adDGasto 23 sardina");
//     expect(Parser.extractMoney(intake)).toBe(23);
//     expect(Parser.extractConcept(intake)).toBe("sardina");
//   })
//   it('"adgasto 23 sardina" cantidad=23 concepto=sardina', () =>{ 
//     let error = '';
//         try {
//             const g = gasto.creaGasto('adgasto 23 sardina');
//         } catch (err) {
//             error = err;
//         }
//         expect(error).toBe('El formato es incorrecto. use: /addgasto <cantidad> <concepto>');
//   })
//   it('"add gasto 23 sardina" cantidad=23 concepto=sardina', () =>{ 
//     let error = '';
//     try {
//         const g = gasto.creaGasto('add gasto 23 sardina');
//     } catch (err) {
//         error = err;
//     }
//     expect(error).toBe('El formato es incorrecto. use: /addgasto <cantidad> <concepto>');
//   })
//   it('"addgasto: 23 sardina" cantidad=23 concepto=sardina', () =>{ 
//     const intake = gasto.creaGasto("addgasto: 23 sardina");
//     expect(Parser.extractMoney(intake)).toBe(23);
//     expect(Parser.extractConcept(intake)).toBe('sardina');
//   })
//   it('"/addgasto 23 sardina" cantidad=23 concepto=sardina', () =>{ 
//     const intake = gasto.creaGasto("/addgasto 23 sardina");
//     expect(Parser.extractMoney(intake)).toBe(23);
//     expect(Parser.extractConcept(intake)).toBe("sardina");
//   })
//   it('"/adDGasto 23 sardina" cantidad=23 concepto=sardina', () =>{ 
//     const intake = gasto.creaGasto("/adDGasto 23 sardina");
//     expect(Parser.extractMoney(intake)).toBe(23);
//     expect(Parser.extractConcept(intake)).toBe("sardina");
//   })
//   it('"/adgasto 23 sardina" cantidad=23 concepto=sardina', () =>{ 
//     let error = '';
//     try {
//         const g = gasto.creaGasto('/adgasto 23 sardina');
//     } catch (err) {
//         error = err;
//     }
//     expect(error).toBe('El formato es incorrecto. use: /addgasto <cantidad> <concepto>');
//   });
//   it('"/add gasto 23 sardina" cantidad=23 concepto=sardina', () =>{ 
//     let error = '';
//     try {
//         const g = gasto.creaGasto('/add gasto 23 sardina');
//     } catch (err) {
//         error = err;
//     }
//     expect(error).toBe('El formato es incorrecto. use: /addgasto <cantidad> <concepto>');
//   })
//   it('"/addgasto: 23 sardina" cantidad=23 concepto=sardina', () =>{ 
//     const intake = gasto.creaGasto("addgasto: 23 sardina");
//     expect(Parser.extractMoney(intake)).toBe(23); 
//     expect(Parser.extractConcept(intake)).toBe("sardina"); 
//   })  
// })



// describe(`it sobre posicion comando,cantidad y concepto`, () =>{
//   it('"addgasto 23 sardina" cantidad=23 concepto=sardina', () =>{ 
//     const intake = gasto.creaGasto("addgasto 23 sardina");
//     expect(Parser.extractMoney(intake)).toBe(23);
//     expect(Parser.extractConcept(intake)).toBe("sardina");
//   })
//   it('"23 addgasto sardina" cantidad=23 concepto=sardina', () =>{ 
//     const intake = gasto.creaGasto("23 addgasto sardina");
//     expect(Parser.extractMoney(intake)).toBe(23); 
//     expect(Parser.extractConcept(intake)).toBe("sardina"); 
//   })
//   it('"23 sardina addgasto" cantidad=23 concepto=sardina', () =>{ 
//     const intake = gasto.creaGasto("23 sardina addgasto");
//     expect(Parser.extractMoney(intake)).toBe(23);
//     expect(Parser.extractConcept(intake)).toBe("sardina");
//   })
//   it('"sardina 23 addgasto" cantidad=23 concepto=sardina', () =>{ 
//     const intake = gasto.creaGasto("sardina 23 addgasto");
//     expect(Parser.extractMoney(intake)).toBe(23); 
//     expect(Parser.extractConcept(intake)).toBe("sardina"); 
//   })
//   it('"sardina addgasto 23" cantidad=23 concepto=sardina', () =>{ 
//     const intake = gasto.creaGasto("sardina addgasto 23");
//     expect(Parser.extractMoney(intake)).toBe(23);
//     expect(Parser.extractConcept(intake)).toBe("sardina"); 
//   })
//   it('"addgastosardina23" cantidad=23 concepto=sardina', () =>{ 
//     let error = '';
//     let intake = '';
//     try {
//         intake= gasto.creaGasto("addgastosardina23");
//     } catch (err) {
//         error = err;
//     }
//     expect(Parser.extractConcept(intake)).toBe(33);
//     expect(error).toBe('El formato es incorrecto. use: /addgasto <cantidad> <concepto>');
//   })
//   // it('"addgasto23sardina" cantidad=23 concepto=sardina', () =>{ 
//   //   let error = '';
//   //   try {
//   //       const g = gasto.creaGasto("addgasto23sardina");
//   //   } catch (err) {
//   //       error = err;
//   //   }
//   //   expect(error).toBe('El formato es incorrecto. use: /addgasto <cantidad> <concepto>');
//   // })
//   // it('"23addgastosardina" cantidad=23 concepto=sardina', () =>{ 
//   //   const intake = gasto.creaGasto("23addgastosardina");
//   //   expect(Parser.extractMoney(intake)).toBe(23); 
//   //   expect(Parser.extractConcept(intake)).toBe("sardina");
//   // })
//   // it('"23sardinaaddgasto" cantidad=23 concepto=sardina', () =>{ 
//   //   const intake = gasto.creaGasto("23sardinaaddgasto");
//   //   expect(Parser.extractMoney(intake)).toBe(23); //must be 23
//   //   expect(Parser.extractConcept(intake)).toBe("sardina"); //must be sardina
//   // })
//   // it('"addgastosardina23" cantidad=23 concepto=sardina', () =>{ 
//   //   const intake = gasto.creaGasto("addgastosardina23");
//   //   expect(Parser.extractMoney(intake)).toBe(0); //must be 23
//   //   expect(Parser.extractConcept(intake)).toBe(""); //must be sardina
//   // })
// //   it('"/addgasto 23 sardina" cantidad=23 concepto=sardina', () =>{ 
// //     const intake = gasto.creaGasto("/addgasto 23 sardina");
// //     expect(Parser.extractMoney(intake)).toBe(23);
// //     expect(Parser.extractConcept(intake)).toBe("sardina");
// //   })
// //   it('"23 /addgasto sardina" cantidad=23 concepto=sardina', () =>{ 
// //     const intake = gasto.creaGasto("23 /addgasto sardina");
// //     expect(Parser.extractMoney(intake)).toBe(0); //must be 23
// //     expect(Parser.extractConcept(intake)).toBe(""); //must be sardina
// //   })
// //   it('"23 sardina /addgasto" cantidad=23 concepto=sardina', () =>{ 
// //     const intake = gasto.creaGasto("23 sardina /addgasto");
// //     expect(Parser.extractMoney(intake)).toBe(0);//must be 23
// //     expect(Parser.extractConcept(intake)).toBe("");//must be sardina
// //   })
// //   it('"sardina 23 /addgasto" cantidad=23 concepto=sardina', () =>{ 
// //     const intake = gasto.creaGasto("sardina 23 /addgasto");
// //     expect(Parser.extractMoney(intake)).toBe(0); // must be 23
// //     expect(Parser.extractConcept(intake)).toBe(""); //must be sardina
// //   })
// //   it('"sardina /addgasto 23" cantidad=23 concepto=sardina', () =>{ 
// //     const intake = gasto.creaGasto("sardina /addgasto 23");
// //     expect(Parser.extractMoney(intake)).toBe(0); //must be 23
// //     expect(Parser.extractConcept(intake)).toBe(""); //must be sardina
// //   })
// })


// // describe(`it sobre caracteres posibles`, () =>{
// //   it('"addgasto 23 sardiná perü ?¿?+`-0=!!dfaªº,%&4fs" cantidad=23 concepto=sardiná perü ?¿?+`-0=!!dfaªº,%&4fs', () =>{ 
// //     const intake = gasto.creaGasto("addgasto 23 sardiná perü ?¿?+`-0=!!dfaªº,%&4fs");
// //     expect(Parser.extractMoney(intake)).toBe(23);
// //     expect(Parser.extractConcept(intake)).toBe("sardiná perü ?¿?+`-0=!!dfaªº,%&4fs");
// //   })
// // })

// // describe(`it sobre ausencia de concepto`, () =>{
// //   it('"addgasto 23" cantidad=23 concepto=Sin concepto', () =>{ 
// //     const intake = gasto.creaGasto("addgasto 23");
// //     expect(Parser.extractMoney(intake)).toBe(23);
// //     expect(Parser.extractConcept(intake)).toBe("Sin concepto");
// //   })
// //   it('"addgasto" cantidad=undefined concepto="Sin concepto"', () =>{ 
// //     const intake = gasto.creaGasto("addgasto");
// //     expect(Parser.extractMoney(intake)).toBe(undefined);// must be an error
// //     expect(Parser.extractConcept(intake)).toBe("Sin concepto");
// //   })
// // })

// // describe(`it sobre  concepto entremezclado`, () =>{
// //   it('"addgasto patatas 23 pagadas en metalico" cantidad=23 concepto= ', () =>{ 
// //     const intake = gasto.creaGasto("addgasto patatas 23 pagadas en metalico");
// //     expect(Parser.extractMoney(intake)).toBe(23);
// //     expect(Parser.extractConcept(intake)).toBe("patatas 23 pagadas en metalico");
// //   })
// // })