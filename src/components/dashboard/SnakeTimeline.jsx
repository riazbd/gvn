import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Box, Paper, Typography, Tooltip, useMediaQuery, useTheme } from '@mui/material';
import { keyframes } from '@emotion/react';
import { CheckCircle, RadioButtonUnchecked, HourglassEmpty } from '@mui/icons-material';

const pulse = keyframes`
  0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(0, 123, 255, 0.4); }
  70% { transform: scale(1.1); box-shadow: 0 0 0 10px rgba(0, 123, 255, 0); }
  100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(0, 123, 255, 0); }
`;

const SnakeTimeline = ({ paymentSegments }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const pathRef = useRef(null);
    const [pathLengths, setPathLengths] = useState({ overall: 0, completed: 0 });

    const flattenedStatuses = useMemo(() => paymentSegments.flatMap(segment =>
        segment.statuses.map(status => ({
            ...status,
            parentSegmentName: segment.payment_segment,
            isFirstStatusOfSegment: segment.statuses[0].id === status.id,
        }))
    ), [paymentSegments]);

    const overallActiveStatusIndex = useMemo(() => flattenedStatuses.findIndex(status => !status.is_completed), [flattenedStatuses]);

    const getStatusIcon = (status, index) => {
        const iconStyle = {
            fontSize: 30,
            backgroundColor: 'white',
            borderRadius: '50%',
            border: '3px solid',
            zIndex: 1,
            cursor: 'pointer',
        };

        if (status.is_completed) {
            return <CheckCircle color="success" sx={{ ...iconStyle, borderColor: 'success.main' }} />;
        }
        if (index === overallActiveStatusIndex) {
            return <HourglassEmpty color="primary" sx={{ ...iconStyle, borderColor: 'primary.main', animation: `${pulse} 2s infinite ease-in-out` }} />;
        }
        return <RadioButtonUnchecked color="disabled" sx={{ ...iconStyle, borderColor: 'grey.400' }} />;
    };

    const dotDiameter = 40;
    const horizontalStep = isMobile ? 120 : 200;
    const verticalTurn = 100;
    const dotsPerSegment = isMobile ? 3 : 4;
    const uTurnRadius = verticalTurn / 2;
    const svgPadding = 120; // Defined once as a constant in component scope

    const points = useMemo(() => {
        const pts = [];
        let currentX = 0;
        let currentY = 0;
        let direction = 1;

        for (let i = 0; i < flattenedStatuses.length; i++) {
            pts.push({ ...flattenedStatuses[i], x: currentX, y: currentY, direction });
            const isTurnPoint = i % dotsPerSegment === dotsPerSegment - 1;

            if (isTurnPoint && i < flattenedStatuses.length - 1) {
                currentY += verticalTurn;
                direction *= -1;
            } else if (i < flattenedStatuses.length - 1) {
                currentX += horizontalStep * direction;
            }
        }
        return pts;
    }, [flattenedStatuses, horizontalStep, verticalTurn, dotsPerSegment, uTurnRadius]);

    const { calculatedMinX, calculatedMaxX, calculatedMinY, calculatedMaxY, calculatedSvgWidth, calculatedSvgHeight } = useMemo(() => {
        const minX = points.length > 0 ? Math.min(...points.map(p => p.x)) : 0;
        const maxX = points.length > 0 ? Math.max(...points.map(p => p.x)) : 0;
        const minY = points.length > 0 ? Math.min(...points.map(p => p.y)) : 0;
        const maxY = points.length > 0 ? Math.max(...points.map(p => p.y)) : 0;
        
        const svgWidth = maxX - minX + svgPadding * 2;
        const svgHeight = maxY - minY + svgPadding * 2;
        return { calculatedMinX: minX, calculatedMaxX: maxX, calculatedMinY: minY, calculatedMaxY: maxY, calculatedSvgWidth: svgWidth, calculatedSvgHeight: svgHeight };
    }, [points, svgPadding]);

    const adjustedPoints = useMemo(() => {
        return points.map(p => ({
            ...p,
            x: p.x - calculatedMinX + svgPadding,
            y: p.y - calculatedMinY + svgPadding,
        }));
    }, [points, calculatedMinX, calculatedMinY, svgPadding]);

    const pathD = useMemo(() => adjustedPoints.map((p, i) => {
        if (i === 0) return `M ${p.x} ${p.y}`;
        const prev = adjustedPoints[i - 1];
        const isTurn = i % dotsPerSegment === 0;

        if (isTurn) {
            const sweepFlag = prev.direction === 1 ? 1 : 0; 
            return `A ${uTurnRadius} ${uTurnRadius} 0 0 ${sweepFlag} ${p.x} ${p.y}`;
        }
        return `L ${p.x} ${p.y}`;
    }).join(' '), [adjustedPoints, dotsPerSegment, uTurnRadius]);


    useEffect(() => {
        if (pathRef.current) {
            const totalLength = pathRef.current.getTotalLength();
            let completedLength = 0;
            
            if (overallActiveStatusIndex === -1) {
                completedLength = totalLength;
            } else if (overallActiveStatusIndex > -1) { // Fixed: overallActiveStatusIndex can be 0
                const tempPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                const completedPathD = adjustedPoints.slice(0, overallActiveStatusIndex + 1).map((p, i) => {
                    if (i === 0) return `M ${p.x} ${p.y}`;
                    const prev = adjustedPoints[i - 1];
                    const isTurn = i % dotsPerSegment === 0;
                    if (isTurn) {
                        const sweepFlag = prev.direction === 1 ? 1 : 0;
                        return `A ${uTurnRadius} ${uTurnRadius} 0 0 ${sweepFlag} ${p.x} ${p.y}`;
                    }
                    return `L ${p.x} ${p.y}`;
                }).join(' ');
                tempPath.setAttribute('d', completedPathD);
                completedLength = tempPath.getTotalLength();
            }
            setPathLengths({ overall: totalLength, completed: completedLength });
        }
    }, [adjustedPoints, overallActiveStatusIndex, dotsPerSegment, uTurnRadius, calculatedSvgWidth, calculatedSvgHeight]);


    return (
        <Box sx={{ width: '100%', overflowX: 'auto', py: 4 }}>
            <Box sx={{ position: 'relative', width: calculatedSvgWidth, height: calculatedSvgHeight, m: 'auto' }}>
                <svg width="100%" height="100%" viewBox={`0 0 ${calculatedSvgWidth} ${calculatedSvgHeight}`} style={{ position: 'absolute', top: 0, left: 0, overflow: 'visible' }}>
                    <path ref={pathRef} d={pathD} stroke="lightgrey" strokeWidth="4" fill="none" />
                    <path
                        d={pathD}
                        stroke={theme.palette.success.main}
                        strokeWidth="4"
                        fill="none"
                        style={{
                            strokeDasharray: pathLengths.overall,
                            strokeDashoffset: pathLengths.overall - pathLengths.completed,
                            transition: 'stroke-dashoffset 1.5s ease-in-out',
                        }}
                    />
                </svg>
                {adjustedPoints.filter(p => !p.isTurn).map((point, index) => (
                    <Box
                        key={point.id}
                        sx={{
                            position: 'absolute',
                            left: point.x,
                            top: point.y,
                            transform: 'translate(-50%, -50%)',
                        }}
                    >
                        <Tooltip title={point.segment_status} placement="top" arrow>
                            <Box>
                                {getStatusIcon(point, index)}
                            </Box>
                        </Tooltip>
                        {point.isFirstStatusOfSegment && (
                            <Paper
                                elevation={3}
                                sx={{
                                    position: 'absolute',
                                    bottom: point.y > (calculatedMinY + svgPadding) ? '150%' : 'auto',
                                    top: point.y > (calculatedMinY + svgPadding) ? 'auto' : '150%',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    p: '8px 16px',
                                    borderRadius: '16px',
                                    fontSize: '1rem',
                                    fontWeight: 'bold',
                                    whiteSpace: 'nowrap',
                                    bgcolor: 'primary.dark',
                                    color: 'white',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                                }}
                            >
                                {point.parentSegmentName}
                            </Paper>
                        )}
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default SnakeTimeline;