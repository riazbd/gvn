import React, { useState } from 'react';
import { Box, Stepper, Step, StepLabel, StepContent, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { CheckCircle, RadioButtonUnchecked, HourglassEmpty } from '@mui/icons-material';

const CustomStepConnector = styled('div')(({ theme }) => ({
  width: 3,
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : theme.palette.grey[300],
  marginLeft: 12,
  flexGrow: 1,
}));

const SerpentTimeline = ({ paymentSegments }) => {
  const [expandedStep, setExpandedStep] = useState(null);

  const handleStepClick = (index) => {
    setExpandedStep(expandedStep === index ? null : index);
  };

  const getActiveStep = () => {
    for (let i = 0; i < paymentSegments.length; i++) {
      const segment = paymentSegments[i];
      const isSegmentComplete = segment.statuses.every(s => s.is_completed);
      if (!isSegmentComplete) {
        return i;
      }
    }
    return paymentSegments.length; // All segments are complete
  };

  const activeStep = getActiveStep();

  const getStepIcon = (segment, index) => {
    const isSegmentComplete = segment.statuses.every(s => s.is_completed);
    if (isSegmentComplete) {
      return <CheckCircle color="success" />;
    }
    if (index === activeStep) {
      return <HourglassEmpty color="primary" />;
    }
    return <RadioButtonUnchecked color="disabled" />;
  };

  return (
    <Box>
      {paymentSegments.map((segment, index) => (
        <Box key={segment.id} sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mr: 2 }}>
            {getStepIcon(segment, index)}
            {index < paymentSegments.length - 1 && <CustomStepConnector />}
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Button onClick={() => handleStepClick(index)} sx={{ p: 0, textAlign: 'left', display: 'block' }}>
              <Typography variant="h6">{segment.payment_segment}</Typography>
            </Button>
            {expandedStep === index && (
              <Box sx={{ mt: 1 }}>
                {segment.statuses.map((status) => (
                  <Typography key={status.id} variant="body2">
                    {status.segment_status}: {status.is_completed ? 'Completed' : 'Pending'}
                  </Typography>
                ))}
                {/* Add payment form here if needed */}
              </Box>
            )}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default SerpentTimeline;

