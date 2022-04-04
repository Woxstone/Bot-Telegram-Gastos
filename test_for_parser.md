describe("casos que puede tener add gasto", () => {
  test('addgasto patatas 123 = { cantidad: 123, concepto: "patatas 123", error: false }', () => {
    const resultado = gasto.creaGasto('addgasto patatas 123');
    expect(resultado.cantidad).toBe(123);
    // expect(resultado.concepto).toBe("patatas 123");
    expect(resultado.concepto).toBe("patatas");
    expect(resultado.error).toBe(false);
  });
  test('addgasto 128 = { cantidad: 128, concepto: "Sin concepto", error: false }', () => {
    const resultado = gasto.creaGasto('addgasto 128');
    expect(resultado.cantidad).toBe(128);
    expect(resultado.concepto).toBe("Sin concepto");
    expect(resultado.error).toBe(false);
  });
}
)

describe("throws an error when wrong format", () => {
  test('If creaGasto return undefined throw error', () => {
    const badGasto = 'Cosas cosas cosas';
    let error = "";
    try {
      gasto.creaGasto(badGasto);
    } catch (err) {
      error = err;
    }
    expect(error).toEqual('El formato es incorrecto. use: /addgasto <cantidad> <concepto>')
  })
  test('addgasto patatas = { cantidad: undefined, concepto: "Sin concepto", error: true }', () => {
    const badGasto = 'addgasto patatas';
    let error = "";
    try {
      gasto.creaGasto(badGasto);
    } catch (err) {
      error = err;
    }
    expect(error).toEqual('El formato es incorrecto. use: /addgasto <cantidad> <concepto>')
  });
  test('addgasto = { cantidad: undefined, concepto: "Sin concepto", error: true }}', () => {
    const badGasto = 'addgasto';
    let error = "";
    try {
      gasto.creaGasto(badGasto);
    } catch (err) {
      error = err;
    }
    expect(error).toEqual('El formato es incorrecto. use: /addgasto <cantidad> <concepto>')
  });
  test('addgasto comida en el centro', () => {
    const badGasto = 'addgasto comida en el centro';
    let error = "";
    try {
      gasto.creaGasto(badGasto);
    } catch (err) {
      error = err;
    }
    expect(error).toEqual('El formato es incorrecto. use: /addgasto <cantidad> <concepto>')
  });

})
describe("agregar gasto y comprueba", () => {
  test('addgasto 140 comida en el centro', () => {
    expect(gasto.creaGasto('addgasto 140 comida en el centro').cantidad).toBe(140);
  });
  test('addgasto comida en el centro 140', () => {
    expect(gasto.creaGasto('addgasto comida en el centro 140').cantidad).toBe(140);
  });
  test('addgasto comida en el resturante 5 con 16€', () => {
    expect(gasto.creaGasto('addgasto comida en el resturante 5 con 16€').cantidad).toBe(16);
  });
})