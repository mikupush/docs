import React, { useEffect, useState } from 'react';
import CodeBlock from '@theme/CodeBlock';

interface ReleaseAsset {
  name: string;
  browser_download_url: string;
}

interface ReleaseData {
  tag_name: string;
  assets: ReleaseAsset[];
}

export default function LatestReleaseLinks() {
  const [release, setRelease] = useState<ReleaseData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://api.github.com/repos/mikupush/server/releases/latest')
      .then((res) => res.json())
      .then((data) => {
        if (data.assets) {
          setRelease(data);
        } else {
          setError('Could not fetch release data');
        }
      })
      .catch(() => setError('Error fetching latest release'));
  }, []);

  if (error || !release) {
    // Fallback to version 0.0.15 if API fails or is loading
    const version = release?.tag_name || '0.0.15';
    return (
      <>
        <h4>For amd64 (x86_64)</h4>
        <CodeBlock language="bash">
          {`curl -L https://github.com/mikupush/server/releases/download/${version}/mikupush-server-${version}-amd64.deb -o mikupush-server.deb\nsudo dpkg -i mikupush-server.deb`}
        </CodeBlock>
        <h4>For arm64 (AArch64)</h4>
        <CodeBlock language="bash">
          {`curl -L https://github.com/mikupush/server/releases/download/${version}/mikupush-server-${version}-arm64.deb -o mikupush-server.deb\nsudo dpkg -i mikupush-server.deb`}
        </CodeBlock>
      </>
    );
  }

  const amd64Asset = release.assets.find(a => a.name.includes('amd64.deb'));
  const arm64Asset = release.assets.find(a => a.name.includes('arm64.deb'));

  return (
    <>
      {amd64Asset && (
        <>
          <h4>For amd64 (x86_64) - {release.tag_name}</h4>
          <CodeBlock language="bash">
            {`curl -L ${amd64Asset.browser_download_url} -o mikupush-server.deb\nsudo dpkg -i mikupush-server.deb`}
          </CodeBlock>
        </>
      )}
      {arm64Asset && (
        <>
          <h4>For arm64 (AArch64) - {release.tag_name}</h4>
          <CodeBlock language="bash">
            {`curl -L ${arm64Asset.browser_download_url} -o mikupush-server.deb\nsudo dpkg -i mikupush-server.deb`}
          </CodeBlock>
        </>
      )}
    </>
  );
}
