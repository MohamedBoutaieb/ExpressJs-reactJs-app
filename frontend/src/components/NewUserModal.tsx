import React from "react";
import { Checkbox, Form, Input, Modal } from "antd";
import { useAppDispatch } from "../config/store";
import { createUser, getUsers } from "../reducers/users.reducer";
interface ModalProps {
  // Define your props here
  isModalOpen: boolean;
  handleCancel: () => void;
}

const NewUserModal: React.FC<ModalProps> = (props) => {
  //antd form
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  const onFinishHandler = (values) => {
    values["actions"] = actions;
    dispatch(createUser(values)).then(() => {
      form.resetFields();
      props.handleCancel();
      dispatch(getUsers());
    });
  };
  const options = [
    { label: "Create Item", value: "create-item" },
    { label: "Delete Item", value: "delete-item" },
    { label: "View Item", value: "view-item" },
    { label: "Move Item", value: "move-item" },
  ];
  const [actions, setActions] = React.useState([]);
  const onActionsChange = (checkedValues) => {
    setActions(checkedValues);
  };
  return (
    <Modal
      title={"Create User"}
      open={props.isModalOpen}
      onOk={() => {
        form.validateFields().then(() => form.submit());
      }}
      onCancel={() => props.handleCancel()}
      okText="Create"
      cancelText="Cancel"
    >
      <Form form={form} onFinish={(values) => onFinishHandler(values)}>
        <Form.Item
          name="firstname"
          rules={[{ required: true, message: "Please input your firstname!" }]}
        >
          <div className="w-full flex items-center border-gray-300 border-[1px] ">
            <div
              className="bg-[#EDF2F7] py-1 border-r-gray-300 border-[1px]  leading-6 text-xs text-center w-[72px]"
              style={{ height: "100%" }}
            >
              Firstname
            </div>{" "}
            <Input className="rounded-none border-none" placeholder="Mohamed" />
          </div>
        </Form.Item>
        <Form.Item
          name="lastname"
          rules={[{ required: true, message: "Please input your lastname!" }]}
        >
          <div className="w-full flex items-center border-gray-300 border-[1px] ">
            <div
              className="bg-[#EDF2F7] py-1 border-r-gray-300 border-[1px]  leading-6 text-xs text-center  w-[72px]"
              style={{ height: "100%" }}
            >
              Lastname
            </div>{" "}
            <Input
              className="rounded-none border-none"
              placeholder="Boutaieb"
            />
          </div>
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Please input a valid email!",
            },
          ]}
        >
          <div className="w-full flex items-center border-gray-300 border-[1px] ">
            <div
              className="bg-[#EDF2F7] py-1 border-r-gray-300 font-normal border-[1px]  leading-6 text-xs  text-center w-[72px]"
              style={{ height: "100%" }}
            >
              E-mail
            </div>{" "}
            <Input
              className="rounded-none border-none"
              type="email"
              placeholder="john@mail.com"
              required
            />
          </div>
        </Form.Item>
        <Form.Item name="actions" valuePropName="checked">
          <h1 className="font-bold text-base">Actions</h1>
          <Checkbox.Group
            onChange={onActionsChange}
            options={options}
            className="flex flex-col gap-2 pl-2 pt-3 "
          ></Checkbox.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default NewUserModal;
