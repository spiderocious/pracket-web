import { Button } from '@shared/ui/button'
import { PriceBlock, PriceRail, Receipt } from '@shared/ui/price'
import { Scene } from './preview-canvas'

const COUNTRIES = [
  { flag: 'NGN · Nigeria', price: '₦12,000', unit: '/ hr', connect: '₦2,500' },
  { flag: 'GHS · Ghana', price: '₵180', unit: '/ hr', connect: '₵35' },
  { flag: 'KES · Kenya', price: 'KSh 1,400', unit: '/ hr', connect: 'KSh 320' },
  { flag: 'GBP · United Kingdom', price: '£28', unit: '/ hr', connect: '£4' },
  { flag: 'ZAR · South Africa', price: 'R420', unit: '/ hr', connect: 'R85' },
  { flag: 'USD · United States', price: '$32', unit: '/ hr', connect: '$5' },
]

export function PricePart() {
  return (
    <div>
      <div className="mb-9">
        <div className="font-mono uppercase mb-1 text-[11px]" style={{ color: 'var(--ink-3)', letterSpacing: '0.14em' }}>
          23 / DATA &amp; STATE
        </div>
        <h1 className="font-serif font-medium" style={{ fontSize: '30px', letterSpacing: '-0.022em', color: 'var(--ink)', margin: 0 }}>
          Price · connect-fee
        </h1>
        <p className="mt-1 font-mono text-[11px]" style={{ color: 'var(--ink-3)' }}>
          Numbers shout · units whisper
        </p>
      </div>

      <p className="mb-8 text-[13px] leading-[1.65]" style={{ color: 'var(--ink-3)', maxWidth: '64ch' }}>
        Price is the moment the product earns money — both the tutor's hourly rate and Pracket's
        connect-fee. We give it room. Mono, tabular figures, the unit ("per hour") demoted to a
        small-caps label beside. Currency symbol bound to the number, not floating.
      </p>

      <Scene
        label="Scene · profile rail · lesson rate & fee"
        title="Two prices, never confused"
        description="Lesson rate is what the parent pays the tutor; connect-fee is what they pay Pracket. They sit on the same rail but separated by a hairline and labelled distinctly."
      >
        <PriceRail
          items={[
            { label: 'Lesson rate', amount: '₦12,000', unit: 'per hour' },
            { label: 'Connection fee · one-time', amount: '₦2,500', sub: 'Paid to Pracket. Lets you message Marcus and book lessons.' },
          ]}
        >
          <div style={{ marginTop: '4px' }}>
            <Button variant="primary" size="lg" block>Connect with Marcus</Button>
          </div>
        </PriceRail>
      </Scene>

      <Scene
        label="Scene · post-connect · the receipt"
        title="What a parent sees after they pay"
        description="A printed-looking receipt. Heavy ink rule between sub-totals and total. The conversation link sits below."
      >
        <Receipt
          title="Receipt · connection with Marcus K."
          date="12 April 2026 · 19:42 WAT"
          rows={[
            { label: 'Connection fee', amount: '₦2,500.00' },
            { label: 'VAT (7.5%)', amount: '₦187.50' },
            { label: 'Card processing', amount: '₦62.50' },
            { label: 'Total charged', amount: '₦2,750.00', total: true },
          ]}
        >
          <Button variant="primary">Open conversation</Button>
          <Button variant="secondary">Download PDF</Button>
        </Receipt>
      </Scene>

      <Scene
        label="Scene · multi-country · the same price, four currencies"
        title="Pracket is multi-country · the price block adapts"
        description="The component is the same; only the symbol and figure change. Local users see local currency."
      >
        <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
          {COUNTRIES.map(({ flag, price, unit, connect }) => (
            <div
              key={flag}
              className="rounded-[14px]"
              style={{ background: 'var(--paper)', border: '1px solid var(--sheet-edge)', padding: '16px 18px' }}
            >
              <div className="font-sans font-semibold uppercase mb-3" style={{ fontSize: '10.5px', letterSpacing: '0.18em', color: 'var(--ink-3)' }}>
                {flag}
              </div>
              <PriceBlock amount={price} unit={unit} size="md" />
              <div className="font-sans text-[12px] mt-1.5" style={{ color: 'var(--ink-3)' }}>Connect · {connect}</div>
            </div>
          ))}
        </div>
      </Scene>
    </div>
  )
}
