# generator-js

Реализуйте и экспортируйте по умолчанию функцию, которая создает такую файловую систему(порядок элементов важен):

# Обратите внимание на метаданные
 
nodejs-package # директория (метаданные: { hidden: true })
```
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

import { mkdir, mkfile } from '@hexlet/immutable-fs-trees';

import getHiddenFilesCount from '../getHiddenFilesCount.js';
 
```
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
