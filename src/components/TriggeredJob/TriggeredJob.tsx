import { Action, ActionPanel, Icon, List } from "@raycast/api";
import { JobTracker } from "../../services/JobTracker/job-tracker";
import { getStatusColor, getStatusIcon } from "../../common/job-status.helpers";
import { formatDuration } from "../../common/utils";
import type { TriggeredJobProps } from "./TriggeredJob.types";

export const TriggeredJob = ({ job, status, onRemove }: TriggeredJobProps): JSX.Element => {
  const { url, displayName, startedAt, lastBuildNumber } = job;

  return (
    <List.Item
      key={url}
      title={displayName}
      subtitle={`${formatDuration(startedAt)} ago`}
      accessories={[
        {
          text: lastBuildNumber ? `#${lastBuildNumber}` : undefined,
        },
      ]}
      icon={{ source: getStatusIcon(status), tintColor: getStatusColor(status) }}
      actions={
        <ActionPanel>
          <Action.OpenInBrowser title="Open in Jenkins" url={url} />
          <Action.CopyToClipboard title={"Copy Job Name"} content={displayName} />
          <Action
            title="Remove From List"
            icon={Icon.Trash}
            style={Action.Style.Destructive}
            onAction={async () => {
              await JobTracker.removeTrackedJob(url);
              onRemove();
            }}
          />
        </ActionPanel>
      }
    />
  );
};
