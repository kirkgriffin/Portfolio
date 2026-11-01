import FluxLines from './FluxLines/FluxLines';
import './FluxPhoto.css';

export default function FluxPhoto({ src, alt }: { src: string; alt: string }) {
  return <div className="portrait flux-photo">
    <img className="profile-photo" src={src} alt={alt} width="320" height="320" />
    <div className="flux-photo-overlay" aria-hidden="true">
      <FluxLines colors={['#ffffff']} transparent opacity={0.55} speed={0.35} scale={1.8} glow={1.4} lineWidth={0.7} rimWidth={0.15} shimmer={1.2} mouseInteraction mouseStrength={1.3} mouseRadius={0.35} clickSwirl intro={false} dpr={1} respectReducedMotion={true} />
    </div>
  </div>;
}
