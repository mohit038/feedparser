import React from "react";

import { Book, X } from "react-feather";
import { useFeedStore } from "../contexts/FeedStoreContext";
import { iconColor } from "../utils/constants";
import { Folder } from "../utils/emuns";

interface PublicationOptionProps {
  publicationLink: String;
  active: boolean;
}

function url_domain(data: String) {
  var a = document.createElement("a");
  a.href = data as string;
  return a.hostname;
}

export const PublicationOption: React.FC<PublicationOptionProps> = ({
  publicationLink,
  active,
}: PublicationOptionProps) => {
  const { dispatch } = useFeedStore();
  const removeLink = () => {
    dispatch({ type: "setActiveFolder", payload: Folder.ALL });
    dispatch({ type: "setActiveCategory", payload: null });
    dispatch({ type: "removePublisher", payload: publicationLink });
  };
  const handleClick = () => {
    dispatch({ type: "setActiveFolder", payload: Folder.PUBLISHER });
    dispatch({ type: "setActiveCategory", payload: null });
    dispatch({ type: "setActivePublisher", payload: publicationLink });
  };
  return (
    <div
      className={active ? "category-list-each active" : "category-list-each"}
      onClick={handleClick}
    >
      <Book size={18} className="app-sidebar-icon" color={iconColor} />
      {url_domain(publicationLink)}
      <div onClick={removeLink}>
        <X size={15} className="context-menu-action" />
      </div>
    </div>
  );
};
