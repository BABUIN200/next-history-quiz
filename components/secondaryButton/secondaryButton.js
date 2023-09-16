import styles from './SecondaryButton.module.scss';

export const SecondaryButton = ({
    isDisabled = false,
    text,
    type,
    onClick,
}) => {
    const { secondary, defaultBtn, secondaryDisabled } = styles;
    return (
        <button
            type={type ?? 'button'}
            className={
                isDisabled ? secondaryDisabled : defaultBtn + ' ' + secondary
            }
            onClick={onClick}
        >
            {text}
        </button>
    );
};