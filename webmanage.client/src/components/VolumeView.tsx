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
        <div className="volume-list">
        {volumes.map((volume) => (
          <div className="volume-item" key={volume.id}>
            <div className="volume-label">
              <span className="volume-icon">&#9835;</span>
              <span className="volume-name">{volume.name}</span>
              <span className="code">#{volume.id}</span>
            </div>
            <div className="slidecontainer">
              <input data-appID={volume.id} onMouseUp={handleSliderMouseUp} type="range" min="1" max="100" defaultValue="50" className="slider" id="myRange"></input>
            </div>
          </div>
        ))}
        {volumes.length === 0 && <p className="empty-row">no audio sessions detected<span className="cursor">&#9608;</span></p>}
      </div>
    );
}

  export default VolumeView
