import { Form, Modal, Select } from "antd";
import React from "react";
import { useAppDispatch } from "../config/store";
import { runAction } from "../reducers/users.reducer";
import { toast } from "react-toastify";

interface RunActionModalProps {
  // Define your component props here
  isModalOpen: boolean;
  handleCancel: () => void;
  user: Object;
}

const RunActionModal: React.FC<RunActionModalProps> = (props) => {
  // Add your component logic here
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const onFinishHandler = (values) => {
    dispatch(runAction({ action: values.action, id: props.user["id"] })).then(
      () => {
        props.handleCancel();
      }
    );
  };
  const options = [
    { label: "Create Item", value: "create-item" },
    { label: "Delete Item", value: "delete-item" },
    { label: "View Item", value: "view-item" },
    { label: "Move Item", value: "move-item" },
  ];

  return (
    <Modal
      title={"Run action"}
      open={props.isModalOpen}
      okText="Run Action"
      onCancel={props.handleCancel}
      onOk={() => {
        form.validateFields().then(() => form.submit());
      }}
    >
      <Form
        form={form}
        onFinish={onFinishHandler}
        className="py-6 flex flex-col gap-5"
      >
        <h1 className="font-semibold">Action</h1>
        <Form.Item name="action" rules={[{ required: true }]}>
          <Select options={options}></Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default RunActionModal;
