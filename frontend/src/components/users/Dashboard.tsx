import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../config/store";
import { deleteUser, getUsers } from "../../reducers/users.reducer";
import { Table } from "antd";
import GenericButton from "../GenericButton";
import NewUserModal from "../NewUserModal";
import RunActionModal from "../RunActionModal";

interface DashboardProps {
  // Define your component props here
}

const Dashboard: React.FC<DashboardProps> = () => {
  // Add your component logic here
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.usersReducer.usersList);
  const { pages, totalItems } = useAppSelector((state) => state.usersReducer);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showRunActionModal, setShowRunActionModal] = useState(false);
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
  const [page, setPage] = useState(1);
  const [user, setUser] = useState(null);
  const handleDelete = (id: number) => {
    dispatch(deleteUser(id)).then(() => dispatch(getUsers(page)));
  };
  const handleUpdate = (user: any) => {
    setUser(user);
    setShowCreateModal(true);
  };
  const handleRunAction = (user: any) => {
    setShowRunActionModal(true);
    setUser(user);
  };
  useEffect(() => {
    dispatch(getUsers(page));
  }, []);
  return (
    <div className="w-full h-full flex-col flex gap-14 px-60 py-20">
      <div className="header flex w-full items-center justify-between">
        <h1 className="text-3xl font-bold">Users</h1>{" "}
        <button
          className="text-white bg-[#319795]
          px-6 rounded-md text-lg font-semibold h-7"
          onClick={() => {
            setUser(null);
            setShowCreateModal(true);
          }}
        >
          Create
        </button>
      </div>

      <Table
        columns={columns}
        bordered={true}
        pagination={{
          onChange(page) {
            dispatch(getUsers(page));
            setPage(page);
          },

          pageSize: 3,
          total: totalItems,
          current: page,
        }}
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
                  onClick={() => handleUpdate(user)}
                />{" "}
                <GenericButton
                  mode="danger"
                  text="Delete"
                  onClick={() => handleDelete(user.id)}
                />
                <GenericButton
                  mode="success"
                  text="Run action"
                  onClick={() => handleRunAction(user)}
                />
              </div>
            ),
          };
        })}
      ></Table>
      <NewUserModal
       
        isModalOpen={showCreateModal}
        handleCancel={() => setShowCreateModal(false)}
        user={user}
        page={page}
      ></NewUserModal>
      <RunActionModal
        isModalOpen={showRunActionModal}
        handleCancel={() => setShowRunActionModal(false)}
        user={user}
      ></RunActionModal>
    </div>
  );
};

export default Dashboard;
