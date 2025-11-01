export interface Member {
  name: string;
  gender: '男' | '女';
  avatar?: string;
  city?: string;
  email?: string;
  website?: string;
  github?: string;
  skills?: string[];
  bio?: string;
  nickname?: string;
  githubUsername?: string;
  alternativeEmail?: string;
  achievements?: string[];
  position?: string;
  company?: string;
  details: any[];
}

export type MemberSortBy = 'name' | 'city' | 'company' | 'position';
export type MemberFilterBy = 'gender' | 'city' | 'skills' | 'hasGithub' | 'hasWebsite';

export interface MemberSearchOptions {
  keyword?: string;
  gender?: '男' | '女';
  city?: string;
  skill?: string;
  hasGithub?: boolean;
  hasWebsite?: boolean;
  sortBy?: MemberSortBy;
  limit?: number;
}