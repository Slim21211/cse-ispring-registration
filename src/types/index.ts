export interface City {
  id: string;
  name: string;
  url: string;
  is_pinned: boolean;
  parent_id: string | null;
  created_at: string;
}
