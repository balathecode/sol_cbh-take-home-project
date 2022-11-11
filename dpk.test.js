const {
  deterministicPartitionKey,
  createHash,
  getCandidateHash,
} = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });
  it("Returns the event.partitionKey", () => {
    const trivialKey = deterministicPartitionKey({ partitionKey: "iamgood" });
    expect(trivialKey).toBe("iamgood");
  });
  it("Returns the TRIVIAL_PARTITION_KEY for null", () => {
    const trivialKey = deterministicPartitionKey(null);
    expect(trivialKey).toBe("0");
  });
  it("Returns the TRIVIAL_PARTITION_KEY for undefined", () => {
    const trivialKey = deterministicPartitionKey(undefined);
    expect(trivialKey).toBe("0");
  });
});

describe("createHash", () => {
  // valid case
  it("Returns hash for the valid string input", () => {
    const hash = createHash("test_str");
    expect(hash).not.toBe(null);
  });

  // cornor cases null check
  it("Returns hash for the in_valid string input", () => {
    const hash = createHash(undefined);
    expect(hash).toBe(null);
  });

  //cornor cases undefiend check
  it("Returns hash for the in_valid string input", () => {
    const hash = createHash(null);
    expect(hash).toBe(null);
  });
});

describe("getCandidateHash", () => {
  // valid case
  it("Returns hash for the valid string input", () => {
    const hash = getCandidateHash("test_str");
    expect(hash).not.toBe(null);
  });

  // cornor cases null check
  it("Returns hash for the in_valid string input", () => {
    const hash = createHash(undefined);
    expect(hash).toBe(null);
  });

  //cornor cases undefiend check
  it("Returns hash for the in_valid string input", () => {
    const hash = createHash(null);
    expect(hash).toBe(null);
  });
});
