import React, { useEffect } from "react";
import { Checkbox, Form, Input, Modal } from "antd";
import { useAppDispatch } from "../config/store";
import { createUser, getUsers, updateUser } from "../reducers/users.reducer";
interface ModalProps {
  // Define your props here
  isModalOpen: boolean;
  handleCancel: () => void;
  user?: Object;
}

const NewUserModal: React.FC<ModalProps> = (props) => {
  //antd form
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const onFinishHandler = (values) => {
    values["actions"] = actions;
    if (props.user) {
      dispatch(updateUser({ data: values, id: props.user["id"] })).then(() => {
        props.handleCancel();
        form.resetFields();
        dispatch(getUsers());
      });
    } else {
      dispatch(createUser(values)).then(() => {
        props.handleCancel();
        form.resetFields();
        dispatch(getUsers());
      });
    }
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

  useEffect(() => {
    form.resetFields();
    if (props.user) {
      form.setFieldsValue({
        firstname: props.user["firstname"],
        lastname: props.user["lastname"],
        email: props.user["email"],
        actions: props.user["actions"],
      });
    }
  }, [props.isModalOpen]);

  return (
    <Modal
      title={"Create User"}
      open={props.isModalOpen}
      onOk={() => {
        form.validateFields().then(() => form.submit());
      }}
      onCancel={() => props.handleCancel()}
      okText={props.user ? "Update" : "Create"}
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
            <Input
              className="rounded-none border-none"
              placeholder="Mohamed"
              defaultValue={props.user ? props.user["firstname"] : ""}
            />
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
              defaultValue={props.user ? props.user["lastname"] : ""}
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
              defaultValue={props.user ? props.user["email"] : ""}
              required
            />
          </div>
        </Form.Item>
        <h1 className="font-bold text-base">Actions</h1>
        <Form.Item name="actions" valuePropName="checked">
          <Checkbox.Group
            onChange={onActionsChange}
            options={options}
            className="flex flex-col gap-2 pl-2 pt-3 "
            defaultValue={props.user ? props.user["actions"] : []}
          ></Checkbox.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default NewUserModal;
