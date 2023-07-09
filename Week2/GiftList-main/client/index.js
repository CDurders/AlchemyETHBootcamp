const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main() {
  if (process.argv.length != 3) {
    console.log("Please input a name to check the list for");
    process.exit();
  }

  const leaf = process.argv[2].trim();
  const merkleTree = new MerkleTree(niceList);
  const root = merkleTree.getRoot();
  const index = niceList.findIndex(n => n === leaf);
  const proof = merkleTree.getProof(index);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    proof,
    leaf,
    root
  });

  console.log({ gift });
}

main();