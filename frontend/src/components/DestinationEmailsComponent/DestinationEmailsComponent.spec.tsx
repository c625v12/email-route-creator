import { render } from '@testing-library/react';

import DestinationEmailsComponent from './DestinationEmailsComponent';

describe('DestinationEmailsComponent', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DestinationEmailsComponent />);
    expect(baseElement).toBeTruthy();
  });
});
