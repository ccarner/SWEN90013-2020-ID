import React from 'react';
import { render } from '@testing-library/react';
import {SafetySurvey, RelationshipSurvey} from './Data';


//test('title1', () => {
//  const { getByText } = render(<Landing />);
//  const textElement = getByText(/Do you worry about whether your relationship is healthy/i);
//  expect(textElement).toBeInTheDocument();
//});
test('Test SafetySurvey', () => {
  const  getByText = SafetySurvey;
  expect(getByText).not.toBeNull();
});

test('Test SafetySurvey', () => {
  const  getByText = RelationshipSurvey;
  expect(getByText).not.toBeNull();
});
