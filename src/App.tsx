import { useEffect, useRef, useState, type ReactNode } from 'react'

/* IntersectionObserver reveal. No scroll listeners anywhere on this page. */
function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add('is-visible')
          io.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}

/* Firmness is a 1 to 10 scale on every model, same scale, same direction. */
const RANGE = [
  {
    name: 'Hush',
    line: 'Pocket sprung core, latex comfort layer',
    body: 'The one people reach for when they share a bed with a restless sleeper. A zoned core keeps movement on one side of the divide.',
    firm: 7,
    price: '£849 single, £1,190 king',
    img: 'https://picsum.photos/seed/mellow-hush-mattress-platform-bed/900/640',
    alt: 'Tall mattress on a low wooden platform bed in a plain room',
    w: 900,
    h: 640,
  },
  {
    name: 'Drift',
    line: 'Pocket sprung core, memory foam comfort',
    body: 'Our most slept on model. Medium through the middle, softer at the shoulder, and quiet enough to turn over in without waking anyone.',
    firm: 5,
    price: '£729 single, £1,040 king',
    img: 'https://picsum.photos/seed/mellow-drift-mattress-linen-morning/900/640',
    alt: 'Mattress dressed in washed linen with daylight across it',
    w: 900,
    h: 640,
  },
  {
    name: 'Lull',
    line: 'Natural latex core, quilted wool cover',
    body: 'Built for side sleepers and lighter frames. Latex returns its shape overnight, so no dip develops at the hip by month six.',
    firm: 3,
    price: '£789 single, £1,130 king',
    img: 'https://picsum.photos/seed/mellow-lull-mattress-slab-window/900/640',
    alt: 'Mattress slab beside a window throwing a soft shadow',
    w: 900,
    h: 640,
  },
  {
    name: 'Anchor',
    line: 'High density foam core, firm latex top',
    body: 'Back sleepers and anyone who prefers to lie flat on it. Deep and unapologetic, with the edge support you need to sit on the side of the bed.',
    firm: 8,
    price: '£1,120 single, £1,560 king',
    img: 'https://picsum.photos/seed/mellow-anchor-mattress-showroom-floor/900/640',
    alt: 'Firm mattress standing on edge in a bright showroom',
    w: 900,
    h: 640,
  },
]

const LAYERS = [
  { k: 'Cover', v: 'Quilted Shetland wool, 18 mm' },
  { k: 'Comfort', v: 'Natural latex, 50 mm, Talalay process' },
  { k: 'Transition', v: 'High resilience foam, 25 mm' },
  { k: 'Core', v: '1,008 pocket springs in three zones' },
  { k: 'Base', v: 'Recycled HDPE board, 20 mm' },
  { k: 'Border', v: 'Knitted stretch panel, 120 mm depth' },
]

const SIZES = [
  { name: 'Single', dims: '90 x 200 cm', note: 'One person, standard UK cot to adult' },
  { name: 'Double', dims: '135 x 190 cm', note: 'The most common size we ship' },
  { name: 'King', dims: '150 x 200 cm', note: 'Adds 15 cm of width, not length' },
  { name: 'Split king', dims: '2 x 90 x 200 cm', note: 'Two singles zipped together' },
]

/* The two inline SVGs below are the house pattern: a quote mark and an
   arrow glyph. No other hand drawn iconography on this page. */
function QuoteMark() {
  return (
    <svg width="34" height="26" viewBox="0 0 34 26" fill="none" aria-hidden="true">
      <path
        d="M0 26V14.6C0 6.2 4.4 1 12.4 0l1.4 4.2c-4.4 1.2-6.6 3.8-6.8 7.6h6.4V26H0zm20.2 0V14.6C20.2 6.2 24.6 1 32.6 0L34 4.2c-4.4 1.2-6.6 3.8-6.8 7.6h6.4V26H20.2z"
        fill="currentColor"
      />
    </svg>
  )
}

function ArrowGlyph() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
      <path
        d="M2 11L11 2M11 2H4.2M11 2v6.8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function App() {
  const [name, setName] = useState('')
  const [postcode, setPostcode] = useState('')
  const [size, setSize] = useState('')
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!size) {
      setError('Pick a size so we can hold the right one in the showroom.')
      return
    }
    if (!/^[A-Za-z]{1,2}\d[A-Za-z\d]?\s*\d[A-Za-z]{2}$/.test(postcode.trim())) {
      setError('That postcode does not look right. Try something like PA3 1BS.')
      return
    }
    if (name.trim().length < 2) {
      setError('Add the name the appointment should sit under.')
      return
    }
    setError('')
    setSent(true)
  }

  return (
    <>
      <header className="sticky top-0 z-30 bg-field/85 backdrop-blur-md">
        <div className="shell flex h-18 max-h-20 items-center justify-between py-3">
          <a href="#top" className="flex items-baseline gap-2.5">
            <span className="font-display text-[1.35rem] font-semibold tracking-[-0.03em] text-ink">
              Mellow
            </span>
          </a>
          <nav className="hidden items-center gap-7 md:flex" aria-label="Main">
            <a href="#range" className="link-underline text-sm text-quiet hover:text-ink">
              Mattresses
            </a>
            <a href="#inside" className="link-underline text-sm text-quiet hover:text-ink">
              Inside
            </a>
            <a href="#sizes" className="link-underline text-sm text-quiet hover:text-ink">
              Sizes
            </a>
          </nav>
          <a href="#try" className="btn btn-primary !py-2 !text-sm">
            Book a try-in
          </a>
        </div>
      </header>

      <main id="top">
        {/* Hero: asymmetric split, copy left, one soft specimen card right. */}
        <section className="shell flex min-h-[100dvh] items-center pt-24 pb-20">
          <div className="grid w-full items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            <Reveal>
              <p className="micro mb-6">Mattresses made in Paisley</p>
              <h1 className="text-[clamp(2.4rem,4.6vw,4rem)] leading-[1.02] text-ink">
                Mattresses that outlast the decade.
              </h1>
              <p className="mt-7 max-w-[46ch] text-[1.0625rem] text-quiet">
                Four firmness levels, made in Scotland and sleepable on in your own bedroom for a
                hundred nights.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-3.5">
                <a href="#try" className="btn btn-primary">
                  Book a try-in
                  <span className="btn-icon">
                    <ArrowGlyph />
                  </span>
                </a>
                <a href="#range" className="btn btn-quiet">
                  See the mattresses
                </a>
              </div>
            </Reveal>

            <Reveal delay={140}>
              <figure className="soft-high overflow-hidden">
                <img
                  src="https://picsum.photos/seed/mellow-drift-specimen-bedroom-morning/900/620"
                  alt="A made bed on a low frame in a bright bedroom with a window open"
                  width={900}
                  height={620}
                  className="h-64 w-full object-cover sm:h-80"
                  loading="eager"
                />
                <figcaption className="space-y-4 px-7 py-6">
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="font-display text-lg font-semibold text-ink">Drift</span>
                    <span className="font-mono text-xs text-quiet">Medium</span>
                  </div>
                  <div className="gauge">
                    <div className="gauge-fill" style={{ width: '50%' }} />
                  </div>
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="font-mono text-[0.6875rem] text-quiet">Firmness 5 of 10</span>
                    <span className="font-mono text-[0.6875rem] text-quiet">120 mm depth</span>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </section>

        {/* Range: 2x2 card grid, four cells for four models, gauge per card. */}
        <section id="range" className="shell py-24 md:py-32">
          <Reveal>
            <h2 className="max-w-[16ch] text-[clamp(2rem,3.9vw,3.1rem)] text-ink">
              Four models, one firmness scale.
            </h2>
            <p className="mt-5 max-w-[58ch] text-quiet">
              Every model is built on the same pocket sprung or latex core and graded on the same
              ten point scale, so moving between them is a small change rather than a new bed.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {RANGE.map((m, i) => (
              <Reveal key={m.name} delay={i * 70}>
                <article className="soft flex h-full flex-col overflow-hidden">
                  <img
                    src={m.img}
                    alt={m.alt}
                    width={m.w}
                    height={m.h}
                    loading="lazy"
                    className="h-48 w-full object-cover"
                  />
                  <div className="flex flex-1 flex-col gap-4 p-7">
                    <div className="flex items-start justify-between gap-6">
                      <div>
                        <h3 className="text-xl text-ink">{m.name}</h3>
                        <p className="mt-1.5 font-mono text-[0.8125rem] text-quiet">{m.line}</p>
                      </div>
                      <span className="font-display text-lg font-semibold text-tide">
                        {m.firm}
                        <span className="text-xs text-quiet">/10</span>
                      </span>
                    </div>
                    <p className="flex-1 text-[0.9375rem] text-quiet">{m.body}</p>
                    <div className="gauge">
                      <div className="gauge-fill" style={{ width: `${m.firm * 10}%` }} />
                    </div>
                    <p className="font-mono text-xs text-quiet">{m.price}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Inside: tall image left, layer list right. */}
        <section id="inside" className="shell py-24 md:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
            <Reveal>
              <img
                src="https://picsum.photos/seed/mellow-mattress-layer-section-cutaway/1000/1200"
                alt="Cut section of a layered mattress showing latex, foam and a pocket sprung core"
                width={1000}
                height={1200}
                loading="lazy"
                className="h-80 w-full object-cover sm:h-[30rem] lg:h-full"
              />
            </Reveal>
            <Reveal delay={110} className="flex flex-col justify-center">
              <h2 className="max-w-[15ch] text-[clamp(2rem,3.9vw,3.1rem)] text-ink">
                Six layers, all of them replaceable.
              </h2>
              <p className="mt-6 max-w-[54ch] text-quiet">
                Nothing is glued together. When the cover wears through at year nine we quilt a new
                one onto the same core, which costs less than a replacement and keeps the bed off
                the skip.
              </p>
              <dl className="mt-10 grid gap-x-10 gap-y-5 sm:grid-cols-2">
                {LAYERS.map((l) => (
                  <div key={l.k}>
                    <div className="soft-divide" />
                    <dt className="mt-4 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-tide">
                      {l.k}
                    </dt>
                    <dd className="mt-2 text-sm text-quiet">{l.v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </section>

        {/* Sizes: grouped clusters, wide panel plus an asymmetric right rail. */}
        <section id="sizes" className="shell py-24 md:py-32">
          <Reveal>
            <p className="micro mb-6">UK sizes and delivery</p>
            <h2 className="max-w-[18ch] text-[clamp(2rem,3.9vw,3.1rem)] text-ink">
              Four standard sizes, cut in Paisley.
            </h2>
            <p className="mt-5 max-w-[58ch] text-quiet">
              Cut to the UK standard rather than a round number, so an existing frame or a fitted
              sheet still fits. Sizes above king are made to order and add a fortnight.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-5 lg:grid-cols-[1.3fr_0.7fr] lg:gap-6">
            <Reveal>
              <div className="soft-high h-full p-7 md:p-9">
                <div className="grid gap-4 sm:grid-cols-2">
                  {SIZES.map((s) => (
                    <div key={s.name} className="soft-sunk p-6">
                      <p className="font-display text-lg font-semibold text-ink">{s.name}</p>
                      <p className="mt-2 font-mono text-sm text-tide">{s.dims}</p>
                      <p className="mt-3 text-sm text-quiet">{s.note}</p>
                    </div>
                  ))}
                </div>
                <div className="soft-divide mt-8" />
                <dl className="mt-8 grid gap-x-10 gap-y-6 sm:grid-cols-2">
                  <div>
                    <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-quiet">
                      Trial
                    </dt>
                    <dd className="mt-2 text-sm text-ink">
                      100 nights at home, collected and refunded in full
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-quiet">
                      Guarantee
                    </dt>
                    <dd className="mt-2 text-sm text-ink">
                      10 years on the core, 3 years on the comfort layers
                    </dd>
                  </div>
                </dl>
              </div>
            </Reveal>

            <Reveal delay={120} className="flex flex-col gap-5">
              <figure className="soft overflow-hidden">
                <img
                  src="https://picsum.photos/seed/mellow-paisley-showroom-beds/800/560"
                  alt="Showroom floor with mattresses laid out on low display beds"
                  width={800}
                  height={560}
                  loading="lazy"
                  className="h-40 w-full object-cover"
                />
                <figcaption className="px-7 py-5 text-sm text-quiet">
                  Blackhall Mill showroom, Paisley
                </figcaption>
              </figure>
              <div className="soft-sunk flex-1 p-7">
                <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-quiet">
                  Delivery
                </p>
                <p className="mt-3 text-sm text-ink">
                  Next day across Glasgow, Edinburgh, Stirling, Perth, Aberdeen and Inverness.
                  Carried up to the bedroom and unpacked.
                </p>
                <p className="mt-5 font-mono text-xs text-tide">Free over £499</p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Quote: full width soft band, single family used once. */}
        <section className="shell py-24 md:py-32">
          <Reveal>
            <figure className="soft-high px-7 py-14 md:px-16 md:py-20">
              <QuoteMark />
              <blockquote className="mt-8 max-w-[52ch] text-[clamp(1.5rem,2.7vw,2.15rem)] leading-[1.3] tracking-[-0.02em] text-ink">
                I went in for a firm one and walked out with a soft one. Two years on the Drift and
                I have not thought about the bed once.
              </blockquote>
              <figcaption className="mt-9 text-sm text-quiet">
                Fionn MacGillivray, customer, Dundee
              </figcaption>
            </figure>
          </Reveal>
        </section>

        {/* Try in: centred stack over one wide soft form panel. */}
        <section id="try" className="shell pb-24 md:pb-32">
          <Reveal>
            <div className="mx-auto max-w-[34rem] text-center">
              <h2 className="text-[clamp(2rem,3.9vw,3.1rem)] text-ink">
                Lie on one before you spend a night on it.
              </h2>
              <p className="mx-auto mt-6 text-quiet">
                Twenty minutes on any model in the showroom, no appointment fee, no obligation to
                buy that afternoon.
              </p>
            </div>
          </Reveal>

          <Reveal delay={110}>
            <form className="soft-high mt-14 p-7 md:p-10" onSubmit={submit} noValidate>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm font-semibold text-ink">
                    Name on the booking
                  </label>
                  <input
                    id="name"
                    name="name"
                    className="field"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Fionn MacGillivray"
                    aria-describedby="name-hint"
                  />
                  <p id="name-hint" className="font-mono text-[0.6875rem] text-quiet">
                    Used to find you on arrival
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="postcode" className="text-sm font-semibold text-ink">
                    Delivery postcode
                  </label>
                  <input
                    id="postcode"
                    name="postcode"
                    className="field"
                    value={postcode}
                    onChange={(e) => setPostcode(e.target.value)}
                    placeholder="PA3 1BS"
                    aria-describedby="postcode-hint"
                  />
                  <p id="postcode-hint" className="font-mono text-[0.6875rem] text-quiet">
                    Decides which van carries it
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="size" className="text-sm font-semibold text-ink">
                    Size to try
                  </label>
                  <div className="relative">
                    <select
                      id="size"
                      name="size"
                      className="field field-select"
                      value={size}
                      onChange={(e) => setSize(e.target.value)}
                      aria-describedby="size-hint"
                    >
                      <option value="">Select a size</option>
                      {SIZES.map((s) => (
                        <option key={s.name} value={s.name}>
                          {s.name}, {s.dims}
                        </option>
                      ))}
                    </select>
                    <span className="chevron" aria-hidden="true" />
                  </div>
                  <p id="size-hint" className="font-mono text-[0.6875rem] text-quiet">
                    Held in the room for a week
                  </p>
                </div>
              </div>

              {error && (
                <p role="alert" className="mt-7 text-sm font-semibold text-tide-deep">
                  {error}
                </p>
              )}

              {sent ? (
                <div className="soft-sunk mt-8 px-6 py-5 text-sm text-ink" role="status">
                  Booked for {name.trim()}. We will email {size} to {postcode.trim().toUpperCase()}{' '}
                  with a slot.
                </div>
              ) : (
                <button type="submit" className="btn btn-primary mt-8">
                  Book a try-in
                  <span className="btn-icon">
                    <ArrowGlyph />
                  </span>
                </button>
              )}
            </form>
          </Reveal>
        </section>
      </main>

      <footer className="soft">
        <div className="shell grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr] md:py-16">
          <div>
            <p className="font-display text-lg font-semibold text-ink">Mellow</p>
            <p className="mt-3 max-w-[40ch] text-sm text-quiet">
              Mattresses built and upholstered in Paisley since 1978, with a workshop you can still
              visit and a telephone that gets answered.
            </p>
          </div>
          <nav aria-label="Footer" className="flex flex-col gap-3 text-sm">
            <a href="#range" className="link-underline text-quiet hover:text-ink">
              Mattresses
            </a>
            <a href="#inside" className="link-underline text-quiet hover:text-ink">
              Inside
            </a>
            <a href="#sizes" className="link-underline text-quiet hover:text-ink">
              Sizes
            </a>
          </nav>
          <div className="text-sm text-quiet">
            <p>Unit 4, Blackhall Mill</p>
            <p className="mt-1">Paisley, Renfrewshire PA3 1BS</p>
            <p className="mt-1">0141 887 2246</p>
            <a href="#try" className="link-underline mt-4 inline-block text-ink">
              Book a try-in
            </a>
          </div>
        </div>
        <div className="shell pb-8">
          <p className="font-mono text-[0.6875rem] text-quiet">
            Developed by{' '}
            <a href="https://thediyadevelopers.com" className="link-underline text-ink">
              Diya Developers
            </a>
          </p>
        </div>
      </footer>
    </>
  )
}