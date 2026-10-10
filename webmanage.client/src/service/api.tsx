

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

export const apiSetVolume = async(Id: number, volume: number) => {
   const response = await fetch('http://localhost:5222/sounds/' + Id + '/' + volume);
     if (response.ok) {
       return;
     }
   }

   export const apiFetchVolumes = async() => {
   const response = await fetch('http://localhost:5222/sounds');
     if (response.ok) {
       const data = await response.json();
       return data;
     }
   }