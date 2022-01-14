import React, { useEffect, useState } from 'react';
import './shell.scss';
import { Button, Card, CardContent, Grid,Box,Tabs,Tab} from '@material-ui/core';
import mediumChart from '../../assets/img/Medium_Chart.png';
import FormatColorFillOutlinedIcon from '@mui/icons-material/FormatColorFillOutlined';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Soundwave from 'components/colors/soundwave';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Shell() {

  	const [value, setValue] = React.useState('one');
  		const handleChange = (event, newValue) => {
    	setValue(newValue);
  	};
    return (
        <div className="main-container">
			<div className="aside-left">
				<div className="logo">
					<img src={logo} />
				</div>
				<div className="tabs">
					<Box>
						<Box>
							<Tabs
								value={value}
								onChange={handleChange}
								textColor="secondary"
								indicatorColor="secondary"
								aria-label="secondary tabs example"
								variant="fullWidth"
							>
								<Tab icon={<FormatColorFillOutlinedIcon />} aria-label="Color" {...a11yProps(0)} />
								<Tab icon={<TuneOutlinedIcon />} aria-label="Style" {...a11yProps(1)} />
								<Tab icon={<TextFieldsIcon />} aria-label="Text" {...a11yProps(2)} />
								<Tab icon={<CheckCircleIcon />} aria-label="Check" {...a11yProps(3)} />
							</Tabs>
						</Box>
						<TabPanel value={value} index={0}>
							<Soundwave />
						</TabPanel>
						<TabPanel value={value} index={1}>
							Item Two
						</TabPanel>
						<TabPanel value={value} index={2}>
							Item Three
						</TabPanel>
					</Box>
				</div>
				<div className="welcome">
					<h1>Welcome</h1>
					<p>We are loaded a demo sound so you can play around and see how this works.</p>
					<p>Begin our short tutorial or create you own sound wave at any time.</p>
				</div>
			</div>
            <div className="aside-right">
               <img src={mediumChart} />
            </div>
        </div>
    )
}
