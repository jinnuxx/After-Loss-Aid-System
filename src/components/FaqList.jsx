
import React from 'react';
import { Typography, Grid, Container, Box } from "@mui/material";

import FaqItem from './FaqItem';

const faqs = [
  {
    question: 'What is a SRN or HIN?',
    answer: 'SRN stands for Securityholder Reference Number. An SRN is used to identify the owner of shares that are held by a share registry (i.e. the shares are issuer sponsored). An SRN is 11 characters long and starts with an "i" followed by 10 digits.A HIN is different to an SRN. A HIN is used to identify the owner of shares that are held/managed (i.e. sponsored) by a broker. A HIN is 11 characters long. It starts with an "x" followed by 10 digits.',
  },

  {
    question: 'Where can I find the SRN or HIN?',
    answer:'Your SRN (Securityholder Reference Number) or HIN (Holder Identification Number) is usually found on your holding statements or other correspondence from your broker or share registry. The SRN is generally located at the top right of your statements and begins with the letter "I", followed by several numbers. The HIN will usually start with "X" and can be found on correspondence from your broker.'
  },

  {
    question: 'What if I cannot find the SRN or HIN?',
    answer:'If you cannot find your SRN or HIN, you should contact your broker or the company\'s share registry. They can provide you with your number after verifying your identity. Make sure you have some identification and details of your shareholding handy when you get in touch. If the shares are held in a trust or a company name, you may need additional documentation to confirm your authority to access the information.'
  }
  // ... other FAQs
];

const FaqList = () => {
  return (
    <Typography variant='regular13' color='font.main'>
      {faqs.map((faq, index) => (
        <FaqItem key={index} question={faq.question} answer={faq.answer} />
      ))}
    </Typography>
  );
};

export default FaqList;