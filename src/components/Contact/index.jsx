import React from 'react';
import { Container } from 'components/common';
import { Wrapper } from './styles';
import ContactForm from './ContactForm';

export const Contact = props => {
  const { campaign } = props;
  return (
    <Wrapper as={Container} id="contact" className="contact">
      {/* <div className="contact-header">
      <h1>Learn More About Degree Options and Financial Aid </h1>
      <p>Share your information and we’ll be in touch soon.</p>
    </div> */}
      <ContactForm campaign={campaign} />
    </Wrapper>
  );
};
