import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../config/store";
import { deleteUser, getUsers } from "../../reducers/users.reducer";
import { Table } from "antd";
import GenericButton from "../GenericButton";

interface DashboardProps {
  // Define your component props here
}

const Dashboard: React.FC<DashboardProps> = () => {
  // Add your component logic here
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.usersReducer.usersList);
  useEffect(() => {
    dispatch(getUsers());
  }, []);
  const columns = [
    {
      title: "Name",
      dataIndex: "1",
      key: "name",
    },
    // email
    {
      title: "Email",
      dataIndex: "2",
      key: "email",
    },
    // role
    {
      title: <div className="w-full text-right">Actions</div>,
      dataIndex: "3",
      key: "role",
    },
  ];

  const handleDelete = (id: number) => {
    dispatch(deleteUser(id)).then(() => dispatch(getUsers()));
  };
  return (
    <div className="w-full h-full flex-col flex gap-14 px-60 py-20">
      <div className="header flex w-full items-center justify-between">
        <h1 className="text-3xl font-bold">Users</h1>{" "}
        <button
          className="text-white bg-[#319795]
          px-6 rounded-md text-lg font-semibold h-7"
        >
          Create
        </button>
      </div>

      <Table
        columns={columns}
        bordered={true}
        dataSource={users.map((user) => {
          return {
            key: user.id,
            1: user.firstname + " " + user.lastname,
            2: user.email,
            3: (
              <div className="w-full flex justify-end gap-2">
                {" "}
                <GenericButton
                  mode="info"
                  text="Edit"
                  onClick={() => {}}
                />{" "}
                <GenericButton
                  mode="danger"
                  text="Delete"
                  onClick={() => handleDelete(user.id)}
                />
                <GenericButton
                  mode="success"
                  text="Run action"
                  onClick={() => {}}
                />
              </div>
            ),
          };
        })}
      ></Table>
    </div>
  );
};

export default Dashboard;
