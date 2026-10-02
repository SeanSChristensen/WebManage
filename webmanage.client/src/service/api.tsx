

export const apiFetcher = async (url: string) => {
   await fetch(url);
}

export const apiFetchTasks = async() => {
   const response = await fetch('http://localhost:5222/getwindowedprocesses');
     if (response.ok) {
       const data = await response.json();
       return data;
     }
   }