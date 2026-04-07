export default function orderByProps(obj, order = []) {
  const result = [];
  const processedKeys = new Set();

  // 1. Сначала добавляем свойства в порядке из массива order
  for (const key of order) {
    if (key in obj) {
      result.push({ key, value: obj[key] });
      processedKeys.add(key);
    }
  }

  // 2. Собираем оставшиеся свойства
  const remainingProps = [];

  // Используем for-in для перебора свойств объекта
  for (const key in obj) {
    // Проверяем, что свойство собственное (не из прототипа)
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (!processedKeys.has(key)) {
        remainingProps.push({ key, value: obj[key] });
      }
    }
  }

  // 3. Сортируем оставшиеся свойства по алфавиту (по ключу)
  
  remainingProps.sort((a, b) => a.key.localeCompare(b.key));

  // 4. Добавляем отсортированные оставшиеся свойства в результат
  result.push(...remainingProps);

  return result;
}
