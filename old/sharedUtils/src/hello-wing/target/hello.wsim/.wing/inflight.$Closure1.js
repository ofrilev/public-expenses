module.exports = function({ $bucket, $counter }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(message) {
      const index = (await $counter.inc());
      (await $bucket.put(String.raw({ raw: ["wing-", ".txt"] }, index),String.raw({ raw: ["Hello, ", ""] }, message)));
      {console.log(String.raw({ raw: ["file wing-", ".txt created"] }, index))};
    }
  }
  return $Closure1;
}
