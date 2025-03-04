import * as React from 'react';
import { useState } from 'react';
import {
  GaugeContainer,
  GaugeValueArc,
  GaugeReferenceArc,
  useGaugeState,
} from '@mui/x-charts/Gauge';

function GaugePointer() {
  const { valueAngle, outerRadius, cx, cy, value } = useGaugeState();

  if (valueAngle === null) {
    // No value to display
    return null;
  }

  const target = {
    x: cx + outerRadius * Math.sin(valueAngle),
    y: cy - outerRadius * Math.cos(valueAngle),
  };

  const pointerColor = value < 30 ? 'green' : value < 70 ? 'orange' : 'red';

  return (
    <g>
      <circle cx={cx} cy={cy} r={5} fill={pointerColor} />
      <path
        d={`M ${cx} ${cy} L ${target.x} ${target.y}`}
        stroke={pointerColor}
        strokeWidth={3}
      />
      <text x={cx} y={cy + 20} textAnchor="middle" fill="black" fontSize={16}>
        {value}
      </text>
    </g>
  );
}

function GaugeComponent({ title, value, onIncrement, onDecrement, onReset }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div className={title} style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <h1>{title}</h1>
      </div>
      <GaugeContainer
        width={200}
        height={200}
        startAngle={-110}
        endAngle={110}
        value={value}
        style={{ margin: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}
      >
        <GaugeReferenceArc />
        <GaugeValueArc />
        <GaugePointer />
      </GaugeContainer>
      <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between', width: '200px' }}>
        <button onClick={onDecrement}>Decrement</button>
        <button onClick={onIncrement}>Increment</button>
        <button onClick={onReset}>Reset</button>
      </div>
    </div>
  );
}

export default function CompositionExample() {
  const [caloriesValue, setCaloriesValue] = useState(0);
  const [stepsValue, setStepsValue] = useState(0);

  const handleIncrementCalories = () => {
    setCaloriesValue((prevValue) => (prevValue < 100 ? prevValue + 10 : prevValue));
  };

  const handleDecrementCalories = () => {
    setCaloriesValue((prevValue) => (prevValue > 0 ? prevValue - 10 : prevValue));
  };

  const handleResetCalories = () => {
    setCaloriesValue(0);
  };

  const handleIncrementSteps = () => {
    setStepsValue((prevValue) => (prevValue < 100 ? prevValue + 10 : prevValue));
  };

  const handleDecrementSteps = () => {
    setStepsValue((prevValue) => (prevValue > 0 ? prevValue - 10 : prevValue));
  };

  const handleResetSteps = () => {
    setStepsValue(0);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      <GaugeComponent
        title="Calories"
        value={caloriesValue}
        onIncrement={handleIncrementCalories}
        onDecrement={handleDecrementCalories}
        onReset={handleResetCalories}
      />
      <GaugeComponent
        title="Steps"
        value={stepsValue}
        onIncrement={handleIncrementSteps}
        onDecrement={handleDecrementSteps}
        onReset={handleResetSteps}
      />
    </div>
  );
}
