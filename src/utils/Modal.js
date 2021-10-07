import React, { useEffect, useRef } from 'react';
import styles from './modal.module.css';

function useOutsideAlerter(ref, onClose) {
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                onClose()
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}

const Modal = ({ modalStyle, children, show, onClose, backdropStyle }) => {
    const modalRef = useRef(null);
    const insideModalRef = useRef(null);
    useOutsideAlerter(insideModalRef, onClose);
    useEffect(
        () => {
            if (show) {
                modalRef.current.classList.add(styles.visible);
            }
            else {
                modalRef.current.classList.remove(styles.visible);
            }
        },
        [
            show
        ]
    );
    return (
        <React.Fragment>
            <div ref={modalRef} style={backdropStyle} className={`${styles.modal__wrap}`}>
                <div ref={insideModalRef} style={modalStyle} className={styles.modal}>
                    {children}
                </div>
            </div>
        </React.Fragment>
    );
};

export default Modal;