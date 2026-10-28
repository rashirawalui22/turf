import { Modal } from "./Modal";
import { Button } from "./Button";

export function ConfirmationDialog({
  open,
  onClose,
  title,
  text,
  confirmLabel = "Confirm",
  onConfirm,
}) {
  return (
    <Modal open={open} onClose={onClose} title={title}>
      <p className="text-sm leading-6 text-muted">{text}</p>
      <div className="mt-6 flex justify-end gap-3">
        <Button variant="outline" onClick={onClose}>
          Keep
        </Button>
        <Button
          variant="dark"
          onClick={() => {
            onConfirm();
            onClose();
          }}
        >
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  );
}
