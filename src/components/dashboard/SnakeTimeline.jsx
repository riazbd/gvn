import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Box, Paper, Typography, Tooltip, useMediaQuery, useTheme } from '@mui/material';
import { keyframes } from '@emotion/react';
import { Payment, Done, AccountBalanceWallet, Cancel } from '@mui/icons-material';
import PaymentUpdateModal from './PaymentUpdateModal';
import PaymentDetailModal from './PaymentDetailModal';

const pulse = keyframes`
  0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4); }
  70% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(59, 130, 246, 0); }
  100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
`;

const SnakeTimeline = ({ paymentSegments }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const pathRef = useRef(null);
    const [pathLengths, setPathLengths] = useState({ overall: 0, completed: 0 });
    const [updateModalOpen, setUpdateModalOpen] = useState(false);
    const [detailModalOpen, setDetailModalOpen] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState(null);

    // Create a timeline with payment dots at the beginning of each segment, followed by status dots
    // We'll place each payment dot at the start of its segment's status sequence
    const timelineElements = useMemo(() => {
        const elements = [];
        let globalStatusCounter = 0;
        
        paymentSegments.forEach((segment, segmentIndex) => {
            // Add a payment segment dot for this segment
            elements.push({
                type: 'payment',
                id: `payment-${segment.id}`,
                segment: segment,
                payment_segment_id: segment.payment_segment_id,
                payment_segment: segment.payment_segment,
                status: segment.status,
                slug: segment.slug,
                amount: segment.amount,
                image: segment.image,
                is_approved: segment.is_approved,
                ...segment // include all other segment properties
            });
            
            // Add all statuses for this segment
            segment.statuses.forEach((status, statusIndex) => {
                globalStatusCounter++;
                elements.push({
                    type: 'status',
                    ...status,
                    parentSegmentName: segment.payment_segment,
                    parentSegmentId: segment.payment_segment_id,
                    parentSegment: segment,
                    segmentIndex,
                    statusIndex,
                    globalStepNumber: globalStatusCounter
                });
            });
        });
        
        return elements;
    }, [paymentSegments]);

    // Find the overall active status (first non-completed regular status)
    const overallActiveIndex = useMemo(() => timelineElements.findIndex(element => 
        element.type === 'status' && !element.is_completed
    ), [timelineElements]);

    // Function to handle clicking on a payment segment dot
    const handlePaymentClick = (element) => {
        if (element.type === 'payment') {
            // If payment status is null, open update modal
            if (!element.status) {
                setSelectedPayment(element);
                setUpdateModalOpen(true);
            }
            // If payment status is "1", open detail modal (approved)
            else if (element.status === "1") {
                setSelectedPayment(element);
                setDetailModalOpen(true);
            }
            // If payment status is "2", open detail modal (declined/cancelled)
            else if (element.status === "2") {
                setSelectedPayment(element);
                setDetailModalOpen(true);
            }
        }
    };

    const getPaymentIcon = (element, index) => {
        if (element.type !== 'payment') return null;

        const canInteract = !element.status; // Only interact when status is null
        const isActive = !element.status &&
            overallActiveIndex !== -1 &&
            timelineElements[overallActiveIndex]?.parentSegmentId === element.payment_segment_id;

        const iconStyle = {
            fontSize: 32,
            backgroundColor: 'white',
            borderRadius: '50%',
            border: '3px solid',
            zIndex: 2, // Higher than status dots
            cursor: canInteract ? 'pointer' : 'default',
        };

        if (element.status === "1") {
            // Payment approved by admin
            return <Done
                sx={{
                    ...iconStyle,
                    color: theme.palette.success.main,
                    borderColor: theme.palette.success.main,
                    boxShadow: `0 4px 8px ${theme.palette.mode === 'dark'
                      ? 'rgba(34, 197, 94, 0.2)'
                      : 'rgba(34, 197, 94, 0.15)'}`,
                }}
                onClick={() => handlePaymentClick(element)}
            />;
        } else if (element.status === "2") {
            // Payment declined/cancelled by admin
            return <Cancel
                sx={{
                    ...iconStyle,
                    color: theme.palette.error.main,
                    borderColor: theme.palette.error.main,
                    boxShadow: `0 4px 8px ${theme.palette.mode === 'dark'
                      ? 'rgba(239, 68, 68, 0.2)'
                      : 'rgba(239, 68, 68, 0.15)'}`,
                }}
                onClick={() => handlePaymentClick(element)}
            />;
        } else if (element.status === "0") {
            // Payment sent/pending admin verification
            return <AccountBalanceWallet
                sx={{
                    ...iconStyle,
                    color: theme.palette.success.main,
                    borderColor: theme.palette.success.main,
                    boxShadow: `0 4px 8px ${theme.palette.mode === 'dark'
                      ? 'rgba(34, 197, 94, 0.2)'
                      : 'rgba(34, 197, 94, 0.15)'}`,
                }}
                onClick={() => handlePaymentClick(element)}
            />;
        } else {
            // Status is null - available for submission
            return <AccountBalanceWallet
                sx={{
                    ...iconStyle,
                    color: theme => isActive ? theme.palette.primary.main : theme.palette.grey[500],
                    borderColor: theme => isActive ? theme.palette.primary.main : theme.palette.grey[400],
                    animation: isActive ? `${pulse} 2s infinite ease-in-out` : 'none',
                    boxShadow: theme => isActive
                      ? `0 4px 12px ${theme.palette.mode === 'dark'
                          ? 'rgba(59, 130, 246, 0.3)'
                          : 'rgba(59, 130, 246, 0.15)'}`
                      : `0 2px 4px ${theme.palette.mode === 'dark'
                          ? 'rgba(0, 0, 0, 0.1)'
                          : 'rgba(0, 0, 0, 0.05)'}`,
                }}
                onClick={() => canInteract && handlePaymentClick(element)}
            />;
        }
    };

    const getStatusIcon = (status, index) => {
        if (status.type !== 'status') return null;
        
        const isActive = index === overallActiveIndex;
        const number = status.globalStepNumber;
        
        const baseStyle = {
            width: 28,
            height: 28,
            borderRadius: '50%',
            border: '2.5px solid',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            fontSize: '14px',
            zIndex: 1, // Behind payment dots
            cursor: 'default', // Status dots don't have click functionality
            backgroundColor: 'white',
        };

        if (status.is_completed) {
            return (
                <Box
                    sx={{
                        ...baseStyle,
                        color: 'white',
                        backgroundColor: theme.palette.success.main,
                        borderColor: theme.palette.success.main,
                        boxShadow: `0 2px 4px ${theme.palette.mode === 'dark'
                          ? 'rgba(34, 197, 94, 0.2)'
                          : 'rgba(34, 197, 94, 0.15)'}`,
                    }}
                >
                    {number}
                </Box>
            );
        }

        // Check if this status belongs to the segment that currently has the active status
        if (isActive) {
            return (
                <Box
                    sx={{
                        ...baseStyle,
                        color: theme.palette.primary.main,
                        borderColor: theme.palette.primary.main,
                        animation: `${pulse} 2s infinite ease-in-out`,
                        boxShadow: `0 4px 12px ${theme.palette.mode === 'dark'
                          ? 'rgba(59, 130, 246, 0.3)'
                          : 'rgba(59, 130, 246, 0.15)'}`,
                    }}
                >
                    {number}
                </Box>
            );
        }

        return (
            <Box
                sx={{
                    ...baseStyle,
                    color: theme.palette.grey[500],
                    borderColor: theme.palette.grey[400],
                    boxShadow: `0 1px 3px ${theme.palette.mode === 'dark'
                      ? 'rgba(0, 0, 0, 0.1)'
                      : 'rgba(0, 0, 0, 0.05)'}`,
                }}
            >
                {number}
            </Box>
        );
    };

    // Layout configuration
    const horizontalStep = isMobile ? 120 : 200;
    const verticalTurn = 100;
    // We'll consider each payment dot as part of the count for snake pattern
    const dotsPerRow = isMobile ? 3 : 5; // Total dots (payment + status) per row - changed from 4 to 3
    const uTurnRadius = verticalTurn / 2;
    const svgPadding = 120;

    // Calculate positions with snake pattern, considering all elements (payment + status dots)
    const points = useMemo(() => {
        const pts = [];
        let currentX = 0;
        let currentY = 0;
        let direction = 1;
        let dotsInCurrentRow = 0;

        for (let i = 0; i < timelineElements.length; i++) {
            const element = timelineElements[i];

            pts.push({
                ...element,
                x: currentX,
                y: currentY,
                direction
            });

            dotsInCurrentRow++;

            // Check if we need to turn at the end of the row
            const isLastElement = i === timelineElements.length - 1;
            const isTurnPoint = dotsInCurrentRow === dotsPerRow;

            if (isTurnPoint && !isLastElement) {
                // Turn to next row
                currentY += verticalTurn;
                direction *= -1;
                dotsInCurrentRow = 0;
            } else if (!isLastElement) {
                // Move horizontally in current direction
                currentX += horizontalStep * direction;
            }
        }

        return pts;
    }, [timelineElements, horizontalStep, verticalTurn, dotsPerRow, isMobile]);

    // Calculate SVG dimensions
    const { calculatedMinX, calculatedMinY, calculatedSvgWidth, calculatedSvgHeight } = useMemo(() => {
        const minX = points.length > 0 ? Math.min(...points.map(p => p.x)) : 0;
        const maxX = points.length > 0 ? Math.max(...points.map(p => p.x)) : 0;
        const maxY = points.length > 0 ? Math.max(...points.map(p => p.y)) : 0;
        const minY = points.length > 0 ? Math.min(...points.map(p => p.y)) : 0;

        const svgWidth = maxX - minX + svgPadding * 2;
        const svgHeight = maxY - minY + svgPadding * 2;
        return { calculatedMinX: minX, calculatedMinY: minY, calculatedSvgWidth: svgWidth, calculatedSvgHeight: svgHeight };
    }, [points, svgPadding]);

    // Adjust positions to fit within SVG
    const adjustedPoints = useMemo(() => {
        return points.map(p => ({
            ...p,
            x: p.x - calculatedMinX + svgPadding,
            y: p.y - calculatedMinY + svgPadding,
        }));
    }, [points, calculatedMinX, calculatedMinY, svgPadding]);

    // Define path for the connection lines (snake pattern with curves at turns)
    const pathD = useMemo(() => {
        if (adjustedPoints.length <= 1) return '';
        
        let path = `M ${adjustedPoints[0].x} ${adjustedPoints[0].y}`;
        
        for (let i = 1; i < adjustedPoints.length; i++) {
            const prev = adjustedPoints[i - 1];
            const curr = adjustedPoints[i];
            
            // Check if this is a turn (when direction changes)
            const isTurn = prev.direction !== curr.direction;
            
            if (isTurn) {
                // Calculate the curved path for turns
                const sweepFlag = prev.direction === 1 ? 1 : 0;
                path += ` A ${uTurnRadius} ${uTurnRadius} 0 0 ${sweepFlag} ${curr.x} ${curr.y}`;
            } else {
                // Straight line between points
                path += ` L ${curr.x} ${curr.y}`;
            }
        }
        
        return path;
    }, [adjustedPoints, uTurnRadius]);

    // Calculate progress of the animated path
    useEffect(() => {
        if (pathRef.current && adjustedPoints.length > 0) {
            const totalLength = pathRef.current.getTotalLength();
            let completedLength = 0;

            if (overallActiveIndex === -1) {
                // All statuses completed - find the last actual status element
                const lastStatusIndex = timelineElements.findLastIndex(element => element.type === 'status');
                const effectiveActiveIndex = lastStatusIndex !== -1 ? lastStatusIndex : timelineElements.length - 1;
                
                if (effectiveActiveIndex === -1) {
                    completedLength = totalLength;
                } else {
                    const tempPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                    let tempPathD = `M ${adjustedPoints[0].x} ${adjustedPoints[0].y}`;
                    
                    for (let i = 1; i <= effectiveActiveIndex; i++) {
                        const prev = adjustedPoints[i - 1];
                        const curr = adjustedPoints[i];
                        
                        const isTurn = prev.direction !== curr.direction;
                        
                        if (isTurn) {
                            const sweepFlag = prev.direction === 1 ? 1 : 0;
                            tempPathD += ` A ${uTurnRadius} ${uTurnRadius} 0 0 ${sweepFlag} ${curr.x} ${curr.y}`;
                        } else {
                            tempPathD += ` L ${curr.x} ${curr.y}`;
                        }
                    }
                    
                    tempPath.setAttribute('d', tempPathD);
                    completedLength = tempPath.getTotalLength();
                }
            } else if (overallActiveIndex > 0) {
                // Calculate path length up to the active status element
                const tempPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                let tempPathD = `M ${adjustedPoints[0].x} ${adjustedPoints[0].y}`;
                
                for (let i = 1; i <= overallActiveIndex; i++) {
                    const prev = adjustedPoints[i - 1];
                    const curr = adjustedPoints[i];
                    
                    const isTurn = prev.direction !== curr.direction;
                    
                    if (isTurn) {
                        const sweepFlag = prev.direction === 1 ? 1 : 0;
                        tempPathD += ` A ${uTurnRadius} ${uTurnRadius} 0 0 ${sweepFlag} ${curr.x} ${curr.y}`;
                    } else {
                        tempPathD += ` L ${curr.x} ${curr.y}`;
                    }
                }
                
                tempPath.setAttribute('d', tempPathD);
                completedLength = tempPath.getTotalLength();
            }
            
            setPathLengths({ overall: totalLength, completed: completedLength });
        }
    }, [adjustedPoints, overallActiveIndex, timelineElements, uTurnRadius]);

    return (
        <Box sx={{ width: '100%', overflowX: 'auto', py: 4 }}>
            <Box sx={{ position: 'relative', width: calculatedSvgWidth, height: calculatedSvgHeight, m: 'auto' }}>
                <svg width="100%" height="100%" viewBox={`0 0 ${calculatedSvgWidth} ${calculatedSvgHeight}`} style={{ position: 'absolute', top: 0, left: 0, overflow: 'visible' }}>
                    {/* Background path with more visible gradient for light mode */}
                    <defs>
                        <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor={theme.palette.mode === 'dark' ? theme.palette.grey[600] : theme.palette.grey[400]} />
                            <stop offset="100%" stopColor={theme.palette.mode === 'dark' ? theme.palette.grey[700] : theme.palette.grey[600]} />
                        </linearGradient>
                        <linearGradient id="completedGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor={theme.palette.mode === 'dark' ? theme.palette.success.dark : theme.palette.success.main} />
                            <stop offset="100%" stopColor={theme.palette.mode === 'dark' ? theme.palette.success.main : theme.palette.success.dark} />
                        </linearGradient>
                    </defs>
                    <path ref={pathRef} d={pathD} stroke="url(#progressGradient)" strokeWidth="6" fill="none" strokeLinecap="round" />
                    <path
                        d={pathD}
                        stroke="url(#completedGradient)"
                        strokeWidth="6"
                        fill="none"
                        strokeLinecap="round"
                        style={{
                            strokeDasharray: pathLengths.overall,
                            strokeDashoffset: pathLengths.overall - pathLengths.completed,
                            transition: 'stroke-dashoffset 1.5s ease-in-out',
                        }}
                    />
                </svg>

                {adjustedPoints.map((point, index) => (
                    <Box
                        key={point.id}
                        sx={{
                            position: 'absolute',
                            left: point.x,
                            top: point.y,
                            transform: 'translate(-50%, -50%)',
                        }}
                    >
                        {/* Render the appropriate icon based on type */}
                        {point.type === 'payment' ? (
                            <Tooltip
                                title={point.status === "1"
                                    ? `Payment Approved: ${point.payment_segment} - Amount: ${point.amount || 'N/A'}`
                                    : point.status === "0"
                                        ? `Sent & Pending Approval: ${point.payment_segment}`
                                        : point.status === "2"
                                            ? `Payment Declined: ${point.payment_segment} - Amount: ${point.amount || 'N/A'}`
                                            : `Not Submitted: ${point.payment_segment} - Click to submit payment proof`}
                                placement="top"
                                arrow
                            >
                                <Box sx={{ position: 'relative' }}>
                                    {getPaymentIcon(point, index)}
                                    {point.status === "0" &&
                                     overallActiveIndex !== -1 &&
                                     timelineElements[overallActiveIndex]?.parentSegmentId === point.payment_segment_id && (
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                top: '-8px',
                                                right: '-8px',
                                                width: '16px',
                                                height: '16px',
                                                borderRadius: '50%',
                                                backgroundColor: '#ef4444',
                                                border: '2px solid white',
                                                zIndex: 3,
                                            }}
                                        />
                                    )}
                                </Box>
                            </Tooltip>
                        ) : (
                            <Tooltip title={point.segment_status} placement="top" arrow>
                                {getStatusIcon(point, index)}
                            </Tooltip>
                        )}

                        {/* Segment label for payment elements */}
                        {point.type === 'payment' && (
                            <Paper
                                elevation={4}
                                sx={{
                                    position: 'absolute',
                                    bottom: '150%',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    p: '10px 18px',
                                    borderRadius: '20px',
                                    fontSize: '1rem',
                                    fontWeight: 'bold',
                                    whiteSpace: 'nowrap',
                                    background: point.status === "0" &&
                                        overallActiveIndex !== -1 &&
                                        timelineElements[overallActiveIndex]?.parentSegmentId === point.payment_segment_id
                                        ? theme => theme.palette.mode === 'dark'
                                            ? 'linear-gradient(135deg, #3b82f6, #1d4ed8)'
                                            : 'linear-gradient(135deg, #2563eb, #1d40af)'
                                        : theme => theme.palette.mode === 'dark'
                                            ? 'linear-gradient(135deg, #4b5563, #1f2937)'
                                            : 'linear-gradient(135deg, #d1d5db, #9ca3af)',
                                    color: theme => theme.palette.mode === 'dark' ? 'white' : 'black',
                                    boxShadow: theme => `0 6px 16px ${theme.palette.mode === 'dark'
                                      ? 'rgba(0,0,0,0.15)'
                                      : 'rgba(0,0,0,0.08)'}`,
                                    zIndex: 1,
                                }}
                            >
                                {point.payment_segment}
                            </Paper>
                        )}
                    </Box>
                ))}
            </Box>

            {/* Modals */}
            <PaymentUpdateModal
                open={updateModalOpen}
                onClose={() => setUpdateModalOpen(false)}
                payment={selectedPayment}
                onSuccess={() => {
                    setUpdateModalOpen(false);
                    setSelectedPayment(null);
                    // Optionally refresh data here
                }}
            />

            <PaymentDetailModal
                open={detailModalOpen}
                onClose={() => {
                    setDetailModalOpen(false);
                    setSelectedPayment(null);
                }}
                payment={selectedPayment}
            />
        </Box>
    );
};

export default SnakeTimeline;