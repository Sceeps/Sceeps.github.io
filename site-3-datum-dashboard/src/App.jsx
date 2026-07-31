import { useCallback, useEffect, useState } from 'react';
import Sidebar from './components/Sidebar.jsx';
import Topbar from './components/Topbar.jsx';
import FreshnessBar from './components/FreshnessBar.jsx';
import AnomalyFeed from './components/AnomalyFeed.jsx';
import VitalsStrip from './components/VitalsStrip.jsx';
import IngestChart from './components/IngestChart.jsx';
import FunnelPanel from './components/FunnelPanel.jsx';
import RetentionPanel from './components/RetentionPanel.jsx';
import PipelinePanel from './components/PipelinePanel.jsx';
import EventStream from './components/EventStream.jsx';

// Порядок блоков — порядок вопросов: свежесть данных, что сломалось,
// насколько, когда, чего это стоило, и наконец сами события.
export default function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [section, setSection] = useState('pulse');
  const [range, setRange] = useState('72h');
  const [project, setProject] = useState('prod');

  const [live, setLive] = useState(true);
  const [scoped, setScoped] = useState(null);
  const [announce, setAnnounce] = useState('');

  // Два разных состояния загрузки: booting — первый рендер без данных, тут
  // скелетоны держат разметку; refetching — данные уже на экране, скелетоны
  // выбросили бы то, что человек читает, поэтому кадр просто притухает.
  const [booting, setBooting] = useState(true);
  const [refetching, setRefetching] = useState(false);

  // ?state=loading оставляет скелетоны открытыми: за 900мс их не разглядеть.
  const held = new URLSearchParams(window.location.search).get('state') === 'loading';

  useEffect(() => {
    if (held) return;
    const t = setTimeout(() => {
      setBooting(false);
      setAnnounce('Pulse loaded');
    }, 900);
    return () => clearTimeout(t);
  }, [held]);

  const refresh = useCallback(() => {
    setRefetching(true);
    setAnnounce('Refreshing pulse data');
    setTimeout(() => {
      setRefetching(false);
      setAnnounce('Pulse data updated');
    }, 1200);
  }, []);

  // Блокируем скролл под мобильной панелью.
  useEffect(() => {
    if (!navOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [navOpen]);

  return (
    <div className="flex h-[100svh] overflow-hidden bg-canvas">
      <Sidebar
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((c) => !c)}
        active={section}
        onNavigate={(id) => {
          setSection(id);
          setNavOpen(false);
        }}
        mobileOpen={navOpen}
        onCloseMobile={() => setNavOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar
          onOpenNav={() => setNavOpen(true)}
          range={range}
          onRangeChange={setRange}
          project={project}
          onProjectChange={setProject}
        />

        <p aria-live="polite" className="sr-only">
          {announce}
        </p>

        <main className="min-w-0 flex-1 overflow-y-auto overflow-x-hidden">
          <div className="mx-auto min-w-0 max-w-[1400px] px-3 py-3 sm:px-4">
            <div className="mb-3 flex flex-wrap items-end justify-between gap-x-4 gap-y-1">
              <div className="min-w-0">
                <h1 className="text-md font-semibold tracking-[-0.012em] text-ink">Pulse</h1>
                <p className="mt-0.5 text-2xs text-ink-faint">Production · 72h window · all timestamps UTC</p>
              </div>
              <p className="text-2xs text-ink-faint">
                On call <span className="text-ink-muted">R. Okonjo</span> until 18:00
              </p>
            </div>

            <FreshnessBar
              live={live}
              stale={!live}
              loading={refetching}
              onToggleLive={() => {
                setLive((l) => !l);
                setAnnounce(live ? 'Stream paused' : 'Stream resumed');
              }}
              onRefresh={refresh}
            />

            {/* При обновлении данных DOM и высоты те же, меняется только
                прозрачность: иначе разметка прыгает. */}
            <div
              className={`mt-3 space-y-3 transition-opacity duration-[--dur-slow] ${
                refetching ? 'pointer-events-none opacity-55' : 'opacity-100'
              }`}
              aria-busy={refetching || undefined}
            >
              <AnomalyFeed
                onScopeTo={(a) => {
                  setScoped(a);
                  setAnnounce(`Event stream scoped to ${a.metric}`);
                }}
              />

              <VitalsStrip loading={booting} />

              <div className="grid grid-cols-1 gap-3 xl:grid-cols-[minmax(0,1.62fr)_minmax(0,1fr)]">
                <IngestChart />
                <PipelinePanel />
              </div>

              <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                <FunnelPanel />
                <RetentionPanel />
              </div>

              <EventStream
                loading={booting}
                stale={!live}
                scopedView={scoped}
                onClearScope={() => {
                  setScoped(null);
                  setAnnounce('Scope cleared');
                }}
              />
            </div>

            <footer className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 pb-5 pt-4">
              <p className="text-2xs text-ink-faint">
                Datum · portfolio demo · every number on this screen is synthetic and derived from one
                scripted incident
              </p>
              <a
                href={held ? '/' : '/?state=loading'}
                className="text-2xs text-ink-faint underline decoration-border-strong underline-offset-2 transition-colors duration-[--dur-fast] hover:text-ink-muted"
              >
                {held ? 'Exit loading state' : 'View loading state'}
              </a>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}
