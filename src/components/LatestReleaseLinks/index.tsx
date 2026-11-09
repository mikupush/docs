import React from 'react';
import CodeBlock from '@theme/CodeBlock';
import { useLatestRelease } from '@site/src/hooks/useLatestRelease';

const FALLBACK_VERSION = '0.0.15';

export default function LatestReleaseLinks() {
  const { release, error } = useLatestRelease();
  const version = release?.tag_name || FALLBACK_VERSION;

  const amd64Asset = release?.assets.find(a => a.name.includes('amd64.deb'));
  const arm64Asset = release?.assets.find(a => a.name.includes('arm64.deb'));

  const amd64Url = amd64Asset?.browser_download_url
    || `https://github.com/mikupush/server/releases/download/${version}/mikupush-server_${version}_amd64.deb`;
  const arm64Url = arm64Asset?.browser_download_url
    || `https://github.com/mikupush/server/releases/download/${version}/mikupush-server_${version}_arm64.deb`;

  return (
    <>
      <h4>For amd64 (x86_64) - {version}</h4>
      <CodeBlock language="bash">
        {`curl -L ${amd64Url} -o mikupush-server.deb\nsudo dpkg -i mikupush-server.deb`}
      </CodeBlock>
      <h4>For arm64 (AArch64) - {version}</h4>
      <CodeBlock language="bash">
        {`curl -L ${arm64Url} -o mikupush-server.deb\nsudo dpkg -i mikupush-server.deb`}
      </CodeBlock>
    </>
  );
}
