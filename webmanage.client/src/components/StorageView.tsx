import type { storageDrive } from '../types/storageDrive';

interface StorageProps {
  drives: storageDrive[];
}


export const StorageView : React.FC<StorageProps> = ({ drives }) => {
      return (
        <div className="drive-list">
        {drives.map((drive) => {
          const total = parseFloat(drive.total);
          const free = parseFloat(drive.free);
          const usedPercent = total > 0 ? Math.round(((total - free) / total) * 100) : 0;
          return (
            <div className="drive-item" key={drive.name}>
              <div className="drive-header">
                <h3 className="drive-name">&#9673; {drive.name}</h3>
                <span className="drive-percent">{usedPercent}% used</span>
              </div>
              <div className="meter"><div className="meter-fill" style={{ width: `${usedPercent}%` }}></div></div>
              <div className="drive-stats">
                <p><span className="label">TOTAL</span> {drive.total}</p>
                <p><span className="label">FREE</span> {drive.free}</p>
              </div>
            </div>
          );
        })}
        {drives.length === 0 && <p className="empty-row">mounting drives<span className="cursor">&#9608;</span></p>}
      </div>
    );
}

  export default StorageView
