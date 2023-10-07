import React, { useState, useEffect } from 'react';

function Modal({ isOpen, closeModal, content }) {
  const [isVisible, setIsVisible] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      const closeModalHandler = () => {
        setIsVisible(false);
        closeModal();
      };

      const modal = document.getElementById('myModal');
      const close = modal.getElementsByClassName('close')[0];

      modal.style.display = 'block';
      const modalText = modal.querySelector('#modalText');
      modalText.textContent = content;

      close.onclick = closeModalHandler;

      window.onclick = function (event) {
        if (event.target === modal) {
          closeModalHandler();
        }
      };
    }
  }, [isOpen, content, closeModal]);

  return (
    isVisible && (
      <div className="modal" id="myModal">
        <div className="modal-content">
          <span className="close">&times;</span>
          <p id="modalText">{content}</p>
        </div>
      </div>
    )
  );
}

export default Modal;
