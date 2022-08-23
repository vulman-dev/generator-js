import { mkfile, mkdir, getChildren, getMeta, getName, isDirectory, isFile } from "@hexlet/immutable-fs-trees";
import _ from 'lodash';

const tree = mkdir('/', [
    mkfile('oNe'),
    mkfile('Two'),
    mkfile('THREE'),
]);

const children = getChildren(tree);
const newChildren = children.map((child) => {
    const name = getName(child);
    const newMeta = _.cloneDeep(getMeta(child));
    if (isDirectory(child)) {
        return mkdir(name.toLowerCase(), getChildren(child), newMeta);
    }
    return mkfile(name.toLowerCase(), newMeta);
});

const newMeta = _.cloneDeep(getMeta(tree));
const tree2 = mkdir(getName(tree), newChildren, newMeta);
console.log(tree2);