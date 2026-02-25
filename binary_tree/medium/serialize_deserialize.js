const serialize = (root) => {
  const result = [];

  const dfs = (node) => {
    if (node === null) {
      result.push("#");
      return;
    }

    result.push(String(node.val));
    dfs(node.left);
    dfs(node.right);
  };

  dfs(root);
  return result.join(",");
};

const deserialize = (data) => {
  const values = data.split(",");
  let index = 0;

  const buildTree = () => {
    if (values[index] === "#") {
      index++;
      return null;
    }

    const node = {
      val: Number(values[index]),
      left: null,
      right: null,
    };

    index++;
    node.left = buildTree();
    node.right = buildTree();

    return node;
  };

  return buildTree();
};

const input = "7,5,4,#,#,6,#,#,8,#,9,#,#";

const tree = deserialize(input);
console.log(tree);

const result = serialize(tree);
console.log(result);
