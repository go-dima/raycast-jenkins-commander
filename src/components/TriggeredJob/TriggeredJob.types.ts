import type { JobStatus, TrackedJob } from "../../services/JobTracker/job-tracker.types";

export interface TriggeredJobProps {
  job: TrackedJob;
  status: JobStatus;
  onRemove: () => void;
}
