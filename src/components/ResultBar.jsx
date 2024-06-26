import React, { useState, useEffect, useRef } from 'react';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Image from 'react-bootstrap/Image';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'
import NominateOrganisation from './NominateOrganisation';

import { useOrganisations } from '../OrganisationsContext';



function ResultBar({inputValue,  isOpenCheck, onAdd}){
    const {
        categories,
        categories_common,
        selectedOrganisations,
        addOrganisation,
        removeOrganisation,
      } = useOrganisations();
    const [filteredOrganisation, setFilteredOrganisation] = useState([]);
    const [reminderStatement, setReminderStatement] = useState("");
    
    useEffect(() => {
        
        let organisationList = [];
        let selectedOrganisationList = [];
        
       
        
        categories_common['Banks'].forEach(organisation => organisationList.push(organisation))
        categories_common['Superannuation'].forEach(organisation => organisationList.push(organisation))
        categories_common['Insurance'].forEach(organisation => organisationList.push(organisation))
        selectedOrganisationList = selectedOrganisations.map((org) => org.name);
      
        let updatedFilteredOrganisation = organisationList.map(organisation => {
            let status = selectedOrganisationList.some(selectedOrganisation => selectedOrganisation === organisation.name) ? 'Selected' : 'Select';
            organisation['status'] = status
            return organisation;
        });
        
        console.log(updatedFilteredOrganisation)
        if (inputValue != "") {
            updatedFilteredOrganisation = updatedFilteredOrganisation.filter(organisation => String(organisation.name).toLowerCase().includes(String(inputValue).toLowerCase()));
        }else{
            updatedFilteredOrganisation = []
        }
        if(updatedFilteredOrganisation.length == 0){
            setReminderStatement("Can't find the organisation?")
        }else{
            setReminderStatement("Looking for another organisation?")
        }
        setFilteredOrganisation(updatedFilteredOrganisation);

    }, [inputValue]); 

    const handleClick = (organisation) => {
        const updatedOrganisations = filteredOrganisation.map(org => {
            if (org.name === organisation.name) {
                const newStatus = org.status === 'Selected' ? 'Select' : 'Selected';
                
                return { ...org, status: newStatus };
            }
            return org;
        });
        if(organisation['status'] != "Selected"){
            console.log("add" + organisation['name'])
            addOrganisation(organisation)
            organisation['status'] = 'Selected'
        }else{
            removeOrganisation(organisation['name'])
            organisation['status'] = 'Select'
        }

        setFilteredOrganisation(updatedOrganisations);
    };
    
    return(
        
                <Box display="flex" flexDirection="column" 
                    border={1} borderRadius={2}
                    borderColor="#DADADA"
                    padding={2}
                    paddingLeft={3}
                    paddingRight={3}
                    zIndex="1000"
                    position="absolute"
                    backgroundColor="#FCFCFC"
                    width="100%"> 
                    {filteredOrganisation.map((item, index) => (
                        <Grid item key={index}>
                        <Button
                        onClick={() => handleClick(item)}
                        sx={{
                            borderWidth: 2, 
                            margin: "5px",
                            borderRadius: '10px',
                            border: item['status'] === 'Selected' ?  '1px solid #1868AF' : '',
                            backgroundColor:item['status'] === 'Selected' ?  '#DEEAFA' :'#FCFCFC',
                            display:"flex",
                            width:'100%',
                            padding: '10px',
                            justifyContent: "space-between",
                            borderColor: 'primary.main', 
                            '&:hover': {
                                borderWidth: item['status'] === 'Selected' ?  '1px solid #1868AF' :2,
                                backgroundColor:item['status'] === 'Selected' ?  '#DEEAFA' :'#EFEFEF',
                                '.select-typography': { 
                                    backgroundColor: '#1868AF', 
                                    color: '#FCFCFC',
                                }
                            },
                        }}
                        
                        >
                            <Box display='flex' flexDirection='row'>
                                <Image src={item['logo']} rounded style={{ width: '24px', height: '24px' }}/>
                                <Typography sx={{size:19,color:"#1D1D1D", textTransform: 'none'}}>{item['name']}</Typography>
                            </Box>
                            
                            <Typography 
                                className='select-typography'
                                sx={{
                                    border: item['status'] === 'Selected' ?  '1px solid #1868AF' :'1px solid #969696',
                                    backgroundColor: item['status'] === 'Selected' ? '#1868AF':'#EFEFEF',
                                    color: item['status'] === 'Selected' ? '#FCFCFC' : '#969696',
                                    borderRadius:'10px',
                                    size: 14,
                                    fontHeight: '16.59px',
                                    padding:'2px',
                                    paddingRight: '10px',
                                    paddingLeft: '10px',
                                    textTransform: 'none'
                                }}
                            >{item['status']}</Typography>
                            
                        </Button>
                        
                        
                    </Grid>
                    ))}
                    
                    <Grid item>
                        <Typography variant="thin13" color='font.light'  sx={{ ml: 1, mt: 3, }}>
                            {reminderStatement}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <NominateOrganisation  isOpenCheck = {isOpenCheck} onAdd={onAdd}/>
                    </Grid>
                </Box>
            
    );
}
 


export default ResultBar;