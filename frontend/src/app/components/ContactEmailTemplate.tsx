import * as React from 'react';

interface ContactFormEmailProps {
  name: string;
  message: string;
  subject: string;
}

export const ContactEmailTemplate: React.FC<Readonly<ContactFormEmailProps>> = ({ name, message, subject }) => (
  <div>
    <h1>Welcome, {name}!</h1>

    <p>
      {message}, {subject}
    </p>
  </div>
);
