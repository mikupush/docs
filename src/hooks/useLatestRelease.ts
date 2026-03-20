import { useEffect, useState } from 'react';

export interface ReleaseAsset {
  name: string;
  browser_download_url: string;
}

export interface ReleaseData {
  tag_name: string;
  assets: ReleaseAsset[];
}

const GITHUB_API_URL = 'https://api.github.com/repos/mikupush/server/releases/latest';

let cachedRelease: ReleaseData | null = null;
let fetchPromise: Promise<ReleaseData> | null = null;

export function useLatestRelease() {
  const [release, setRelease] = useState<ReleaseData | null>(cachedRelease);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (cachedRelease) {
      setRelease(cachedRelease);
      return;
    }

    if (!fetchPromise) {
      fetchPromise = fetch(GITHUB_API_URL)
        .then((res) => res.json())
        .then((data) => {
          if (data.assets) {
            cachedRelease = data;
            return data;
          }
          throw new Error('Could not fetch release data');
        });
    }

    fetchPromise
      .then((data) => setRelease(data))
      .catch(() => setError('Error fetching latest release'));
  }, []);

  return { release, error };
}
