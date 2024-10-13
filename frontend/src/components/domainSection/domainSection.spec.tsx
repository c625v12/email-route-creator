import { render } from '@testing-library/react';

import DomainSection from './domainSection';

describe('DomainSection', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DomainSection />);
    expect(baseElement).toBeTruthy();
  });
});
