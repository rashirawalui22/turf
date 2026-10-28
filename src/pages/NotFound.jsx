import { Button } from "../components/common/Button";
import { EmptyState } from "../components/common/EmptyState";

export function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <EmptyState
        title="Page not found"
        text="That route is not part of the Turf demo."
        action={<Button to="/">Back to Home</Button>}
      />
    </div>
  );
}
