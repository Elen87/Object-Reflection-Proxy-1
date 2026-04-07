import orderByProps from '../src/js/orderByProps';

describe('orderByProps function', () => {
  const obj = {
    name: 'мечник',
    health: 10,
    level: 2,
    attack: 80,
    defence: 40,
  };

  test('should sort properties according to order array', () => {
    const result = orderByProps(obj, ['name', 'level']);

    expect(result).toEqual([
      { key: 'name', value: 'мечник' },
      { key: 'level', value: 2 },
      { key: 'attack', value: 80 },
      { key: 'defence', value: 40 },
      { key: 'health', value: 10 },
    ]);
  });

  test('should sort remaining properties alphabetically', () => {
    const result = orderByProps(obj, ['level']);

    expect(result).toEqual([
      { key: 'level', value: 2 },
      { key: 'attack', value: 80 },
      { key: 'defence', value: 40 },
      { key: 'health', value: 10 },
      { key: 'name', value: 'мечник' },
    ]);
  });

  test('should handle empty order array', () => {
    const result = orderByProps(obj, []);

    expect(result).toEqual([
      { key: 'attack', value: 80 },
      { key: 'defence', value: 40 },
      { key: 'health', value: 10 },
      { key: 'level', value: 2 },
      { key: 'name', value: 'мечник' },
    ]);
  });

  test('should handle missing order parameter (default to empty array)', () => {
    const result = orderByProps(obj);

    expect(result).toEqual([
      { key: 'attack', value: 80 },
      { key: 'defence', value: 40 },
      { key: 'health', value: 10 },
      { key: 'level', value: 2 },
      { key: 'name', value: 'мечник' },
    ]);
  });

  test('should ignore non-existent keys in order array', () => {
    const result = orderByProps(obj, ['nonexistent', 'name', 'invalid']);

    expect(result).toEqual([
      { key: 'name', value: 'мечник' },
      { key: 'attack', value: 80 },
      { key: 'defence', value: 40 },
      { key: 'health', value: 10 },
      { key: 'level', value: 2 },
    ]);
  });

  test('should handle objects with different property sets', () => {
    const anotherObj = {
      a: 1,
      c: 3,
      b: 2,
      d: 4,
    };

    const result = orderByProps(anotherObj, ['c', 'a']);

    expect(result).toEqual([
      { key: 'c', value: 3 },
      { key: 'a', value: 1 },
      { key: 'b', value: 2 },
      { key: 'd', value: 4 },
    ]);
  });

  test('should handle objects with string, number, boolean values', () => {
    const complexObj = {
      active: true,
      score: 100,
      name: 'Hero',
      isAlive: false,
    };

    const result = orderByProps(complexObj, ['name']);

    expect(result).toEqual([
      { key: 'name', value: 'Hero' },
      { key: 'active', value: true },
      { key: 'isAlive', value: false },
      { key: 'score', value: 100 },
    ]);
  });

  test('should handle empty object', () => {
    const result = orderByProps({}, ['name', 'level']);

    expect(result).toEqual([]);
  });

  test('should handle order array with all keys present', () => {
    const result = orderByProps(obj, ['name', 'level', 'attack', 'defence', 'health']);

    expect(result).toEqual([
      { key: 'name', value: 'мечник' },
      { key: 'level', value: 2 },
      { key: 'attack', value: 80 },
      { key: 'defence', value: 40 },
      { key: 'health', value: 10 },
    ]);
  });

  test('should preserve original object structure', () => {
    const originalObj = { ...obj };
    orderByProps(obj, ['name']);

    // Проверяем, что исходный объект не изменился
    expect(obj).toEqual(originalObj);
  });
});
 
test('should ignore properties from prototype chain', () => {
  // Создаем объект с прототипом
  const parentObj = { inherited: 'from parent' };
  const childObj = Object.create(parentObj);
  childObj.own = 'my property';
  
  const result = orderByProps(childObj, []);
  
  // Свойство из прототипа НЕ должно попасть в результат
  expect(result).not.toContainEqual({ key: 'inherited', value: 'from parent' });
  expect(result).toContainEqual({ key: 'own', value: 'my property' });
});
