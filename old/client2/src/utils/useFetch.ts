import { config } from "../config/config";
export enum Request_status {
  succeed,
  failed,
}
const fetchOnPort = (url: string, method?: string, data?: any) => {
  console.log(`${config.server.url}${url}`);
  return fetch(`${config.server.url}${url}`, {
    method: method ?? "GET",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};

export const fetchData = async <T>(url: string): Promise<T> => {
  const response = await fetchOnPort(url);
  const data = await response.json();
  return data as T;
};

export const postReq = async <T>(
  url: string,
  data: any
): Promise<{ status: Request_status; response?: T }> => {
  return fetchOnPort(url, "POST", data)
    .then((response) => {
      if (response.ok) {
        return {
          status: Request_status.succeed,
          response: data,
        };
      }
      return { status: Request_status.failed, response: undefined };
    })
    .catch((error) => {
      console.log(error);
      return { status: Request_status.failed, response: undefined };
    });
};
// Function to handle DELETE requests
export const deleteReq = async <T>(
  url: string
): Promise<{ status: Request_status; response?: T }> => {
  return fetchOnPort(url, "DELETE")
    .then((response) => {
      if (response.ok) {
        return { status: Request_status.succeed };
      }
      return { status: Request_status.failed, response: undefined };
    })
    .catch((error) => {
      console.log(error);
      return { status: Request_status.failed, response: undefined };
    });
};

// Function to handle PUT requests
export const putReq = async <T>(
  url: string,
  data: any
): Promise<{ status: number; response?: T }> => {
  try {
    const response = await fetchOnPort(url, "PUT", data);
    if (response.ok) {
      try {
        const jsonData = await response.json();
        return {
          status: response.status,
          response: jsonData,
        };
      } catch (e) {
        // In case of successful response but no JSON body
        return { status: response.status };
      }
    } else {
      // Handle non-successful response
      try {
        const errorData = await response.json();
        return {
          status: response.status,
          response: errorData,
        };
      } catch (e) {
        // In case of error response without a JSON body
        return { status: response.status };
      }
    }
  } catch (error) {
    console.log(error);
    return { status: 0, response: undefined }; // 0 or another value to indicate network or fetching error
  }
};
