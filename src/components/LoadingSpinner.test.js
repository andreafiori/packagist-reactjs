import React from 'react';
import { render } from '@testing-library/react';
import LoadingSpinner from './LoadingSpinner';

it('CheckboxWithLabel changes the text after click', () => {
  const res = render(
    <LoadingSpinner />,
  );

  expect(res).toBeTruthy();
});
