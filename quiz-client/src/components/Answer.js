import React,{useState} from 'react'
import { Accordion, AccordionDetails, AccordionSummary, CardMedia, Chip, List, ListItem, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { BASE_URL } from '../api';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import { red, green,grey } from '@mui/material/colors';

export default function Answer({qnAnswers}) {
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };


    const markCorrectOrNot = (qna, idx) => {
        if ([qna.answer, qna.selected].includes(idx)) {
            return { sx: { color: qna.answer == idx ? green[500] : red[500] } }
        }
    } 
    
  return (
    <Box sx={{ mt: 5, width: '100%', maxWidth: 640, mx: 'auto' }}>
            {
                qnAnswers.map((item, j) => (<Accordion
                    disableGutters
                    key={j}
                    expanded={expanded === j}
                    onChange={handleChange(j)}>
                    <AccordionSummary expandIcon={<ExpandCircleDownIcon
                        sx={{
                            color: item.answer == item.selected ? green[500] : red[500]
                        }}
                    />}>
                        <Typography
                            sx={{ width: '90%', flexShrink: 0 }}>
                            {item.qnInWords}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ backgroundColor: grey[900] }}>
                        {item.imageName ?
                            <CardMedia
                                component="img"
                                image={BASE_URL + 'images/' + item.imageName}
                                sx={{ m: '10px auto', width: 'auto' }}
                            /> : null}
                        <List>
                            {item.options.map((x, i) =>
                                <ListItem key={i}
                                >
                                    <Typography {...markCorrectOrNot(item, i)}>
                                        <b>
                                            {String.fromCharCode(65 + i) + ". "}
                                        </b>{x}
                                    </Typography>
                                </ListItem>
                            )}
                        </List>
                    </AccordionDetails>
                </Accordion>))
            }

        </Box >
  )
}
