import { useProfile } from '../context/ProfileContext.jsx';
import './Bridge.css';

export default function Bridge() {
  const { profile } = useProfile();

  return (
    <section className="bridge section">
      <div className="container bridge__grid">
        <div className="bridge__heading-col">
          <p className="eyebrow">{profile.bridgeEyebrow}</p>
          <h2 className="section-heading bridge__title">{profile.bridgeTitle}</h2>
        </div>

        <div className="bridge__body">
          <p>{profile.bridgeBody1}</p>
          <p>{profile.bridgeBody2}</p>
        </div>
      </div>
    </section>
  );
}
