import { motion, useReducedMotion } from 'framer-motion'
import { DEPLOY_FLOW, DEPLOY_STATUS } from '../data/content'
import { Panel, Section } from './ui'

export function Deployment() {
  const reduce = useReducedMotion()

  return (
    <Section
      id="deployment"
      index="09"
      label="Deployment"
      title="Deployment"
      intro="This portfolio runs as a containerized app behind Nginx on an OpenStack VM."
    >
      <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
        <Panel className="p-6">
          <div className="mb-5 flex items-center justify-between font-mono text-[11px] tracking-[0.2em] text-dim">
            <span>PIPELINE</span>
            <span className="text-cyan">CI → RUNTIME</span>
          </div>
          <ol className="space-y-0">
            {DEPLOY_FLOW.map((step, i) => (
              <motion.li
                key={step}
                initial={reduce ? false : { opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex items-center gap-4"
              >
                <div className="flex flex-col items-center">
                  <span
                    className={`flex size-7 items-center justify-center rounded border font-mono text-[10px] ${
                      i === DEPLOY_FLOW.length - 1
                        ? 'border-term/60 bg-term/10 text-term'
                        : 'border-edge-bright bg-void text-dim'
                    }`}
                  >
                    {i === DEPLOY_FLOW.length - 1 ? '●' : i + 1}
                  </span>
                  {i < DEPLOY_FLOW.length - 1 && (
                    <motion.span
                      className="h-6 w-px bg-edge-bright"
                      aria-hidden="true"
                      animate={reduce ? undefined : { backgroundColor: ['#263042', '#22d3ee', '#263042'] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.25 }}
                    />
                  )}
                </div>
                <span className="font-mono text-sm text-muted">{step}</span>
              </motion.li>
            ))}
          </ol>
        </Panel>

        <Panel className="overflow-hidden">
          <div className="flex items-center justify-between border-b border-edge px-5 py-3 font-mono text-[11px] tracking-[0.16em] text-dim">
            <span>INFRASTRUCTURE DASHBOARD</span>
            <span className="flex items-center gap-1.5 text-term">
              <span className="size-1.5 rounded-full bg-term node-pulse" aria-hidden="true" />
              ONLINE
            </span>
          </div>

          <div className="px-5 py-5">
            <div className="mb-5 flex items-center gap-3 rounded border border-term/40 bg-term/5 px-4 py-3">
              <span className="size-2 rounded-full bg-term" aria-hidden="true" />
              <span className="font-mono text-xs tracking-[0.2em] text-term">INSTANCE · HEALTHY</span>
              <span className="ml-auto font-mono text-[10px] text-dim">openstack</span>
            </div>

            <dl className="divide-y divide-edge font-mono text-sm">
              {DEPLOY_STATUS.map((row) => (
                <div key={row.k} className="flex items-center justify-between py-2.5">
                  <dt className="text-[11px] tracking-[0.16em] text-dim">{row.k.toUpperCase()}</dt>
                  <dd className={row.v === 'HEALTHY' ? 'text-term' : 'text-ink'}>{row.v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-5 rounded border border-edge bg-void/70 p-3 font-mono text-[11px] leading-relaxed text-dim">
              <span className="text-term">$</span> docker compose ps
              <br />
              <span className="text-cyan">portfolio-web</span> · running · healthy
              <br />
              <span className="text-cyan">nginx-proxy</span> · running · :80/:443
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-edge px-5 py-2 font-mono text-[10px] text-dim">
            <span>ubuntu · docker · nginx</span>
            <span className="text-term">200 OK</span>
          </div>
        </Panel>
      </div>
    </Section>
  )
}
