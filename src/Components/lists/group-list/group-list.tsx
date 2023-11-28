import { useNavigate } from "react-router-dom";
import { Group } from "../../../Classes/group/group";
import { GroupButton } from "../../../AComponents/buttons/group-button/group-button";

import "./group-list.css";

type groupListType = {
  groupList: Group[];
  onClick: () => void;
};

export function GroupList({ groupList, onClick }: groupListType) {
  const navigate = useNavigate();

  return (
    <div className='group-list' onClick={onClick}>
      {groupList.map((group) => {
        return <GroupButton group={group} onClick={() => navigate(`/group/${group.getId()}`)} />;
      })}
    </div>
  );
}