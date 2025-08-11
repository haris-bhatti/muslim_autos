import React, { useMemo, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Globe, ChevronRight, Menu, Wrench, Calendar, Bike, Search as SearchIcon, Filter, Settings, ShieldCheck, PhoneCall, Info } from 'lucide-react'
import { Button, ButtonLink } from './components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card.jsx'
import { Input } from './components/ui/input.jsx'
import { Badge } from './components/ui/badge.jsx'
import { Modal } from './components/ui/modal.jsx'

const CONTACT = {
  brand: 'Muslim Autos',
  address: 'Boys Degree College Road, Near Waheed Arshad Chowk, Bahawalnagar, Punjab, Pakistan',
  phone: '+92-333-6300769',
  whatsapp: '+92-333-6300769',
  leadEmail: 'harisbhatti69@gmail.com',
}

const DEFAULT_MODELS = [
  { id: 'orbit', name: 'ORBIT', segment: 'electric-scooter', price: 159000, topSpeed: 45, rangeKm: 80, motorW: 1000, battery: '72V 20AH (Hub)', availability: 'Readily Available', img: 'https://okla.com.pk/wp-content/uploads/2025/06/Frame-2085665227.jpg', colors: ['Black','Red'], abs: false },
  { id: 'onyx', name: 'ONYX', segment: 'electric-scooter', price: 179000, topSpeed: 45, rangeKm: 100, motorW: 1200, battery: '72V 32AH (Hub)', availability: 'Readily Available', img: 'https://okla.com.pk/wp-content/uploads/2020/01/Frame-1321315867-1.webp', colors: ['Black','Grey'], abs: false },
  { id: 'okt-econo', name: 'OKT Econo', segment: 'electric-scooter', price: 199000, topSpeed: 45, rangeKm: 80, motorW: 1000, battery: '60V 32AH (Hub)', availability: 'Readily Available', img: 'https://okla.com.pk/wp-content/uploads/2020/01/Frame-1321315867-1.webp', colors: ['White','Blue'], abs: false },
  { id: 'okt', name: 'OKT', segment: 'electric-scooter', price: 239000, topSpeed: 50, rangeKm: 110, motorW: 1000, battery: '72V 38AH (Non-Lithium, Hub)', availability: 'Readily Available', img: 'https://okla.com.pk/wp-content/uploads/2021/03/Frame-1321315859-1.webp', colors: ['Red','Black'], abs: false },
  { id: 'omo', name: 'OMO', segment: 'electric-scooter', price: 339000, topSpeed: 60, rangeKm: 100, motorW: 2000, battery: '72V 38AH (Non-Lithium, Hub)', availability: 'Readily Available', img: 'https://okla.com.pk/wp-content/uploads/2024/06/omo-performace.jpg', colors: ['Black','Grey'], abs: false },
  { id: 'omigo', name: 'OMIGO', segment: 'electric-scooter', price: 399000, topSpeed: 50, rangeKm: 75, motorW: 1500, battery: '74V 28AH (Lithium Ion, Hub)', availability: 'On Booking', img: 'https://okla.com.pk/wp-content/uploads/2020/01/Frame-1321315867-1.webp', colors: ['Blue','White'], abs: false },
  { id: 'okg', name: 'OKG', segment: 'electric-motorcycle', price: null, topSpeed: 80, rangeKm: '60–120', motorW: 4000, battery: '74V 28AH (Dual, Lithium Ion, Mid)', availability: 'On Booking', img: 'https://okla.com.pk/wp-content/uploads/2021/03/Frame-1321315859-1.webp', colors: ['Black','Red'], abs: false },
  { id: 'omax', name: 'OMAX', segment: 'electric-scooter', price: 599000, topSpeed: 85, rangeKm: 80, motorW: 3000, battery: '74V 28AH (Lithium, Side)', availability: 'Readily Available', img: 'https://okla.com.pk/wp-content/uploads/2021/03/Frame-1321315859-1.webp', colors: ['Grey','Black'], abs: false },
  { id: 'ova', name: 'OVA', segment: 'electric-motorcycle', price: 599000, topSpeed: 80, rangeKm: 85, motorW: 3000, battery: '72V 40AH (Lithium Ion, Mid)', availability: 'On Booking', img: 'https://okla.com.pk/wp-content/uploads/2020/01/Frame-1321315867-1.webp', colors: ['Black','Yellow'], abs: false },
  { id: 'ovega', name: 'OVEGA', segment: 'electric-motorcycle', price: null, topSpeed: 120, rangeKm: 215, motorW: 7000, battery: '72V 120AH (Lithium Ion, Mid)', availability: 'On Booking', img: 'https://okla.com.pk/wp-content/uploads/2021/03/Frame-1321315859-1.webp', colors: ['Black'], abs: false },
]

const segments = [
  { key: 'all', label: 'All' },
  { key: 'electric-scooter', label: 'Electric Scooters' },
  { key: 'electric-motorcycle', label: 'Electric Motorcycles' },
]

function useCmsModels(){
  const KEY = 'MA_MODELS_V1'
  const [models, setModels] = useState(DEFAULT_MODELS)
  useEffect(()=>{
    try{
      const saved = localStorage.getItem(KEY)
      if(saved) setModels(JSON.parse(saved))
    }catch{}
  },[])
  function save(newModels){
    setModels(newModels)
    try{ localStorage.setItem(KEY, JSON.stringify(newModels)) }catch{}
  }
  return { models, save }
}

function Header(){
  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-white/70 border-b">
      <div className="container h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="md:hidden" aria-label="Open menu"><Menu /></button>
          <a className="font-bold text-xl tracking-tight" href="#">{CONTACT.brand}</a>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#models" className="hover:opacity-80">Lineup</a>
            <a href="#dealer" className="hover:opacity-80 flex items-center gap-1"><MapPin className="h-4 w-4"/> Visit Us</a>
            <a href="#news" className="hover:opacity-80 flex items-center gap-1"><Calendar className="h-4 w-4"/> News & Events</a>
            <a href="#service" className="hover:opacity-80 flex items-center gap-1"><Wrench className="h-4 w-4"/> Service</a>
          </nav>
        </div>
        <div className="flex items-center gap-2 text-sm text-neutral-600">
          <Globe className="h-4 w-4"/> English
        </div>
      </div>
    </header>
  )
}

function Hero({ onLead }){
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-neutral-100 to-white"/>
      <div className="container py-10 md:py-16 grid md:grid-cols-2 gap-8 items-center">
        <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:0.5}}>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">Electric mobility for Pakistan — simple, reliable, affordable.</h1>
          <p className="mt-4 text-lg text-neutral-600">Lead-gen focused site for {CONTACT.brand}: model lineup, WhatsApp quote + test ride booking, and a lightweight CMS you can edit.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink href="#models">Explore Lineup <ChevronRight className="ml-2 h-4 w-4"/></ButtonLink>
            <Button variant="outline" onClick={onLead}><PhoneCall className="mr-2 h-4 w-4"/>Request a Quote</Button>
          </div>
          <div className="mt-6 flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4"/> 2-year warranty</div>
            <div className="flex items-center gap-2"><Wrench className="h-4 w-4"/> Service network</div>
            <div className="flex items-center gap-2"><Bike className="h-4 w-4"/> Test ride booking</div>
          </div>
        </motion.div>
        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.15, duration:0.6}} className="relative">
          <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
  		<img
  		src="https://okla.com.pk/wp-content/uploads/2024/06/omo-performace.jpg"
  		alt="Hero"
  		className="w-full h-full object-cover"
		/>
          </div>
          <div className="absolute bottom-4 right-4">
            <span className="badge">2025 Lineup</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function Filters({ active, setActive, query, setQuery }){
  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
      <div className="flex flex-wrap gap-2">
        {segments.map(s => (
          <button key={s.key} onClick={()=>setActive(s.key)} className={`badge ${active===s.key?'bg-black text-white border-black':''}`}>{s.label}</button>
        ))}
      </div>
      <div className="flex-1"/>
      <div className="flex items-center gap-2">
        <div className="relative w-[240px]">
          <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400"/>
          <Input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search models..." style={{paddingLeft:28}}/>
        </div>
        <Button variant="outline"><Filter className="mr-2 h-4 w-4"/>Filters</Button>
      </div>
    </div>
  )
}

function Spec({ label, value }){
  return (
    <div className="p-2 rounded-lg bg-neutral-50 border">
      <div className="text-[10px] uppercase tracking-wide text-neutral-500">{label}</div>
      <div className="text-sm font-medium">{value}</div>
    </div>
  )
}

function ModelCard({ m, onRequest }){
  const rangeValue = m.id === 'okg' ? '60–120 km' : `${m.rangeKm} km`
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div className="aspect-[4/3] overflow-hidden">
          <img src={m.img} alt={m.name} className="w-full h-full object-cover"/>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-start justify-between gap-2">
          <div>
            <CardTitle className="text-xl">{m.name}</CardTitle>
            <div className="text-sm text-neutral-500 capitalize">{m.segment.replace('-', ' ')}</div>
          </div>
          <Badge>{m.price ? `from PKR ${m.price.toLocaleString()}` : 'Get a Quote'}</Badge>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
          <Spec label="Top Speed" value={`${m.topSpeed} km/h`} />
          <Spec label="Range" value={rangeValue} />
          <Spec label="Motor" value={`${m.motorW} W`} />
        </div>
        <div className="text-xs text-neutral-500 mt-1">Battery: {m.battery}</div>
        {m.id === 'okg' && (
          <div className="text-[11px] text-neutral-500 mt-1 flex items-center gap-1">
            <Info className="h-3.5 w-3.5"/>
            Shown as 60 km and up to 120 km on the supplier site; actual may vary.
          </div>
        )}
        <div className="mt-4 flex items-center gap-2">
          {m.colors?.map(c => <span key={c} className="text-xs px-2 py-1 rounded-full bg-neutral-100">{c}</span>)}
        </div>
        <div className="mt-4 flex gap-2">
          <ButtonLink href={`#model-${m.id}`}>Details</ButtonLink>
          <Button variant="outline" onClick={()=>onRequest(m)}>Request Quote</Button>
        </div>
      </CardContent>
    </Card>
  )
}

function VisitUs(){
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT.address)}`
  const tel = `tel:${CONTACT.phone.replace(/[^+\d]/g, '')}`
  const wa = `https://wa.me/${CONTACT.whatsapp.replace(/[^\d]/g, '')}`
  return (
    <section id="dealer" className="py-12 md:py-16">
      <div className="container">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Visit Us</h2>
          <div className="flex gap-2">
            <ButtonLink href={mapsUrl} variant="outline" target="_blank" rel="noreferrer">Get Directions</ButtonLink>
            <ButtonLink href={wa} target="_blank" rel="noreferrer">WhatsApp</ButtonLink>
          </div>
        </div>
        <div className="mt-4 grid md:grid-cols-2 gap-4">
          <div className="aspect-video rounded-2xl border bg-neutral-100 flex items-center justify-center p-4 text-center">
            <div>
              <div className="font-medium">{CONTACT.brand} — Bahawalnagar</div>
              <div className="text-neutral-500 mt-1">{CONTACT.address}</div>
              <div className="mt-3 flex gap-2 justify-center">
                <ButtonLink href={tel} variant="outline">Call {CONTACT.phone}</ButtonLink>
                <ButtonLink href={wa} target="_blank" rel="noreferrer">Chat on WhatsApp</ButtonLink>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <Card>
              <CardContent>
                <div className="font-medium">Showroom Hours</div>
                <div className="text-neutral-500">Mon–Sat • 10:00–19:00 (Sun by appointment)</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <div className="font-medium">Test Rides</div>
                <div className="text-neutral-500">Book a slot and we’ll confirm on WhatsApp.</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

function News(){
  const NEWS = [
    { id: 1, title: 'EV awareness drive in Bahawalnagar', date: '2025-08-01', img: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200' },
    { id: 2, title: 'New financing partner announced', date: '2025-07-20', img: 'https://images.unsplash.com/photo-1465447142348-e9952c393450?w=1200' },
    { id: 3, title: 'Free checkup camp — this month', date: '2025-06-15', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200' },
  ]
  return (
    <section id="news" className="py-12 md:py-16 bg-neutral-50 border-t">
      <div className="container">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">News & Events</h2>
          <button className="text-sm underline">View all</button>
        </div>
        <div className="mt-6 grid md:grid-cols-3 gap-6">
          {NEWS.map(n => (
            <Card key={n.id}>
              <CardHeader>
                <div className="aspect-video overflow-hidden">
                  <img src={n.img} alt={n.title} className="w-full h-full object-cover"/>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-neutral-500">{new Date(n.date).toLocaleDateString()}</div>
                <CardTitle className="mt-1">{n.title}</CardTitle>
                <button className="underline text-sm mt-2">Read more →</button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

function Footer(){
  return (
    <footer className="border-t py-10 text-sm">
      <div className="container grid md:grid-cols-4 gap-8">
        <div>
          <div className="font-bold text-lg">{CONTACT.brand}</div>
          <p className="text-neutral-500 mt-2">Premium EVs for daily riders in Pakistan.</p>
        </div>
        <div>
          <div className="font-semibold mb-2">Company</div>
          <ul className="space-y-2 text-neutral-500">
            <li>About</li>
            <li>Careers</li>
            <li>Investors</li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-2">Support</div>
          <ul className="space-y-2 text-neutral-500">
            <li>Warranty</li>
            <li>Owner manuals</li>
            <li>Contact</li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-2">Visit</div>
          <ul className="space-y-2 text-neutral-500">
            <li>{CONTACT.address}</li>
            <li>{CONTACT.phone}</li>
          </ul>
        </div>
      </div>
      <div className="container mt-8 text-neutral-500">© {new Date().getFullYear()} {CONTACT.brand}. All rights reserved.</div>
    </footer>
  )
}

export default function App(){
  const { models, save } = useCmsModels()
  const [active, setActive] = useState('all')
  const [query, setQuery] = useState('')
  const [leadOpen, setLeadOpen] = useState(false)
  const [leadModel, setLeadModel] = useState(null)
  const [cmsOpen, setCmsOpen] = useState(false)

  const filtered = useMemo(()=>{
    return models.filter(m => (active==='all' || m.segment===active) && m.name.toLowerCase().includes(query.toLowerCase()))
  }, [active, query, models])

  function onRequest(m){ setLeadModel(m || null); setLeadOpen(true) }

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <Header/>
      <Hero onLead={()=>onRequest(null)}/>

      <section id="models" className="py-12 md:py-16">
        <div className="container">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Model Lineup</h2>
            <div className="text-sm text-neutral-600 flex items-center gap-2"><Settings className="h-4 w-4"/>Request a Quote</div>
          </div>
          <div className="mt-6">
            <Filters active={active} setActive={setActive} query={query} setQuery={setQuery}/>
          </div>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(m => (
              <div key={m.id} className="relative">
                <ModelCard m={m} onRequest={()=>onRequest(m)} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <VisitUs/>
      <News/>

      <section id="service" className="py-12 md:py-16 bg-neutral-50 border-t">
        <div className="container grid md:grid-cols-3 gap-6 items-center">
          <div className="md:col-span-2">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Genuine parts & service</h2>
            <p className="text-neutral-600 mt-2">Keep your machine at peak performance with certified technicians, OEM parts, and transparent pricing.</p>
            <div className="mt-4 flex gap-2">
              <Button onClick={()=>onRequest(null)}>Book Test Ride</Button>
              <Button variant="outline">Contact Sales</Button>
            </div>
          </div>
          <div className="aspect-[4/3] rounded-2xl border bg-neutral-100"/>
        </div>
      </section>

      <Modal open={leadOpen} onClose={()=>setLeadOpen(false)} title={leadModel ? `Request a Quote — ${leadModel.name}` : 'Request a Quote / Book Test Ride'}>
        <form onSubmit={(e)=>{
          e.preventDefault()
          const fd = new FormData(e.currentTarget)
          const name = fd.get('name')
          const phone = fd.get('phone')
          const city = fd.get('city')
          const type = fd.get('type') || 'Quote'
          const model = fd.get('model') || (leadModel?.name || 'Any')
          const msg = `Assalam o Alaikum!\nName: ${name}\nPhone: ${phone}\nCity: ${city}\nI want: ${type}\nModel: ${model}`
          const wa = `https://wa.me/${CONTACT.whatsapp.replace(/[^\d]/g, '')}?text=${encodeURIComponent(msg)}`
          window.open(wa, '_blank')
          if(CONTACT.leadEmail){
            const mail = `mailto:${CONTACT.leadEmail}?subject=${encodeURIComponent('Lead from Muslim Autos')}&body=${encodeURIComponent(msg)}`
            window.open(mail)
          }
          e.currentTarget.reset()
          setLeadOpen(false)
        }} className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <div className="text-xs mb-1">Full Name</div>
              <Input name="name" required placeholder="Your name"/>
            </div>
            <div>
              <div className="text-xs mb-1">Phone / WhatsApp</div>
              <Input name="phone" required placeholder="03xx-xxxxxxx"/>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <div className="text-xs mb-1">City</div>
              <Input name="city" required placeholder="Bahawalnagar"/>
            </div>
            <div>
              <div className="text-xs mb-1">I want</div>
              <select name="type" className="input">
                <option value="Quote">Quote</option>
                <option value="Test Ride">Test Ride</option>
                <option value="Call Back">Call Back</option>
              </select>
            </div>
          </div>
          <div>
            <div className="text-xs mb-1">Model</div>
            <Input name="model" placeholder={leadModel?.name || 'Select a model'} defaultValue={leadModel?.name || ''}/>
          </div>
          <div className="pt-2 flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={()=>setLeadOpen(false)}>Cancel</Button>
            <Button type="submit">Send via WhatsApp</Button>
          </div>
        </form>
      </Modal>

      <Modal open={cmsOpen} onClose={()=>setCmsOpen(false)} title="Simple CMS — Models (local only)">
        <CmsEditor models={models} onSave={save}/>
      </Modal>

      <Footer/>

      {typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('admin') === '1' && (
        <button onClick={()=>setCmsOpen(true)} className="fixed bottom-5 right-5 rounded-full shadow-lg btn btn-primary" title="Open CMS">CMS</button>
      )}
    </div>
  )
}

function CmsEditor({ models, onSave }){
  const [text, setText] = React.useState(JSON.stringify(models, null, 2))
  return (
    <div>
      <p className="text-sm text-neutral-500 mb-2">Edit the JSON below to add/update models. Changes save to your browser only (localStorage). We can swap this to Sanity/Strapi later.</p>
      <textarea className="w-full h-72 p-3 border rounded-md font-mono text-sm" value={text} onChange={e=>setText(e.target.value)} />
      <div className="mt-3 flex justify-end gap-2">
        <button className="btn btn-outline" onClick={()=>setText(JSON.stringify(DEFAULT_MODELS, null, 2))}>Reset</button>
        <button className="btn btn-primary" onClick={()=>{ try { const parsed = JSON.parse(text); onSave(parsed); } catch { alert('Invalid JSON'); } }}>Save</button>
      </div>
    </div>
  )
}
