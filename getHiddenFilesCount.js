import { mkfile, mkdir, getChildren, getMeta, getName, isDirectory, isFile } from "@hexlet/immutable-fs-trees";
import _ from 'lodash';

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

const getHiddenFilesCount = (tree) => {
  const name = getName(tree);
  if (isFile(tree)) {
    return name.startsWith('.') ? 1 : 0;
  }

  const children = getChildren(tree);
  const hiddenFilesCounts = children.map(getHiddenFilesCount);
  return _.sum(hiddenFilesCounts);
};

export default getHiddenFilesCount;


