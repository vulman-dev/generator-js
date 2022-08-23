import { mkfile, mkdir, getChildren, getMeta, getName, isDirectory, isFile } from "@hexlet/immutable-fs-trees";
import _ from 'lodash';

const getFilesCount = (tree) => {
  if (isFile(tree)) {
    const { size } = getMeta(tree);
    return size;
  }

  const children = getChildren(tree);
  const descendantCounts = children.map(getFilesCount);

  return _.sum(descendantCounts);
};

const du = (tree) => {
  const children = getChildren(tree);
  return children
    .map((child) => [getName(child), getFilesCount(child)])
    .sort(([, size1], [, size2]) => size2 - size1);
};

export default du;

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

console.log(du(tree));

