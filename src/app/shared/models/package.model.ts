export interface Package {
  id: string;
  prefix?: string;
  suffix?: string;
  weeklyDownloads: number;
  dependencyCount: number;
}

export interface PackageWithDeps extends Package {
  dependencies: string[];
}