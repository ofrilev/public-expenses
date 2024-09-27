bring cloud;

let bucket = new cloud.Bucket();
let counter = new cloud.Counter(
  initial: 1
);
let queue = new cloud.Queue();

queue.setConsumer(inflight (message: str) => {
  let index = counter.inc();
  bucket.put("wing-${index}.txt", "Hello, ${message}");
  log("file wing-${index}.txt created");
});