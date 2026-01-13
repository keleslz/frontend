export type ListUserClientOutputData = {
  total_count: number,
  incomplete_results: boolean,
  items: {
    login: string;
    id: number;
    avatar_url: string;
    html_url: string;
  }[]
}