import { mkfile, mkdir, getChildren, getMeta, getName, isDirectory, isFile } from "@hexlet/immutable-fs-trees";
import _ from 'lodash';
import path from 'path';

const findFilesByName = (tree, substring) => {
  const iter = (node, ancestry) => {
    const name = getName(node);
    const newAcenstry = path.join(ancestry, name);
    if (isFile(node)) {
      return name.includes(substring) ? newAcenstry : [];
    }
    const children = getChildren(node);
    return children.flatMap((child) => iter(child, newAcenstry));
  };

  return iter(tree, '');
};

export default findFilesByName;

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

console.log(findFilesByName(tree, 'co'));