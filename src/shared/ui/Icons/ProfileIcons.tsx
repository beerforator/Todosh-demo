import React from 'react';

export const SimpleRadioButtonIconUnchecked = (props: React.SVGProps<SVGSVGElement>) => {
    return (
        <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M7 17H15C18.3137 17 21 14.3137 21 11C21 7.68629 18.3137 5 15 5H7C3.68629 5 1 7.68629 1 11C1 14.3137 3.68629 17 7 17Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M7 8C5.34315 8 4 9.34315 4 11C4 12.6569 5.34315 14 7 14C8.65685 14 10 12.6569 10 11C10 9.34315 8.65685 8 7 8Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export const SimpleRadioButtonIconChecked = (props: React.SVGProps<SVGSVGElement>) => {
    return (
        <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M15 14C16.6569 14 18 12.6569 18 11C18 9.34315 16.6569 8 15 8C13.3431 8 12 9.34315 12 11C12 12.6569 13.3431 14 15 14Z" 
                fill="currentColor"
            />
            <path
                d="M15 5L7 5C3.68629 5 1 7.68629 1 11C1 14.3137 3.68629 17 7 17L15 17C18.3137 17 21 14.3137 21 11C21 7.68629 18.3137 5 15 5Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M15 14C16.6569 14 18 12.6569 18 11C18 9.34315 16.6569 8 15 8C13.3431 8 12 9.34315 12 11C12 12.6569 13.3431 14 15 14Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};