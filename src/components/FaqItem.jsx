// FaqItem.jsx
import React, { useState } from 'react';
import { Typography, Grid, Container, Box } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import styles from './FaqItem.module.css';

const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (

    <Box>
      <Grid>
        <button className={styles.faqButton} onClick={toggleOpen}>
          {question}
          {isOpen ? <KeyboardArrowUpIcon color="primary.main"/> : <KeyboardArrowDownIcon color="primary.main"/>}
        </button>
        <p variant='regular13' color='font.main' className={isOpen ? `${styles.faqAnswer} ${styles.faqAnswerOpen}` : styles.faqAnswer}>
          {answer}
        </p>
        </ Grid>
    </Box>
  );
};

export default FaqItem;