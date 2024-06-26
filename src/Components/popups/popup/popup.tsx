import { redClose } from "../../../_global";
import "./popup.css";

type PopupType = {
  title: string;
  text: string;
  display?: boolean;
  onClickExit: () => void;
  buttons: {
    title: string;
    onClick: () => void;
  }[];
};

export function Popup({ title, text, display, onClickExit, buttons }: PopupType) {
  return (
    <>
      <div className={`blur ${!display ? "hidden" : ""}`} onClick={onClickExit} />
      <div className={`popup ${!display ? "hidden" : ""}`}>
        <p className='p-title'>{title}</p>
        <p className='p-text'>{text}</p>
        <div className='p-button-list'>
          {buttons.map((button, index) => {
            return (
              <p key={index} className='p-button' onClick={button.onClick}>
                {button.title}
              </p>
            );
          })}
        </div>
        <img className='p-exit' alt={title} src={redClose} onClick={onClickExit} />
      </div>
    </>
  );
}
