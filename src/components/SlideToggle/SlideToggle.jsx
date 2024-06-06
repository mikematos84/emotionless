import { css } from '@emotion/react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

const Container = styled.span`
  display: flex;
  width: 4rem;
  height: 2rem;
  border-radius: 1rem;
  position: relative;
  cursor: pointer;
  overflow: hidden;
`;

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: var(--colors-background-secondary);
  display: flex;
  align-items: center;
  justify-content: space-around;
  transition: background-color 0.2s ease-in-out;

  ${({ isOn }) =>
    isOn &&
    css`
      background-color: var(--colors-background-secondary);
    `}

  > svg {
    width: 1.5rem;
    height: 1.5rem;
    color: var(--colors-background-tertiary);
  }
`;

const ToggleButton = styled.span`
  position: absolute;
  display: flex;
  border-radius: 1rem;
  width: 2rem;
  height: 2rem;
  background-color: var(--colors-buttons-background-primary);
  transition: transform 0.2s ease-in-out;
  transform: translateX(0) scale(0.75);

  ${({ isOn }) =>
    isOn &&
    css`
      transform: translateX(100%) scale(0.75);
    `}
`;

const SlideToggle = ({
  isOn: initialValue = false,
  onToggleChange = isOn => {},
  icons: { SlideToggleOn, SlideToggleOff, SlideToggleButton } = {}
}) => {
  const [isOn, setIsOn] = useState(initialValue);

  const handleClick = () => {
    setIsOn(prev => {
      const next = !prev;
      onToggleChange(next);
      return next;
    });
  };

  return (
    <Container onClick={handleClick} data-testid="slide-toggle">
      <Background isOn={isOn}>
        {SlideToggleOff && <SlideToggleOff />}
        {SlideToggleOn && <SlideToggleOn />}
      </Background>
      <ToggleButton isOn={isOn}>
        {SlideToggleButton && <SlideToggleButton />}
      </ToggleButton>
    </Container>
  );
};

SlideToggle.propTypes = {
  icons: PropTypes.shape({
    SlideToggleButton: PropTypes.elementType,
    SlideToggleOff: PropTypes.elementType,
    SlideToggleOn: PropTypes.elementType
  }),
  isOn: PropTypes.bool,
  onToggleChange: PropTypes.func
};

export default SlideToggle;
