import React from 'react';
import SGQR from '../assets/images/SGQR.png';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QRCodeModal: React.FC<QRCodeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="qr-modal-overlay" onClick={onClose}>
      <div className="qr-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="qr-modal-close" onClick={onClose}>&times;</button>
        <h2>Scan to Support X Talents</h2>
        <div className="qr-modal-header">
          <div className="qr-code-info">
            <h3>X TALENTS PTE. LTD.</h3>
            <p>22042532471E</p>
            <p>Ver 01.0001</p>
          </div>
        </div>        
        <div className="qr-image-container">
          {/* Note: You'll need to copy the SGQR.png image to this location */}
          <img
            src={SGQR}
            alt="SGQR code for X Talents PTE. LTD. donation, with the SGQR logo in the top left, company name X TALENTS PTE. LTD. in bold above the code, and the text 22042532471E Ver 01.0001 in the top right. The image is designed for making donations to support X Talents in a formal and trustworthy setting."
          />
        </div>
        <div className="qr-modal-instructions">
          <p>Scan this QR code with your banking app to make a donation</p>
          <p><strong>Thank you for your support!</strong></p>
        </div>
      </div>
    </div>
  );
};

export default QRCodeModal;
