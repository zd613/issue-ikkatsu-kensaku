export interface IssueInfo {
  title: string;
  url: string;
  state: string; // TODO: open | ...
  createdAt: string;
  updatedAt: string;
  body: string;
}
