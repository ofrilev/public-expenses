type IcheckCred = {
  data: {
    password: string;
    email: string;
  };
};

//@ts-ignore
const hashPassword = async (password: string) => {
  // Encode the password as a Uint8Array
  const encoder = new TextEncoder();
  const data = encoder.encode(password);

  // Hash the password using SHA-256
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);

  // Convert the buffer to a hex string
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return hashHex;
};
// let host = process.env.HOST_ADDRESS;
// let port = process.env.PORT_NUM;
let host = "http://localhost:";
let port = "8081";

export const checkCred = ({ data }: IcheckCred) => {
  //@ts-ignore
  //   hashPassword(data.password).then((res) => (data.password = res));
  fetch(`${host}${port}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      // if (response.ok) {
      //   return response.text();
      // }
      if (response.redirected) {
        console.log(`Redirect to ${response.redirected}`);
        window.location.href = response.url;
      }
      throw new Error("Network response was not ok.");
    })
    .then((text) => {
      console.log(text);
    });
};
