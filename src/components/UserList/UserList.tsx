import React, { useRef, useCallback, useEffect } from "react";

import Spinner from "../Spinner/Spinner";
import "./UserList.css";
import useUploadUsers from "../../shared/hooks/useUploadUsers";

const UserList: React.FC = () => {
  const { users, loading, error, hasMore, setPage } = useUploadUsers();

  const observer = useRef<IntersectionObserver | null>(null);

  const lastUserRef = useCallback(
    (node: HTMLElement | null) => {
      if (loading || !node) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      observer.current.observe(node);
    },
    [loading, hasMore, setPage]
  );

  useEffect(() => {
    return () => observer.current?.disconnect();
  }, []);
  console.log("UsersList");

  return (
    <div className="user-list-container">
      <h2 className="title">Users</h2>
      <ul className="user-list">
        {users.map((user) => (
          <li key={user.id} ref={lastUserRef} className="user-item">
            <img
              src={user.avatar}
              alt={`${user.first_name} avatar`}
              aria-label={`${user.first_name} ${user.last_name}`}
            />
            <p>
              {user.first_name} {user.last_name}
            </p>
          </li>
        ))}
      </ul>
      {loading && <Spinner />}
      {!hasMore && <p className="end-text">There are no more users.</p>}
      {error && <p className="error-text">Error: {error}</p>}
    </div>
  );
};

export default UserList;
