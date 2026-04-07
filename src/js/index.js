import orderByProps from './orderByProps';

const obj = {
  name: 'мечник',
  health: 10,
  level: 2,
  attack: 80,
  defence: 40,
};

console.log('Исходный объект:', obj);
console.log('Сортировка с порядком ["name", "level"]:');
console.log(orderByProps(obj, ['name', 'level']));

console.log('\nСортировка с пустым порядком (только алфавит):');
console.log(orderByProps(obj, []));

console.log('\nСортировка с несуществующими ключами:');
console.log(orderByProps(obj, ['nonexistent', 'name']));
