import { ItemButton } from "../item-button/item-button";
import "./dual-button.css";

type DoubleButtonType = {
  leftButton: {
    title?: string;
    subtitle?: string;
  };
  title: string;
  subtitle?: string;
  select?: boolean;
  onClick?: () => void;
};

export function DualButton({ leftButton, title, subtitle, select, onClick }: DoubleButtonType) {
  return (
    <div className='dual-button' onClick={onClick}>
      <div className={"db-left-button" + (select ? "-selected" : "")}>
        <p className='dblb-title'>{leftButton.title}</p>
        <p className='dblb-subtitle'>{leftButton.subtitle}</p>
      </div>
      <ItemButton title={title} subtitle={subtitle} select={select} />
    </div>
  );
}
