type Cred = {
  data: {
    name: string;
    password: string;
    email: string;
  };
};
//@ts-ignore
let host = "http://localhost:";
let port = "8081";

export const registerUser = ({ data }: Cred) => {
  fetch(`${host}${port}/registration`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => {
    if (response.ok && response.redirected) {
      console.log(`Redirect to ${response.redirected}`);
      window.location.href = response.url;
    }
    throw new Error("Network response was not ok.");
  });
};
