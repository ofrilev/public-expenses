exports.handler = async function(event) {
  return await (new (require("/opt/homebrew/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/target-sim/queue.setconsumer.inflight.js")).QueueSetConsumerHandlerClient({ handler: 
          (await (async () => {
            const $Closure1Client = 
          require("./inflight.$Closure1.js")({
            $bucket: (function(env) {
        let handle = process.env[env];
        if (!handle) {
          throw new Error("Missing environment variable: " + env);
        }
        return $simulator.findInstance(handle);
      })("BUCKET_HANDLE_2cd0933d"),
            $counter: (function(env) {
        let handle = process.env[env];
        if (!handle) {
          throw new Error("Missing environment variable: " + env);
        }
        return $simulator.findInstance(handle);
      })("COUNTER_HANDLE_e5a56560"),
          })
        ;
            const client = new $Closure1Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        , args: {} })).handle(event);
};