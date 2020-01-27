import React, { useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import useGetUsers from "../../services/Admin/useGetUsers";
import useSetMod from "../../services/Admin/useSetMod";
import Button from "../shared/components/Button";

const Users = ({ back }) => {
  const [getUsers, { data }] = useGetUsers();
  const [setMod] = useSetMod();

  const users = data || [];

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const toggleMod = useCallback(
    user => async () => {
      try {
        await setMod({ id: user.id, isMod: !user.is_moderator });
        toast.success("Sukces!");
        getUsers();
      } catch (e) {
        toast.error(e.toString());
      }
    },
    [getUsers, setMod],
  );

  return (
    <>
      <Link onClick={back}>Cofnij</Link>
      <h3>Zarządzanie moderatorami</h3>

      {users
        .filter(u => !u.is_admin)
        .map((user, i) => (
          <div key={i} style={{ marginBottom: 10 }}>
            <Button style={{ width: 200 }} onClick={toggleMod(user)}>
              {user.is_moderator ? "Odbierz uprawnienia" : "Nadaj uprawnienia"}
            </Button>
            <span style={{ marginLeft: 20, marginRight: 10 }}>
              <b>{user.id}</b>
            </span>
            <span style={{ marginLeft: 20, marginRight: 10 }}>
              <b>{user.email}</b>
            </span>
          </div>
        ))}
    </>
  );
};

export default Users;
