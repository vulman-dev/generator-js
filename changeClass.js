import { mkfile, mkdir, getChildren, getMeta, getName, isDirectory, isFile } from "@hexlet/immutable-fs-trees";
import _, { takeRight } from 'lodash';


const changeClass = (tree, OldClass, NewClass) => {
  const iter = (node) => {
    const updatedNode = { ...node};

    if (_.has(node, 'className')) {
      const newClassName = OldClass === node.className ? NewClass : node.className;
      updatedNode.className = newClassName;
    }

    if (node.type === 'tag-internal') {
      const newChildren = node.children.map(iter);
      updatedNode.children = newChildren;
    }

    return updatedNode;
  };

  return iter(tree);
};

const tree = {
  name: 'div',
  type: 'tag-internal',
  className: 'hexlet-community',
  children: [
    {
      name: 'div',
      type: 'tag-internal',
      className: 'old-class',
      children: [],
    },
    {
      name: 'div',
      type: 'tag-internal',
      className: 'old-class',
      children: [],
    },
  ],
};

console.log(changeClass(tree, 'old-class', 'new-class'));

