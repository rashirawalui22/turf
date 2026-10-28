export function EmptyState({ icon: Icon, title, text, action }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-[16px] border border-dashed border-black/10 bg-offwhite px-6 py-16 text-center">
      {Icon ? <Icon className="mb-3 text-forest" size={32} /> : null}
      <h3 className="font-heading text-xl font-bold">{title}</h3>
      {text ? <p className="mt-2 max-w-md text-sm text-muted">{text}</p> : null}
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}
