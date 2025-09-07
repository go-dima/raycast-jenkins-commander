import { List, ActionPanel, Action, Icon, getPreferenceValues } from "@raycast/api";
import { useCachedPromise } from "@raycast/utils";
import { JobTracker } from "./services/JobTracker/job-tracker";
import { getStatusText } from "./common/job-status.helpers";
import { TriggeredJob } from "./components/TriggeredJob";
import { type JobStatus } from "./services/JobTracker";

export default function Command() {
  const { jenkinsUrl } = getPreferenceValues<{ jenkinsUrl: string }>();

  const {
    data: trackedJobs = [],
    isLoading,
    revalidate,
  } = useCachedPromise(JobTracker.updateJobStatuses, [], {
    keepPreviousData: true,
    initialData: [],
  });

  const statusSummary = JobTracker.calculateStatusSummary(trackedJobs);
  const groupedJobs = JobTracker.groupJobsByStatus(trackedJobs);

  const statusOrder: JobStatus[] = ["building", "failure", "unstable", "success", "aborted", "unknown"];

  return (
    <List
      isLoading={isLoading}
      searchBarPlaceholder="Search triggered jobs..."
      actions={
        <ActionPanel>
          <Action title="Refresh" icon={Icon.ArrowClockwise} onAction={() => revalidate()} />
          <Action
            title="Clear All Triggered Jobs"
            icon={Icon.Trash}
            style={Action.Style.Destructive}
            onAction={async () => {
              await JobTracker.clearTrackedJobs();
              revalidate();
            }}
          />
          <Action.OpenInBrowser title="Open Jenkins" url={jenkinsUrl} />
        </ActionPanel>
      }
    >
      {statusSummary.total === 0 ? (
        <List.EmptyView title="Start a job from the extension to see it here" icon={Icon.Hammer} />
      ) : (
        <>
          {statusOrder.map((status) => {
            const jobs = groupedJobs[status];
            const sectionTitle = `${getStatusText(status)} ${status.charAt(0).toUpperCase() + status.slice(1)} (${
              jobs.length
            })`;

            return (
              <List.Section key={status} title={jobs.length > 0 ? sectionTitle : undefined}>
                {jobs.map((job) => (
                  <TriggeredJob key={job.url} job={job} status={status} onRemove={revalidate} />
                ))}
              </List.Section>
            );
          })}
        </>
      )}
    </List>
  );
}
