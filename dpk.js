const crypto = require("crypto");

// Moved here, to resuse consts at multiple functions
const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

deterministicPartitionKey = (event) => {
  if (event) {
    if (event.partitionKey) return event.partitionKey;
    else return getCandidateHash(JSON.stringify(event));
  }
  return TRIVIAL_PARTITION_KEY;
};

// Reusing the same hash function multiple times
createHash = (data) => {
  try {
    return crypto.createHash("sha3-512").update(data).digest("hex");
  } catch (error) {
    return null;
  }
};

// Separe the candidate logic to function
getCandidateHash = (eventStr) => {
  let candidate = createHash(eventStr);
  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = createHash(candidate);
  }
  return candidate;
};

module.exports = { getCandidateHash, createHash, deterministicPartitionKey };
