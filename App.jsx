import { useEffect, useState } from 'react'
import { site, images } from './config'

const bg = (f) => (f ? { backgroundImage: `linear-gradient(rgba(8,10,10,.55),rgba(8,10,10,.8)),url(${import.meta.env.BASE_URL}images/${f})` } : undefined)
const links = [['home','Home'],['experience','The Experience'],['amenities','Amenities'],['prices','Affordable Prices'],['visit','Visit Us'],['contact','Contact']]
const ext = { target: '_blank', rel: 'noopener noreferrer' }

function useClock() {
  const [t, setT] = useState(new Date())
  useEffect(() => { const i = setInterval(() => setT(new Date()), 1000); return () => clearInterval(i) }, [])
  return t.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
}
function Copy({ text, label }) {
  const [ok, setOk] = useState(false)
  const go = async () => {
    try { await navigator.clipboard.writeText(text) } catch {
      const a = document.createElement('textarea'); a.value = text; document.body.appendChild(a); a.select(); document.execCommand('copy'); a.remove()
    }
    setOk(true); setTimeout(() => setOk(false), 1800)
  }
  return <button className="btn ghost" onClick={go} aria-live="polite">{ok ? 'Copied ✓' : label}</button>
}
function Reveal({ children, className = '' }) {
  const [on, setOn] = useState(false)
  const [ref, setRef] = useState(null)
  useEffect(() => {
    if (!ref) return
    if (!('IntersectionObserver' in window)) { setOn(true); return }
    const o = new IntersectionObserver(([e]) => e.isIntersecting && (setOn(true), o.disconnect()), { threshold: 0.15 })
    o.observe(ref); return () => o.disconnect()
  }, [ref])
  return <div ref={setRef} className={`${className} reveal ${on ? 'in' : ''}`}>{children}</div>
}
const Call = ({ children, cls = 'btn primary' }) => <a className={cls} href={site.phoneHref}>{children}</a>

export default function App() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const time = useClock()
  useEffect(() => { const f = () => setScrolled(window.scrollY > 40); f(); window.addEventListener('scroll', f, { passive: true }); return () => window.removeEventListener('scroll', f) }, [])

  return (<>
    <header className={`nav ${scrolled ? 'solid' : ''}`}>
      <a href="#home" className="logo"><b>RION</b><small>SNOOKER LOUNGE</small></a>
      <button className="burger" aria-expanded={open} aria-controls="menu" aria-label="Menu" onClick={() => setOpen(!open)}>{open ? '✕' : '☰'}</button>
      <nav id="menu" className={open ? 'open' : ''}>
        {links.map(([id, l]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{l}</a>)}
        <Call cls="btn primary sm">CALL NOW</Call>
      </nav>
    </header>
    <main>
      <section id="home" className="hero baize" style={bg(images.hero)}>
        <div className="wrap">
          <span className="badge">OPEN 24 HOURS · EVERY DAY</span>
          <h1>YOUR GAME. YOUR TABLE. YOUR NIGHT.</h1>
          <p className="lead">Step into Rion Snooker Lounge — your place for great games, friendly service, and late-night snooker sessions in Bahria Town, Lahore.</p>
          <p className="gold">PREMIUM VIBES. REASONABLE PRICES.</p>
          <div className="row"><Call>CALL TO PLAY</Call><a className="btn outline" href={site.mapsUrl} {...ext}>FIND OUR LOCATION</a><a className="btn ghost" href={site.whatsappUrl} {...ext}>WhatsApp</a></div>
          <p className="trust">★ {site.rating}/5 GOOGLE RATING · {site.reviews} REVIEWS</p>
        </div>
      </section>

      <section id="experience" className="sec" style={bg(images.experience)}><div className="wrap">
        <h2>MORE THAN A GAME. IT'S YOUR TIME.</h2>
        <p className="lead">Rack them up, line up your next shot, and enjoy the game at your own pace. Whether you're stopping by for a quick match or enjoying a late-night session, Rion Snooker Lounge is ready to welcome you.</p>
        <div className="grid g3">{[['THE GAME','A place to challenge your friends, sharpen your shots, and enjoy the game you love.'],['YOUR CREW','Bring your friends together for a competitive match or a relaxed gaming session.'],['ANY HOUR',"With the lounge open 24 hours a day, 7 days a week, your next game doesn't have to wait until tomorrow."]].map(([t, d]) => <Reveal key={t} className="card"><h3>{t}</h3><p>{d}</p></Reveal>)}</div>
      </div></section>

      <section id="amenities" className="sec alt"><div className="wrap">
        <h2>EVERYTHING YOU NEED FOR A GREAT GAME.</h2>
        <p className="lead">Great games, good company, refreshments, and a welcoming atmosphere. At Rion Snooker Lounge, we've got the essentials covered so you can focus on enjoying your time at the table.</p>
        <div className="grid g4">{[['🎱','SNOOKER EXPERIENCE','A place to challenge your friends, sharpen your skills, and enjoy the game you love.'],['🥤','SNACKS & REFRESHMENTS','Feeling hungry between frames? Grab some snacks and keep your game going.'],['🚻','RESTROOM AVAILABLE','Restroom facilities are available on-site for your convenience.'],['🤝','PROFESSIONAL & FRIENDLY STAFF','Our professional, friendly team is here to welcome you and help make your visit enjoyable.']].map(([i, t, d]) => <Reveal key={t} className="card"><span className="ico" aria-hidden="true">{i}</span><h3>{t}</h3><p>{d}</p></Reveal>)}</div>
      </div></section>

      <section id="prices" className="sec baize" style={bg(images.pricing)}><div className="wrap center">
        <h2>BIG GAMES. REASONABLE PRICES.</h2>
        <p className="lead">Enjoy the game you love without the hefty price tag. Rion Snooker Lounge keeps things affordable, so you can spend more time playing and enjoying the company of your friends.</p>
        <p className="gold big">PREMIUM VIBES. BUDGET-FRIENDLY PLAY.</p>
        {site.priceNote && <p className="lead">{site.priceNote}</p>}
        <Call>CALL TO ASK ABOUT PLAYING</Call>
      </div></section>

      <section className="sec"><div className="wrap center">
        <h2>THE TABLE DOESN'T WATCH THE CLOCK.</h2>
        <p className="lead">Early game, late-night match, or a session with friends whenever the mood strikes — Rion Snooker Lounge is open around the clock.</p>
        <div className="clock" role="timer" aria-label="Your local time"><span>{time}</span></div>
        <p className="gold">OPEN 24 HOURS · 7 DAYS A WEEK</p>
        <p className="note">Clock shows your device's local time only. It is not a live availability indicator.</p>
      </div></section>

      <section id="visit" className="sec alt"><div className="wrap center">
        <div className="stars" aria-hidden="true">★★★★★</div>
        <p className="score">{site.rating} / 5</p>
        <p className="gold">{site.reviews} GOOGLE REVIEWS</p>
        <h2>YOUR NEXT GREAT GAME STARTS HERE.</h2>
        <a className="btn outline" href={site.mapsUrl} {...ext}>SEE US ON GOOGLE MAPS</a>
      </div></section>

      <section id="contact" className="sec" style={bg(images.contact)}><div className="wrap">
        <h2>YOUR NEXT GAME STARTS HERE.</h2>
        <p className="lead">Ready to play? Get in touch with Rion Snooker Lounge, ask about your next session, and find your way to us in Bahria Town, Lahore.</p>
        <div className="grid g2">
          <div className="card"><h3>RION SNOOKER LOUNGE</h3><p>{site.address}</p>
            <h4>PHONE</h4><p><a href={site.phoneHref}>{site.phone}</a></p>
            <h4>OPENING HOURS</h4><p>{site.hours}.</p>
            <h4>AMENITIES</h4><p>Snacks available · Restroom on-site · Professional and friendly staff.</p></div>
          <div className="card actions"><Call>CALL NOW</Call>
            <a className="btn ghost" href={site.whatsappUrl} {...ext}>WhatsApp us</a>
            <a className="btn outline" href={site.mapsUrl} {...ext}>Open Google Maps / Directions</a>
            <Copy text={site.phone} label="Copy phone number" /><Copy text={site.address} label="Copy address" /></div>
        </div>
      </div></section>
    </main>
    <footer><p>© {new Date().getFullYear()} {site.name} · {site.address}</p></footer>
    <a className="fab" href={site.phoneHref} aria-label="Call Rion Snooker Lounge">📞 CALL</a>
  </>)
}
