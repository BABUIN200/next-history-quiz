import styles from './LongButton.module.scss';

export const LongButton = ({
    isDisable,
    content,
    id,
    register,
}) => {
    const {
        longButton,
        defaultButton,
        radioButton,
        formRadio,
        longButtonDisabled,
    } = styles;
    return (
        <div
            className={
                formRadio +
                ' ' +
                (isDisable ? longButtonDisabled : longButton) +
                ' ' +
                defaultButton
            }
        >
            <input
                type="radio"
                id={'radio' + id}
                className={radioButton}
                disabled={isDisable}
                value={content}
                {...register('answer')}
            />
            <label htmlFor={'radio' + id}>
                <span>{content}</span>
            </label>
        </div>
    );
};