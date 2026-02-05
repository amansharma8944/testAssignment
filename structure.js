import fs from "fs";

const oldTree = JSON.parse(fs.readFileSync("./old.json", "utf-8"));
const newTree = JSON.parse(fs.readFileSync("./new.json", "utf-8"));

function flatten(tree, base = "") {
  let result = [];

  for (const node of tree) {
    const p = `${base}/${node.name}`;
    result.push(p);

    if (node.type === "dir" && node.children?.length) {
      result.push(...flatten(node.children, p));
    }
  }

  return result;
}

const oldSet = new Set(flatten(oldTree));
const newSet = new Set(flatten(newTree));

const missing = [...oldSet].filter(p => !newSet.has(p));

fs.writeFileSync("missing.json", JSON.stringify(missing, null, 2));
console.log("✅ missing.json created");
