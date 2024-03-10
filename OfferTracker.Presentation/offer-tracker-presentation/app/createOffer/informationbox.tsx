function InformationBox({ content }: { content: string }) {
    return (
        <span
            className="info-icon"
            data-tooltip-place="bottom"
            data-tooltip-content={content}
            data-tooltip-id="mode-tooltip"
        >
            ℹ️
        </span>
    );
};

export default InformationBox;
