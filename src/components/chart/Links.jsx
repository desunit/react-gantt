import { useContext } from 'react';
import storeContext from '../../context';
import { useStore } from '@svar-ui/lib-react';
import './Links.css';

export default function Links() {
  const api = useContext(storeContext);
  const links = useStore(api,"_links");

  return (
    <svg className="wx-dkx3NwEn wx-links">
      {(links || []).map((link) => (
        <polyline
          className="wx-dkx3NwEn wx-line"
          points={link.$p}
          key={link.id}
        />
      ))}
    </svg>
  );
}
