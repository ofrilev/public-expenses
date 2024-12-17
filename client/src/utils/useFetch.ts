import { config } from "../../config/config";
export enum Request_status {
  succeed,
  failed,
  cache,
}

interface Pagination {
  total_items: number;
  total_pages: number;
  current_page: number;
  page_size: number;
}


const fetchOnPort = ({url, method, data, accessToken}:{url: string, method?: string, data?: any, accessToken?:string }) => {
  console.log(document.cookie)
  let accessTokenObj = accessToken ? {"Authorization": `Bearer ${accessToken}`} : undefined
  return fetch(`${config.server.url}${url}`, {
    method: method ?? "GET",
    credentials: "include",
    headers: { "Content-Type": "application/json", ...accessTokenObj },
    body: JSON.stringify(data),
  });
};
export class FetchRequest<T> {
  response : {
    status: Request_status,
    pagination: Pagination,
    data: T,
  }
  private accessToken : string
  constructor(private url:string, defaultData: T) {
    this.accessToken = localStorage.getItem("accessToken") ?? ""
    this.response = {
      status: 1,
      pagination: {
        total_items: 0,
        total_pages: 0,
        current_page: 0,
        page_size: 0
      },
      data: defaultData
    }       
  }
   // Fetch function that performs the request
   async fetchData(): Promise<void> {
    try {
      const res = await fetchOnPort({url:this.url, accessToken: this.accessToken});
      if (res.ok) {
          const { pagination , ...dataContent} = await res.json();
          const [values] = Object.values(dataContent)
          this.response.status = Request_status.succeed
          this.response.pagination= pagination || this.response.pagination,
          this.response.data =  values as T
      }else{
        this.response.status = Request_status.failed
      }
    } catch (error) {
      this.response.status = Request_status.failed
    }
  }
  async fetchWithCach(key: string): Promise<void>{
    let stringData = localStorage.getItem(key)
    const localStorageData = stringData && JSON.parse(stringData)
    if (localStorageData){
      this.response.status = Request_status.cache
      this.response.data =  localStorageData as T
    }else{
      await this.fetchData()
      if (this.response.status === Request_status.succeed && this.response.data) {
        const dataToCache = Array.isArray(this.response.data) 
          ? this.response.data 
          : Object.values(this.response.data)[0];
        localStorage.setItem(key, JSON.stringify(dataToCache));
      }
    }

  }
}
export const postReq = async <T>(
  url: string,
  data: any
): Promise<{ status: Request_status; response?: T }> => {
  try{
    const res = await fetchOnPort({url,method: "POST", data})  
    if (res.ok) {
      return {
        status: Request_status.succeed,
        response: data,
      };
    }else{
      return { status: Request_status.failed, response: undefined };
    }
  }
  catch(error){
    console.log(error);
    return { status: Request_status.failed, response: undefined };
  }
};
// Function to handle DELETE requests
export const deleteReq = async <T>(
  url: string
): Promise<{ status: Request_status; response?: T }> => {
  try{
  const res = await fetchOnPort({url, method:"DELETE"})
    if (res.ok) {
      return { status: Request_status.succeed };
    }
    return { status: Request_status.failed, response: undefined };
  }catch(error){
    console.log(error);
      return { status: Request_status.failed, response: undefined };
  }
};

// Function to handle PUT requests
export const putReq = async <T>(
  url: string,
  data: any
): Promise<{ status: number; response?: T }> => {
  try {
    const response = await fetchOnPort({url, method:"PUT", data});
    if (response.ok) {
        const jsonData = await response.json();
        return {
          status: response.status,
          response: jsonData,
        };
      }else {
        const errorData = await response.json();
        return {
          status: response.status,
          response: errorData,
        };
    }
  } catch (error) {
    console.log(error);
    return { status: Request_status.failed, response: undefined }; 
  }
};
