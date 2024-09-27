interface ToolTipProps extends React.SVGProps<SVGSVGElement> {
    iconColor?: string;
    iconWidth?: string;
    iconHeight?: string;
}
//@ts-ignore
const ToolTip: React.FC<ToolTipProps> = ({iconColor, iconWidth, iconHeight, ...props}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 21"
            width={iconWidth || "20px"}
            height={iconHeight || "15px"}
            {...props}
        >
            <g fill="none" fillRule="evenodd">
                <path d="M-2-1h24v23.593H-2z"/>
                <path
                    id="Group"
                    fill={iconColor || "#B0BAC8"}
                    fillRule="nonzero"
                    d="M9 15.712h2V9.814H9v5.898zM10 .966c-5.52 0-10 4.404-10 9.83 0 5.427 4.48 9.83 10 9.83s10-4.403 10-9.83c0-5.426-4.48-9.83-10-9.83zm0 17.695c-4.41 0-8-3.53-8-7.863 0-4.336 3.59-7.865 8-7.865s8 3.53 8 7.865c0 4.335-3.59 7.864-8 7.864zM9 7.848h2V5.88H9v1.967z"
                />
            </g>
        </svg>
    );
}

export default ToolTip;
