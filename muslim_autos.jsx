import React, { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Globe, ChevronRight, Menu, Play, Wrench, Calendar, Bike, Search, Filter, Settings, ShieldCheck, PhoneCall, Database, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

/**
 * Muslim Autos — Lead‑Gen Website (Benelli‑style)
 * Notes:
 * - OKG now shows Range "60–120 km" with a small clarification note.
 * - Lead form: opens WhatsApp to +92-333-6300769 and mailto to harisbhatti69@gmail.com.
 */

// --- Contact / Branch info ---
const CONTACT = {
  brand: "Muslim Autos",
  address: "Boys Degree College Road, Near Waheed Arshad Chowk, Bahawalnagar, Punjab, Pakistan",
  phone: "+92-333-6300769",
  whatsapp: "+92-333-6300769",
  leadEmail: "harisbhatti69@gmail.com", // optional mailto fallback
};

// --- Seed lineup (editable via Simple CMS). Image URLs taken from OKLA site where possible. ---
const DEFAULT_MODELS = [
  { id: "orbit", name: "ORBIT", segment: "electric-scooter", price: 159000, topSpeed: 45, rangeKm: 80, motorW: 1000, battery: "72V 20AH (Hub)", availability: "Readily Available", img: "https://okla.com.pk/wp-content/uploads/2025/06/Frame-2085665227.jpg", colors: ["Black", "Red"], abs: false },
  { id: "onyx", name: "ONYX", segment: "electric-scooter", price: 179000, topSpeed: 45, rangeKm: 100, motorW: 1200, battery: "72V 32AH (Hub)", availability: "Readily Available", img: "https://okla.com.pk/wp-content/uploads/2020/01/Frame-1321315867-1.webp", colors: ["Black", "Grey"], abs: false },
  { id: "okt-econo", name: "OKT Econo", segment: "electric-scooter", price: 199000, topSpeed: 45, rangeKm: 80, motorW: 1000, battery: "60V 32AH (Hub)", availability: "Readily Available", img: "https://okla.com.pk/wp-content/uploads/2020/01/Frame-1321315867-1.webp", colors: ["White", "Blue"], abs: false },
  { id: "okt", name: "OKT", segment: "electric-scooter", price: 239000, topSpeed: 50, rangeKm: 110, motorW: 1000, battery: "72V 38AH (Non-Lithium, Hub)", availability: "Readily Available", img: "https://okla.com.pk/wp-content/uploads/2021/03/Frame-1321315859-1.webp", colors: ["Red", "Black"], abs: false },
  { id: "omo", name: "OMO", segment: "electric-scooter", price: 339000, topSpeed: 60, rangeKm: 100, motorW: 2000, battery: "72V 38AH (Non-Lithium, Hub)", availability: "Readily Available", img: "https://okla.com.pk/wp-content/uploads/2024/06/omo-performace.jpg", colors: ["Black", "Grey"], abs: false },
  { id: "omigo", name: "OMIGO", segment: "electric-scooter", price: 399000, topSpeed: 50, rangeKm: 75, motorW: 1500, battery: "74V 28AH (Lithium Ion, Hub)", availability: "On Booking", img: "https://okla.com.pk/wp-content/uploads/2020/01/Frame-1321315867-1.webp", colors: ["Blue", "White"], abs: false },
  // OKG range shows conflicting values on OKLA; we display 60–120 km with a note.
  { id: "okg", name: "OKG", segment: "electric-motorcycle", price: null, topSpeed: 80, rangeKm: "60–120", motorW: 4000, battery: "74V 28AH (Dual, Lithium Ion, Mid)", availability: "On Booking", img: "https://okla.com.pk/wp-content/uploads/2021/03/Frame-1321315859-1.webp", colors: ["Black", "Red"], abs: false },
  { id: "omax", name: "OMAX", segment: "electric-scooter", price: 599000, topSpeed: 85, rangeKm: 80, motorW: 3000, battery: "74V 28AH (Lithium, Side)", availability: "Readily Available", img: "https://okla.com.pk/wp-content/uploads/2021/03/Frame-1321315859-1.webp", colors: ["Grey", "Black"], abs: false },
  { id: "ova", name: "OVA", segment: "electric-motorcycle", price: 599000, topSpeed: 80, rangeKm: 85, motorW: 3000, battery: "72V 40AH (Lithium Ion, Mid)", availability: "On Booking", img: "https://okla.com.pk/wp-content/uploads/2020/01/Frame-1321315867-1.webp", colors: ["Black", "Yellow"], abs: false },
  { id: "ovega", name: "OVEGA", segment: "electric-motorcycle", price: null, topSpeed: 120, rangeKm: 215, motorW: 7000, battery: "72V 120AH (Lithium Ion, Mid)", availability: "On Booking", img: "https://okla.com.pk/wp-content/uploads/2021/03/Frame-1321315859-1.webp", colors: ["Black"], abs: false },
];

const segments = [
  { key: "all", label: "All" },
  { key: "electric-scooter", label: "Electric Scooters" },
  { key: "electric-motorcycle", label: "Electric Motorcycles" },
];

function useCmsModels() {
  const KEY = "MA_MODELS_V1";
  const [models, setModels] = useState(DEFAULT_MODELS);
  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY);
      if (saved) setModels(JSON.parse(saved));
    } catch {}
  }, []);
  function save(newModels) {
    setModels(newModels);
    try { localStorage.setItem(KEY, JSON.stringify(newModels)); } catch {}
  }
  return { models, save };
}

function Header({ onOpenMenu }) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-white/70 dark:bg-neutral-900/70 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="flex items-center gap-3">
          <button className="md:hidden" onClick={onOpenMenu} aria-label="Open menu">
            <Menu />
          </button>
          <a className="font-bold text-xl tracking-tight" href="#">{CONTACT.brand}</a>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#models" className="hover:text-primary">Lineup</a>
            <a href="#dealer" className="hover:text-primary flex items-center gap-1"><MapPin className="h-4 w-4"/> Visit Us</a>
            <a href="#news" className="hover:text-primary flex items-center gap-1"><Calendar className="h-4 w-4"/> News & Events</a>
            <a href="#service" className="hover:text-primary flex items-center gap-1"><Wrench className="h-4 w-4"/> Service</a>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="en">
            <SelectTrigger className="w-[110px]"><Globe className="mr-2 h-4 w-4"/><SelectValue/></SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="ur">Urdu</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </header>
  );
}

function Hero({ onLead }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-neutral-100 to-white dark:from-neutral-950 dark:to-neutral-900"/>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 grid md:grid-cols-2 gap-8 items-center">
        <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:0.5}}>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">Electric mobility for Pakistan — simple, reliable, affordable.</h1>
          <p className="mt-4 text-lg text-muted-foreground">Lead‑gen focused site for {CONTACT.brand}: model lineup, WhatsApp quote + test ride booking, and a lightweight CMS so you can edit models yourself.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#models"><Button size="lg">Explore Lineup <ChevronRight className="ml-2 h-4 w-4"/></Button></a>
            <Button size="lg" variant="outline" onClick={onLead}><PhoneCall className="mr-2 h-4 w-4"/>Request a Quote</Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" variant="ghost"><Play className="mr-2 h-4 w-4"/>Watch Trailer</Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle>Brand Film</DialogTitle>
                </DialogHeader>
                <div className="aspect-video w-full bg-black rounded-xl flex items-center justify-center text-white">Embed video here</div>
              </DialogContent>
            </Dialog>
          </div>
          <div className="mt-6 flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4"/> 2-year warranty</div>
            <div className="flex items-center gap-2"><Wrench className="h-4 w-4"/> Service network</div>
            <div className="flex items-center gap-2"><Bike className="h-4 w-4"/> Test ride booking</div>
          </div>
        </motion.div>
        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.15, duration:0.6}} className="relative">
          <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
            <img src="https://images.unsplash.com/photo-1502876778430-88b5434b23aa?w=1600" alt="Hero" className="w-full h-full object-cover"/>
          </div>
          <div className="absolute bottom-4 right-4">
            <Badge variant="secondary">2025 Lineup</Badge>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Filters({ active, setActive, query, setQuery }) {
  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
      <Tabs value={active} onValueChange={setActive} className="w-full md:w-auto">
        <TabsList className="flex flex-wrap">
          {segments.map(s => (
            <TabsTrigger key={s.key} value={s.key}>{s.label}</TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <div className="flex-1"/>
      <div className="flex items-center gap-2">
        <div className="relative w-[240px]">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
          <Input value={query} onChange={e=>setQuery(e.target.value)} className="pl-8" placeholder="Search models..."/>
        </div>
        <Button variant="outline"><Filter className="mr-2 h-4 w-4"/>Filters</Button>
      </div>
    </div>
  );
}

function ModelCard({ m, onRequest }) {
  const rangeValue = m.id === 'okg' ? '60–120 km' : `${m.rangeKm} km`;
  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-shadow">
      <CardHeader className="p-0">
        <div className="aspect-[4/3] overflow-hidden">
          <img src={m.img} alt={m.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform"/>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <CardTitle className="text-xl">{m.name}</CardTitle>
            <div className="text-sm text-muted-foreground capitalize">{m.segment.replace('-', ' ')}</div>
          </div>
          <Badge variant="outline">{m.price ? `from PKR ${m.price.toLocaleString()}` : 'Get a Quote'}</Badge>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
          <Spec label="Top Speed" value={`${m.topSpeed} km/h`} />
          <Spec label="Range" value={rangeValue} />
          <Spec label="Motor" value={`${m.motorW} W`} />
        </div>
        <div className="text-xs text-muted-foreground mt-1">Battery: {m.battery}</div>
        {m.id === 'okg' && (
          <div className="text-[11px] text-muted-foreground mt-1 flex items-center gap-1">
            <Info className="h-3.5 w-3.5"/>
            Shown as 60 km and up to 120 km on the supplier site; actual may vary.
          </div>
        )}
        <div className="mt-4 flex items-center gap-2">
          {m.colors?.map((c) => (
            <span key={c} className="text-xs px-2 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800">{c}</span>
          ))}
        </div>
        <div className="mt-4 flex gap-2">
          <Button asChild><a href={`#model-${m.id}`}>Details</a></Button>
          <Button variant="outline" onClick={()=>onRequest(m)}>Request Quote</Button>
        </div>
      </CardContent>
    </Card>
  );
}

function Spec({ label, value }) {
  return (
    <div className="p-2 rounded-lg bg-neutral-50 dark:bg-neutral-900 border">
      <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className="text-sm font-medium">{value}</div>
    </div>
  );
}

function CompareStrip({ selected }) {
  if (selected.length < 2) return null;
  return (
    <div className="sticky bottom-4 z-40 max-w-5xl mx-auto">
      <div className="rounded-2xl border bg-white/80 dark:bg-neutral-900/80 backdrop-blur shadow-lg p-3 flex items-center gap-3">
        <span className="text-sm">Compare:</span>
        <div className="flex gap-2 overflow-x-auto">
          {selected.map((m)=> <Badge key={m.id} variant="secondary">{m.name}</Badge>)}
        </div>
        <div className="flex-1"/>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" variant="default">Open Comparison</Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl">
            <DialogHeader><DialogTitle>Model Comparison</DialogTitle></DialogHeader>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {selected.map((m)=> (
                <Card key={m.id}>
                  <CardHeader className="p-3"><CardTitle className="text-sm">{m.name}</CardTitle></CardHeader>
                  <CardContent className="p-3 text-xs space-y-2">
                    <div>Price: {m.price ? `PKR ${m.price.toLocaleString()}` : 'Get a Quote'}</div>
                    <div>Top Speed: {m.topSpeed} km/h</div>
                    <div>Range: {m.id === 'okg' ? '60–120 km' : `${m.rangeKm} km`}</div>
                    <div>Motor: {m.motorW} W</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

function VisitUs() {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT.address)}`;
  const tel = `tel:${CONTACT.phone.replace(/[^+\d]/g, '')}`;
  const wa = `https://wa.me/${CONTACT.whatsapp.replace(/[^\d]/g, '')}`;
  return (
    <section id="dealer" className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Visit Us</h2>
          <div className="flex gap-2">
            <Button asChild variant="outline"><a href={mapsUrl} target="_blank" rel="noreferrer">Get Directions</a></Button>
            <Button asChild><a href={wa} target="_blank" rel="noreferrer">WhatsApp</a></Button>
          </div>
        </div>
        <div className="mt-4 grid md:grid-cols-2 gap-4">
          <div className="aspect-video rounded-2xl border bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center p-4 text-center">
            <div>
              <div className="font-medium">{CONTACT.brand} — Bahawalnagar</div>
              <div className="text-muted-foreground mt-1">{CONTACT.address}</div>
              <div className="mt-3 flex gap-2 justify-center">
                <Button asChild size="sm" variant="outline"><a href={tel}>Call {CONTACT.phone}</a></Button>
                <Button asChild size="sm" variant="secondary"><a href={wa} target="_blank" rel="noreferrer">Chat on WhatsApp</a></Button>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <Card>
              <CardContent className="p-4 text-sm">
                <div className="font-medium">Showroom Hours</div>
                <div className="text-muted-foreground">Mon–Sat • 10:00–19:00 (Sun by appointment)</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-sm">
                <div className="font-medium">Test Rides</div>
                <div className="text-muted-foreground">Book a slot and we’ll confirm on WhatsApp.</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

function News() {
  const NEWS = [
    { id: 1, title: "EV awareness drive in Bahawalnagar", date: "2025-08-01", img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200" },
    { id: 2, title: "New financing partner announced", date: "2025-07-20", img: "https://images.unsplash.com/photo-1465447142348-e9952c393450?w=1200" },
    { id: 3, title: "Free checkup camp — this month", date: "2025-06-15", img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200" },
  ];
  return (
    <section id="news" className="py-12 md:py-16 bg-neutral-50 dark:bg-neutral-950 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">News & Events</h2>
          <Button variant="ghost">View all</Button>
        </div>
        <div className="mt-6 grid md:grid-cols-3 gap-6">
          {NEWS.map(n => (
            <Card key={n.id} className="overflow-hidden">
              <CardHeader className="p-0">
                <div className="aspect-video overflow-hidden">
                  <img src={n.img} alt={n.title} className="w-full h-full object-cover"/>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="text-xs text-muted-foreground">{new Date(n.date).toLocaleDateString()}</div>
                <CardTitle className="text-lg mt-1">{n.title}</CardTitle>
                <Button className="mt-3" variant="link">Read more <ChevronRight className="ml-1 h-4 w-4"/></Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t py-10 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-4 gap-8">
        <div>
          <div className="font-bold text-lg">{CONTACT.brand}</div>
          <p className="text-muted-foreground mt-2">Premium EVs for daily riders in Pakistan.</p>
        </div>
        <div>
          <div className="font-semibold mb-2">Company</div>
          <ul className="space-y-2 text-muted-foreground">
            <li>About</li>
            <li>Careers</li>
            <li>Investors</li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-2">Support</div>
          <ul className="space-y-2 text-muted-foreground">
            <li>Warranty</li>
            <li>Owner manuals</li>
            <li>Contact</li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-2">Visit</div>
          <ul className="space-y-2 text-muted-foreground">
            <li>{CONTACT.address}</li>
            <li>{CONTACT.phone}</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 text-muted-foreground">© {new Date().getFullYear()} {CONTACT.brand}. All rights reserved.</div>
    </footer>
  );
}

export default function MuslimAutosSite() {
  const { models, save } = useCmsModels();
  const [active, setActive] = useState("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState([]);
  const [leadOpen, setLeadOpen] = useState(false);
  const [leadModel, setLeadModel] = useState(null);
  const [cmsOpen, setCmsOpen] = useState(false);

  const filtered = useMemo(() => {
    return models.filter(m => (active === "all" || m.segment === active) && m.name.toLowerCase().includes(query.toLowerCase()));
  }, [active, query, models]);

  function toggleCompare(m){
    setSelected(prev => prev.find(x=>x.id===m.id) ? prev.filter(x=>x.id!==m.id) : [...prev, m].slice(-4));
  }
  function onRequest(m){ setLeadModel(m || null); setLeadOpen(true); }

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
      <Header onOpenMenu={()=>{}}/>
      <Hero onLead={() => onRequest(null)}/>

      {/* Models */}
      <section id="models" className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Model Lineup</h2>
            <div className="text-sm text-muted-foreground flex items-center gap-2"><Settings className="h-4 w-4"/>Request a Quote</div>
          </div>
          <div className="mt-6">
            <Filters active={active} setActive={setActive} query={query} setQuery={setQuery}/>
          </div>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(m => (
              <div key={m.id} className="relative" onDoubleClick={()=>toggleCompare(m)}>
                <ModelCard m={m} onRequest={() => onRequest(m)} />
                <Button size="icon" variant={selected.find(x=>x.id===m.id)?"default":"secondary"} className="absolute top-3 right-3" onClick={()=>toggleCompare(m)} title="Add to compare">⇄</Button>
              </div>
            ))}
          </div>
        </div>
        <CompareStrip selected={selected}/>
      </section>

      <VisitUs/>
      <News/>

      <section id="service" className="py-12 md:py-16 bg-neutral-50 dark:bg-neutral-950 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-6 items-center">
          <div className="md:col-span-2">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Genuine parts & service</h2>
            <p className="text-muted-foreground mt-2">Keep your machine at peak performance with certified technicians, OEM parts, and transparent pricing.</p>
            <div className="mt-4 flex gap-2">
              <Button onClick={() => onRequest(null)}>Book Test Ride</Button>
              <Button variant="outline">Contact Sales</Button>
            </div>
          </div>
          <div className="aspect-[4/3] rounded-2xl border bg-neutral-100 dark:bg-neutral-900"/>
        </div>
      </section>

      {/* Lead form dialog (WhatsApp-first) */}
      <Dialog open={leadOpen} onOpenChange={setLeadOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>{leadModel ? `Request a Quote — ${leadModel.name}` : 'Request a Quote / Book Test Ride'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={(e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            const name = fd.get('name');
            const phone = fd.get('phone');
            const city = fd.get('city');
            const type = fd.get('type') || 'Quote';
            const model = fd.get('model') || (leadModel?.name || 'Any');
            const msg = `Assalam o Alaikum!\nName: ${name}\nPhone: ${phone}\nCity: ${city}\nI want: ${type}\nModel: ${model}`;
            const wa = `https://wa.me/${CONTACT.whatsapp.replace(/[^\d]/g, '')}?text=${encodeURIComponent(msg)}`;
            window.open(wa, '_blank');
            if (CONTACT.leadEmail) {
              const mail = `mailto:${CONTACT.leadEmail}?subject=${encodeURIComponent('Lead from Muslim Autos')}&body=${encodeURIComponent(msg)}`;
              window.open(mail);
            }
            e.target.reset();
            setLeadOpen(false);
          }} className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <div className="text-xs mb-1">Full Name</div>
                <Input name="name" required placeholder="Your name" />
              </div>
              <div>
                <div className="text-xs mb-1">Phone / WhatsApp</div>
                <Input name="phone" required placeholder="03xx-xxxxxxx" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <div className="text-xs mb-1">City</div>
                <Input name="city" required placeholder="Bahawalnagar" />
              </div>
              <div>
                <div className="text-xs mb-1">I want</div>
                <Select name="type" defaultValue="Quote">
                  <SelectTrigger><SelectValue placeholder="Select"/></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Quote">Quote</SelectItem>
                    <SelectItem value="Test Ride">Test Ride</SelectItem>
                    <SelectItem value="Call Back">Call Back</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <div className="text-xs mb-1">Model</div>
              <Input name="model" placeholder={leadModel?.name || 'Select a model'} defaultValue={leadModel?.name || ''} />
            </div>
            <div className="pt-2 flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={()=>setLeadOpen(false)}>Cancel</Button>
              <Button type="submit">Send via WhatsApp</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Simple CMS dialog (localStorage) */}
      <Dialog open={cmsOpen} onOpenChange={setCmsOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Simple CMS — Models (local only)</DialogTitle>
          </DialogHeader>
          <CmsEditor models={models} onSave={save} />
        </DialogContent>
      </Dialog>

      <Footer/>

      {/* Floating CMS button (visible if ?admin=1) */}
      {typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('admin') === '1' && (
        <Button onClick={()=>setCmsOpen(true)} className="fixed bottom-5 right-5 rounded-full shadow-lg" title="Open CMS"><Database className="mr-2 h-4 w-4"/>CMS</Button>
      )}
    </div>
  );
}

function CmsEditor({ models, onSave }){
  const [text, setText] = useState(JSON.stringify(models, null, 2));
  return (
    <div>
      <p className="text-sm text-muted-foreground mb-2">Edit the JSON below to add/update models. Changes save to your browser only (localStorage). We can swap this to Sanity/Strapi later.</p>
      <textarea className="w-full h-72 p-3 border rounded-md font-mono text-sm" value={text} onChange={e=>setText(e.target.value)} />
      <div className="mt-3 flex justify-end gap-2">
        <Button variant="outline" onClick={()=>setText(JSON.stringify(DEFAULT_MODELS, null, 2))}>Reset</Button>
        <Button onClick={()=>{ try { const parsed = JSON.parse(text); onSave(parsed); } catch { alert('Invalid JSON'); } }}>Save</Button>
      </div>
    </div>
  );
}
