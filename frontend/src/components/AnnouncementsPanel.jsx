import { useEffect, useState } from 'react';

function Slide({ item }) {
  return (
    <div className="flex items-center gap-4">
      {item.imageUrl && <img src={item.imageUrl} alt={item.title} className="h-16 w-24 rounded-md object-cover" />}
      <div>
        <h3 className="font-semibold text-sm">{item.title}</h3>
        <p className="text-xs text-slate-600 dark:text-slate-300">{item.message}</p>
      </div>
    </div>
  );
}

export default function AnnouncementsPanel({ className }) {
  const [data, setData] = useState([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    fetch('/src/data/announcements.json')
      .then((r) => r.json())
      .then((j) => setData(j.announcements || []))
      .catch(() => setData([]));
  }, []);

  useEffect(() => {
    if (!data.length) return;
    const current = data[active];
    const delay = (current && current.durationSec) ? current.durationSec * 1000 : 7000;
    const t = setTimeout(() => setActive((s) => (s + 1) % data.length), delay);
    return () => clearTimeout(t);
  }, [data, active]);

  const rotating = data.filter((a) => a.rotate);

  return (
    <aside className={className}>
      <div className="space-y-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft dark:border-slate-700 dark:bg-slate-900">
          <h4 className="text-sm font-semibold">Announcements</h4>
          {rotating.length ? (
            <div className="mt-4">
              <Slide item={rotating[active % rotating.length]} />
            </div>
          ) : (
            <p className="mt-4 text-sm text-slate-600">No current announcements.</p>
          )}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft dark:border-slate-700 dark:bg-slate-900">
          <h4 className="text-sm font-semibold">Pinned</h4>
          <ul className="mt-3 space-y-2 text-sm">
            {data.filter((a) => a.pinToTop).length ? (
              data.filter((a) => a.pinToTop).map((a) => (
                <li key={a.id} className="flex items-start gap-3">
                  <div className="grow">
                    <div className="font-medium">{a.title}</div>
                    <div className="text-xs text-slate-600 dark:text-slate-400">{a.message}</div>
                  </div>
                </li>
              ))
            ) : (
              <li className="text-slate-600">No pinned announcements.</li>
            )}
          </ul>
        </div>
      </div>
    </aside>
  );
}
