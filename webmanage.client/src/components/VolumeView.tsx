import { apiSetVolume } from '../service/api'
import type { Volume } from '../types/Volume';

interface VolumeProps {
  volumes: Volume[];
}


export const VolumeView : React.FC<VolumeProps> = ({ volumes }) => {

  const handleSliderMouseUp = (event: React.MouseEvent<HTMLInputElement>) => {
    console.log(event.currentTarget.dataset)
    const ID:number = Number(event.currentTarget.dataset.appid!)
    const volume:number = Number(event.currentTarget.value)
    apiSetVolume(ID, volume)
};

      return (
        <>                    
        {volumes.map((volume) => ( 
          <div>
            <p>{volume.name}</p>
            <input data-appID={volume.id} onMouseUp={handleSliderMouseUp} type="range" min="1" max="100" defaultValue="50" className="slider" id="myRange"></input>
          </div>
        ))}
      </>
    );
}

  export default VolumeView