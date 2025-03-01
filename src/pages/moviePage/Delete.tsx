import { Button, Modal } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DELETE_MOVIE } from "../../api";
import { toast } from "react-toastify";
import fetchWrapper from "../../api/fetchWrapper";

const Delete = ({
  id,
  name,
}: {
  id: string | undefined;
  name: string | undefined;
}): React.ReactElement => {
  
  const [isVisible, setVisible] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (): Promise<void> => {
    if (!id) {
      toast.error("Movie ID is missing");
      return;
    }

    setLoading(true);

    try {
      const response = await fetchWrapper(`${DELETE_MOVIE}/${id}`, {
        method: "DELETE",
      });

      console.log("Server Response:", response);

      if (response.status === 200) {
        toast.success("Movie deleted successfully");
        navigate("/");
        return;
      }

      if (response.status === 404) {
        const data = await response.json();

        setLoading(false);
        return;
      }

      if (!response.ok) {
        const data = await response.json();
        //throw new Error(data.message || "Failed to delete movie");
      }
    } catch (err) {
      setLoading(false);

      let errorMessage = "An unexpected error occurred";

      if (err instanceof Error) {
        errorMessage = err.message;
      } else if (typeof err === "string") {
        errorMessage = err;
      }

      //toast.error(errorMessage);
    } finally {
      setVisible(false);
    }
  };

  return (
    <>
      <Button onClick={(): void => setVisible(true)} type="primary" danger>
        Remove Movie
      </Button>
      <Modal
        visible={isVisible}
        title="Remove Movie"
        onOk={handleSubmit}
        onCancel={(): void => setVisible(false)}
        footer={[
          <Button key="back" onClick={(): void => setVisible(false)}>
            Return
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={isLoading}
            onClick={handleSubmit}
            danger
          >
            Remove
          </Button>,
        ]}
      >
        <h1 className="font-serif text-2xl font-bold text-center">
          {name || "Unknown Movie"}
        </h1>
      </Modal>
    </>
  );
};

export default Delete;
