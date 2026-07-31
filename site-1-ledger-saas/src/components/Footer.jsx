import Logomark from './Logomark.jsx'

const GROUPS = [
  {
    heading: 'Product',
    links: ['Card program', 'Continuous coding', 'Close checklist', 'Consolidation', 'Audit trail'],
  },
  {
    heading: 'Controls',
    links: ['SOC 2 Type II', 'Segregation of duties', 'Sign-off trail', 'SSO and SCIM', 'Status'],
  },
  {
    heading: 'Company',
    links: ['About', 'Careers', 'Terms', 'Privacy', 'Subprocessors'],
  },
]

export default function Footer() {
  return (
    <footer className="on-field bg-field pt-14 pb-10">
      <div className="mx-auto w-full max-w-[92rem] px-4 sm:px-8 md:px-14">
        <div className="grid gap-x-10 gap-y-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <a
              href="#top"
              className="inline-flex items-center gap-2.5 py-1.5 text-on-field transition-opacity hover:opacity-80"
            >
              <Logomark size={22} />
              <span className="cond text-[1.1rem] font-bold tracking-[-0.01em] uppercase">
                Ledger
              </span>
            </a>
            <p className="m-0 mt-5 max-w-[42ch] text-[0.95rem] leading-[1.6] text-on-field-mid">
              The general ledger that never stops posting. Built for controllers who sign
              their name on the close.
            </p>
            <p className="num m-0 mt-6 max-w-[52ch] text-[0.68rem] leading-[1.8] text-on-field-soft">
              Ledger Financial Technologies, Inc. is a financial technology company, not a
              bank. Cards are issued by a partner bank, member FDIC, pursuant to a licence
              from Visa U.S.A. Inc. Deposit balances are held at the issuing bank.
            </p>
          </div>

          <div className="grid gap-x-8 gap-y-8 sm:grid-cols-3 lg:col-span-7">
            {GROUPS.map((group) => (
              <div key={group.heading}>
                <h2 className="num m-0 border-b border-field-rule pb-2 text-[0.66rem] font-medium text-on-field-mid">
                  {group.heading.toUpperCase()}
                </h2>
                {/* Вертикальные отступы держат зону нажатия около 40px. */}
                <ul className="m-0 mt-1 flex list-none flex-col p-0">
                  {group.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#top"
                        className="inline-block py-2 text-[0.9rem] text-on-field-mid transition-colors hover:text-red-on-field"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="perf-top-dark mt-12 flex flex-col gap-3 pt-7 sm:flex-row sm:items-baseline sm:justify-between">
          <p className="num m-0 text-[0.68rem] text-on-field-soft">
            © 2026 LEDGER FINANCIAL TECHNOLOGIES, INC. · FORM 1403-GL REV. 07-26
          </p>
          <p className="num m-0 text-[0.68rem] text-on-field-soft">
            SET IN ANEK LATIN &amp; MARTIAN MONO · PRINTED ON GREENBAR
          </p>
        </div>
      </div>
    </footer>
  )
}
