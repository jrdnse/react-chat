import React from 'react';

const inputDivStyle = {
  float: 'left'
};

const inpStyle = {
  borderRadius: '25px',
  height: '30px',
  padding: '0 20px',
  fontSize: '15px',
  fontWeight: 'bold',
  lineHeight: '1.5',
  color: 'black',
  border: 'none',
  marginBottom: '20px'
};

const btnStyle = {
  height: '30px',
  borderRadius: '25px',
  marginLeft: '5px',
  backgroundColor: '#D3D3D3',
  border: 'none'
};

export default function ChatUI(props) {
  const { onSubmit, value, onChange, btnStatus } = props;
  return (
    <form onSubmit={onSubmit} className="chatui">
      <div style={inputDivStyle}>
        <input
          style={inpStyle}
          type="text"
          placeholder="Enter your message"
          value={value}
          onChange={onChange}
          required
        />
      </div>
      <button style={btnStyle} type="submit" disabled={btnStatus}>
        <svg
          id="i-send"
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
          <path d="M2 16 L30 2 16 30 12 20 Z M30 2 L12 20" />
        </svg>
      </button>
    </form>
  );
}
