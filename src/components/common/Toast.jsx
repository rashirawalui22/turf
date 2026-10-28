import { CheckCircle2, Info, X } from "lucide-react";
import { useUI } from "../../context/UIContext";

export function ToastViewport() {
  const { toasts, dismissToast } = useUI();
  return (
    <div className="pointer-events-none fixed right-4 top-20 z-[80] flex w-[min(100%-2rem,22rem)] flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="pointer-events-auto flex items-start gap-3 rounded-2xl border border-black/5 bg-white p-3 shadow-lg"
        >
          {t.type === "info" ? (
            <Info className="mt-0.5 text-forest" size={18} />
          ) : (
            <CheckCircle2 className="mt-0.5 text-forest" size={18} />
          )}
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold">{t.title}</p>
            {t.message ? <p className="text-xs text-muted">{t.message}</p> : null}
          </div>
          <button
            type="button"
            className="text-muted hover:text-ink"
            onClick={() => dismissToast(t.id)}
            aria-label="Dismiss notification"
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}
