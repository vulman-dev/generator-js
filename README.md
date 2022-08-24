# generator-js

Реализуйте и экспортируйте по умолчанию функцию, которая создает такую файловую систему(порядок элементов важен):

# Обратите внимание на метаданные
 
nodejs-package # директория (метаданные: { hidden: true })
```js
├── Makefile # файл  
├── README.md # файл  
├── dist # пустая директория  
├── __tests__ # директория  
│    └── half.test.js # файл (метаданные: { type: 'text/javascript' })  
├── babel.config.js # файл (метаданные: { type: 'text/javascript' })  
└── node_modules # директория (метаданные: { owner: 'root', hidden: false })  
    └── @babel # директория      
        └── cli # директория          
            └── LICENSE # файл  
```

# getHiddenFilesCount.js
Реализуйте и экспортируйте по умолчанию функцию, которая считает количество скрытых файлов в директории и всех поддиректориях. Скрытым файлом в Linux системах считается файл, название которого начинается с точки.

Пример
```js
import { mkdir, mkfile } from '@hexlet/immutable-fs-trees';  
import getHiddenFilesCount from '../getHiddenFilesCount.js';

const tree = mkdir('/', [  
 mkdir('etc', [  
    mkdir('apache'),  
    mkdir('nginx', [  
      mkfile('.nginx.conf', { size: 800 }),  
    ]),  
    mkdir('.consul', [  
      mkfile('.config.json', { size: 1200 }),  
      mkfile('data', { size: 8200 }),  
      mkfile('raft', { size: 80 }),  
    ]),  
  ]),  
  mkfile('.hosts', { size: 3500 }),  
  mkfile('resolve', { size: 1000 }),  
]);  
 
getHiddenFilesCount(tree); // 3
```

# du.js
Реализуйте и экспортируйте по умолчанию функцию, которая принимает на вход директорию и возвращает список вложенных узлов (директорий и файлов) в указанную директорию на один уровень, а так же место, которое они занимают. Размер файла задается в метаданных. Размер директории складывается из сумм всех размеров файлов, находящихся внутри во всех поддиректориях. Сами директории размера не имеют.

Пример
```js
import { mkdir, mkfile } from '@hexlet/immutable-fs-trees';
import du from '../du.js';
 
const tree = mkdir('/', [
  mkdir('etc', [
    mkdir('apache'),
    mkdir('nginx', [
      mkfile('nginx.conf', { size: 800 }),
    ]),
    mkdir('consul', [
      mkfile('config.json', { size: 1200 }),
      mkfile('data', { size: 8200 }),
      mkfile('raft', { size: 80 }),
    ]),
  ]),
  mkfile('hosts', { size: 3500 }),
  mkfile('resolve', { size: 1000 }),
]);
 
du(tree);
// [
//   ['etc', 10280],
//   ['hosts', 3500],
//   ['resolve', 1000],
// ]
```

# findFilesByName.js
Реализуйте и экспортируйте по умолчанию функцию, которая принимает на вход файловое дерево и подстроку, а возвращает список файлов, имена которых содержат эту подстроку. Функция должна вернуть полные пути до файлов.

Пример
```js
import { mkdir, mkfile } from '@hexlet/immutable-fs-trees';
import findFilesByName from '../findFilesByName.js';
 
const tree = mkdir('/', [
  mkdir('etc', [
    mkdir('apache'),
    mkdir('nginx', [
      mkfile('nginx.conf', { size: 800 }),
    ]),
    mkdir('consul', [
      mkfile('config.json', { size: 1200 }),
      mkfile('data', { size: 8200 }),
      mkfile('raft', { size: 80 }),
    ]),
  ]),
  mkfile('hosts', { size: 3500 }),
  mkfile('resolve', { size: 1000 }),
]);
 
findFilesByName(tree, 'co');
// ['/etc/nginx/nginx.conf', '/etc/consul/config.json']
```

Подсказки:
*Для реализации этой логики вам понадобится аккумулятор, в котором будет храниться путь от корня до текущего узла. При проваливании внутрь директорий к нему добавляется имя текущей директории. В остальном логика работы идентична примеру из теории.
*Переменную, содержащую внутри себя путь от корня до текущего узла, можно назвать ancestry.
*Для построения путей используйте функцию [path.join()](https://nodejs.org/api/path.html#path_path_join_paths).
*Проверку вхождения строк можно делать с помощью функции [str.includes()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes).
