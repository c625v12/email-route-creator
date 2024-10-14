import StaticInfoDisplay from '../static-info-display/static-info-display';
import { DomainSectionContent } from './domainSection.content';
import { useZone } from '../../hooks/useZone';
import { useAtom } from 'jotai';
import { domainAtom } from '../../jotai/atoms';

export function DomainSection() {
  const content = DomainSectionContent;
  const { data, error, isLoading } = useZone();
  const [, setDomain] = useAtom<string>(domainAtom);

  setDomain(data || '');

  if (isLoading) return <div>Loading...</div>;
  if (error || !data) return <div>Error: {error?.message}</div>;

  return (
    <StaticInfoDisplay
      item={{
        title: content.domain,
        info: data,
      }}
    />
  );
}

export default DomainSection;
