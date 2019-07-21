import React from 'react';

const inputDivStyle = { float: 'left' };

const inpStyle = {
  display: 'block',
  marginTop: '5px',
  marginBottom: '20px',
  borderRadius: '25px',
  height: '30px',
  padding: '0 20px',
  fontSize: '15px',
  fontWeight: 'bold',
  lineHeight: '1.5',
  color: 'black',
  border: 'none'
};

const btnStyle = {
  height: '30px',
  borderRadius: '25px',
  marginLeft: '10px',
  marginTop: '5px',
  marginBottom: '20px',
  backgroundColor: '#D3D3D3',
  border: 'none'
};

export default function UsernamePrompt(props) {
  const { onSubmit, value, onChange } = props;
  return (
    <form onSubmit={onSubmit} className="username">
      <div style={inputDivStyle}>
        <input
          style={inpStyle}
          name="username-field"
          type="text"
          placeholder="Enter your username"
          value={value}
          onChange={onChange}
          required
        />
      </div>
      <button style={btnStyle} type="submit">
        <svg
          id="i-arrow-right"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          width="28"
          height="28"
          fill="none"
          stroke="currentcolor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
        >
          <path d="M22 6 L30 16 22 26 M30 16 L2 16" />
        </svg>
      </button>
    </form>
  );
}
