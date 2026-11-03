import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';
import FluxPhoto from './components/FluxPhoto';

const certifications = [
  { title: "Cisco Certified Support Technician Networking", year: "2025", image: "/assets/images/cisco-ccst.png", verifyUrl: "https://www.credly.com/badges/bb29fd90-74ef-456e-8f9f-1beb0d0c455f/public_url" },
  { title: "PMI Project Management Ready", year: "2026", image: "/assets/images/pmi-ready.png", verifyUrl: "https://www.credly.com/badges/a239bacb-7a08-4046-9b38-3f65e200de07/public_url" },
  { title: "Information Technology Specialist in Python", year: "2025", image: "/assets/images/it-specialist-python.png", verifyUrl: "https://www.credly.com/badges/70f300f0-ffcc-4d11-9f4f-aa48211fcee0/public_url" },
];

function CertificationBadge({ certificate }: { certificate: (typeof certifications)[number] }) {
  const [imageFailed, setImageFailed] = React.useState(false);
  return (
    <li className="cert-card">
      <div className="cert-image">
        {imageFailed ? <span className="cert-missing">Badge image coming soon</span> :
          <img src={certificate.image.replace('.png', '.jpg')} alt={`${certificate.title} badge`} width="600" height="600" loading="lazy" onError={() => setImageFailed(true)} />}
      </div>
      <h3>{certificate.title}</h3>
      <p className="cert-year">{certificate.year}</p>
      <a className="cert-verify" href={certificate.verifyUrl} target="_blank" rel="noopener noreferrer" aria-label={`Verify ${certificate.title} (opens in a new tab)`}>Verify <LinkArrow /></a>
    </li>
  );
}
function LinkArrow({ up = false }: { up?: boolean }) {
  return <svg className="link-arrow" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
    <path d={up ? "M8 13V3M3 8l5-5 5 5" : "M3 13L13 3M4 3h9v9"} stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>;
}

const projects = [
  {
    name: 'SafeZone PH', category: 'WEB & MOBILE APPLICATION',
    role: 'Frontend Developer, API Integration',
    description: "A web and mobile GIS-based disaster incident reporting and response system with geofencing alerts for Santa Maria, Bulacan MDRRMO",
    image: '/assets/images/safezone-preview.jpg',
    imageAlt: 'SafeZonePH dashboard showing the Santa Maria map, barangay boundaries, and incident reporting controls',
    url: 'https://www.safezoneph.com',
  },
  {
    name: 'Brew-Ha', category: 'WEB APPLICATION',
    role: 'Backend Developer, Database Designer',
    description: 'An E-commerce website designed to serve customers coffee and food.',
    image: '/assets/images/brew-ha.png', imageAlt: 'Brew-Ha coffee and food storefront', url: '',
  },
  {
    name: 'Oppo', category: 'WEB APPLICATION',
    role: 'Database Designer',
    description: 'A SIS-integrated internship recommendation and placement system that connects student information and internship opportunities to recommend suitable placements based on students\' qualifications, specialization, and eligibility.',
    image: '', imageAlt: '', url: '',
  },
];

function ProjectGallery({ project }: { project: (typeof projects)[number] }) {
  const images = project.name === 'Brew-Ha'
    ? ['/assets/images/brew-ha.png', '/assets/images/brew-ha2.png']
    : project.name === 'Oppo'
      ? ['/assets/images/oppo.png', '/assets/images/oppo2.png']
      : ['/assets/images/safezone-preview.jpg', '/assets/images/safezone-2.png', '/assets/images/safezone-3.png'];
  const [index, setIndex] = React.useState(0);
  const dialog = React.useRef<HTMLDialogElement>(null);
  const alt = project.imageAlt || project.name + ' application screenshot';
  function controls() {
    return images.length > 1 && <div className="picture-controls" aria-label={project.name + ' pictures'}>
      <button type="button" className="outline-link" disabled={index === 0} onClick={() => setIndex(value => value - 1)} aria-label={'Previous ' + project.name + ' picture'}>Previous picture</button>
      <span className="project-count" role="status">{index + 1} / {images.length}</span>
      <button type="button" className="outline-link" disabled={index === images.length - 1} onClick={() => setIndex(value => value + 1)} aria-label={'Next ' + project.name + ' picture'}>Next picture</button>
    </div>;
  }
  return <div className="project-art project-preview">
    <button type="button" className="preview-button" onClick={() => dialog.current?.showModal()} aria-label={'View ' + project.name + ' screenshot at full size'}>
      <img src={images[index]} srcSet={project.name === 'SafeZone PH' && index === 0 ? '/assets/images/safezone-small.jpg 600w, /assets/images/safezone-preview.jpg 1200w' : undefined} sizes="(max-width: 600px) 86vw, 50vw" alt={alt + ' (' + (index + 1) + ' of ' + images.length + ')'} width="1200" height="590" loading="lazy" />
      <span className="zoom-label">View full screenshot</span>
    </button>
    {controls()}
    <dialog ref={dialog} className="image-dialog" onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
      <form method="dialog"><button className="outline-link" autoFocus>Close screenshot</button></form>
      <img src={project.name === 'SafeZone PH' && index === 0 ? '/assets/images/safezone-preview.png' : images[index]} alt={alt + ' (' + (index + 1) + ' of ' + images.length + ')'} />
      {controls()}
    </dialog>
  </div>;
}

function ProjectShowcase() {
  return <div className="project-showcase">
    {projects.map((project, index) => <article className="project-feature" key={project.name}>
      <ProjectGallery project={project} />
      <div className="project-copy">
        <span className="project-index">{String(index + 1).padStart(2, '0')}</span>
        <p className="eyebrow">{project.category}</p><h3>{project.name}</h3>
        <p className="project-description">{project.description}</p>
        <details><summary>Project details</summary>
          <dl className="project-details"><dt>The purpose</dt><dd>{index === 0 ? 'Bring location-based incident reporting and response information together for Santa Maria, Bulacan MDRRMO.' : index === 1 ? 'Help customers browse coffee and food through an online storefront.' : 'Connect student records with internship opportunities to support suitable placements.'}</dd>
            <dt>My contribution</dt><dd>{index === 0 ? 'Frontend development and API integration for the web and mobile application.' : index === 1 ? 'Backend development and database design for the e-commerce website.' : 'Database design for a system that considers qualifications, specialization, and eligibility.'}</dd></dl>
        </details>
        {project.url && <a className="outline-link" href={project.url} target="_blank" rel="noopener noreferrer">Visit live site <LinkArrow /></a>}
      </div>
    </article>)}

  </div>;
}

function EmailContact() {
  const [message, setMessage] = React.useState('');
  async function copyEmail() {
    try { await navigator.clipboard.writeText('kirktan.dev@gmail.com'); setMessage('Email copied.'); }
    catch { setMessage('Select and copy kirktan.dev@gmail.com'); }
  }
  return <div className="email-contact"><a href="mailto:kirktan.dev@gmail.com">kirktan.dev@gmail.com</a><button type="button" onClick={copyEmail}>Copy email</button><span role="status">{message}</span></div>;
}

function App() {
  const resumeDialog = React.useRef<HTMLDialogElement>(null);
  return (
    <>
      <main>
        <header className="site-header">
          <a className="wordmark" href="#home">K. Tan<span> / PORTFOLIO</span></a>
          <nav aria-label="Main navigation"><a href="#projects">My Projects</a><a href="#background">About me</a><a href="#contact">Contact</a></nav>
        </header>
        <section id="home" className="profile" aria-labelledby="name">
          <FluxPhoto src="/assets/images/1x1-photo.jpeg" alt="Kirk Griffin F. Tan" />
          <div className="introduction">
            <p className="availability">Available for internships starting December 2026</p><h1 id="name">Hello,<br /><em>I'm Kirk Griffin F. Tan </em></h1>
            <p className="summary">I'm an Information Technology student specializing in web and mobile applications. I build web interfaces and connect them to data, including SafeZone PH, a disaster incident reporting and response project built for Santa Maria, Bulacan MDRRMO.</p><a className="selected-work-link" href="#projects">Explore my projects</a>
            <div className="contact" aria-label="Social profiles and contact">
              <a className="contact-item" href="https://github.com/korkydoobie" target="_blank" rel="noopener noreferrer">GitHub <LinkArrow /></a>
              <a className="contact-item" href="https://www.linkedin.com/in/kirk-griffin-tan-4747b1385/" target="_blank" rel="noopener noreferrer">LinkedIn <LinkArrow /></a>
            </div>
            <EmailContact />
            <div className="resume-actions" aria-label="Resume">
              <button className="outline-link" type="button" onClick={() => resumeDialog.current?.showModal()}>View resume</button>
            </div>
            <dialog className="resume-dialog" ref={resumeDialog} aria-labelledby="resume-title" onClick={event => { if (event.target === event.currentTarget) resumeDialog.current?.close(); }}>
              <div className="resume-dialog-header">
                <h2 id="resume-title">My resume</h2>
                <a className="outline-link" href="/assets/documents/Kirk-Tan-Resume-Main.docx" download="Kirk-Tan-Resume-Main.docx">Download resume <span aria-hidden="true">↓</span></a>
                <form method="dialog"><button className="outline-link" autoFocus>Close resume</button></form>
              </div>
              <iframe src="/assets/documents/resume.html" title="Kirk Griffin F. Tan resume" loading="lazy" />
            </dialog>
          </div>
        </section>
        <section id="projects" className="projects" aria-labelledby="projects-title">
          <div className="section-heading"><div><h2 id="projects-title">My Projects</h2></div></div>
          <ProjectShowcase />
        </section>
        <div className="sections">
          <section aria-labelledby="skills"><span className="section-number">01</span><h2 id="skills">Skills</h2><p>Familiar with</p><ul className="skills-list">
            <li><strong>Frontend:</strong> HTML, CSS, JavaScript, TypeScript</li>
            <li><strong>Mobile:</strong> Kotlin, Swift</li>
            <li><strong>Backend / Data:</strong> Java, PHP, Python, C++, SQL</li>
          </ul></section>
          <section aria-labelledby="background"><span className="section-number">02</span><h2 id="background">Background</h2>
            <p><strong>Education</strong></p>
            <p>FEU Institute of Technology</p><p>Graduation year: 2027</p>
            <p className="education-degree">Bachelor of Science in Information Technology with Specialization in Web and Mobile Applications</p>
          </section>

        </div>
        <section className="certifications" aria-labelledby="certifications-title">
          <span className="section-number">03</span>
          <h2 id="certifications-title">Certifications</h2>
          <ul className="cert-grid">
            {certifications.map((certificate) => <CertificationBadge key={certificate.image} certificate={certificate} />)}
          </ul>
        </section>
        <section id="contact" className="contact-section"><p className="eyebrow">LET'S WORK TOGETHER</p><h2>Let's start a conversation.</h2><a className="outline-link" href="mailto:kirktan.dev@gmail.com">Get in touch <LinkArrow /></a></section>
        <footer><span>Kirk Griffin F. Tan</span><a href="#home">Back to top <LinkArrow up /></a></footer>
      </main>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>);
