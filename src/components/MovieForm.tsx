import React, { useEffect, useState } from "react";
import { Button, DatePicker, Form, Input, Modal, Typography } from "antd";
import FormDataType from "../types/FormData";
import moment, { Moment } from "moment";
import Uploader from "./Uploader";
import fetchWrapper from "../api/fetchWrapper";
import { toast } from "react-toastify";

interface Error {
  name: string;
  description: string;
  released_year: string;
  poster: string;
}

const MovieForm = ({
  setSearchValue,
  setReleasedYear,
  title,
  initialFormData,
  id,
  apiURL,
  className,
  refresh,
  isEdit = false,
}: {
  setSearchValue?: (value: string | undefined) => void;
  setReleasedYear?: (value: number | undefined) => void;
  title: string;
  initialFormData?: {
    name: string;
    description: string;
    released_year: number;
  };
  id?: string;
  apiURL: string;
  className?: string;
  refresh?: () => void;
  isEdit?: boolean;
}): React.ReactElement => {
  const [isVisible, setVisible] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    description: "",
    released_year: undefined,
  });
  const [posterFile, setPosterFile] = useState<File>();
  const [errors, setErrors] = useState<Error>({
    name: "",
    description: "",
    released_year: "",
    poster: "",
  });

  useEffect(() => {
    if (initialFormData) setFormData(initialFormData);
  }, [initialFormData]);

  const handleSubmit = async (): Promise<void> => {
    const newErrors: Error = {
      name: "",
      description: "",
      released_year: "",
      poster: "",
    };

    if (!formData.name) newErrors.name = "Name is required!";
    if (!formData.description)
      newErrors.description = "Description is required!";
    if (!formData.released_year)
      newErrors.released_year = "Released year is required!";

    setErrors(newErrors);

    if (formData.name && formData.description && formData.released_year) {
      setLoading(true);

      const requestBody = {
        name: formData.name,
        description: formData.description,
        releasedYear: formData.released_year,
        poster: posterFile ? await toBase64(posterFile) : undefined,
        id: id,
      };

      try {
        if (!isEdit) {
          const response = await fetchWrapper(apiURL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
          });

          toast(response.data);
        } else {
          const response = await fetchWrapper(apiURL, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
          });

          toast(response.data);
        }
        setLoading(false);
        setVisible(false);
        if (setSearchValue) setSearchValue("");
        if (setReleasedYear) setReleasedYear(undefined);
        if (refresh) refresh();
        setFormData({
          name: "",
          description: "",
          released_year: undefined,
        });
        setPosterFile(undefined);
      } catch (error) {
        toast.error("An error occurred while submitting the form.");
        setLoading(false);
      }
    }
  };

  const toBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const onCancel = (): void => {
    setVisible(false);
    if (!refresh) {
      setFormData({
        name: "",
        description: "",
        released_year: undefined,
      });
    }
    setPosterFile(undefined);
    setErrors({
      name: "",
      description: "",
      released_year: "",
      poster: "",
    });
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (!value) {
      setErrors({
        ...errors,
        [name]: `${name
          .charAt(0)
          .toUpperCase()
          .concat(name.slice(1))} is required!`,
      });
    } else {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  return (
    <>
      <Button
        type="primary"
        className={className}
        onClick={(): void => setVisible(true)}
      >
        {title}
      </Button>
      <Modal
        open={isVisible}
        title={title}
        onOk={handleSubmit}
        onCancel={onCancel}
        footer={[
          <Button key="back" onClick={onCancel}>
            Return
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={isLoading}
            onClick={handleSubmit}
          >
            Submit
          </Button>,
        ]}
      >
        <Form
          className="w-full"
          name="form"
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <Input
            placeholder="Name*"
            value={formData?.name}
            onChange={onChange}
            name="name"
          />
          {errors?.name && (
            <Typography.Text type={"danger"}>{errors.name}</Typography.Text>
          )}
          <Input.TextArea
            placeholder="Description*"
            value={formData?.description}
            onChange={onChange}
            name="description"
            className="mt-1"
          />
          {errors?.description && (
            <Typography.Text type={"danger"}>
              {errors.description}
            </Typography.Text>
          )}
          <DatePicker
            picker={"year"}
            placeholder="Released Year*"
            className="w-full mt-1"
            name="releasedYear"
            value={
              formData?.released_year
                ? moment().set("year", formData.released_year)
                : undefined
            }
            onChange={(e: Moment | null): void => {
              setFormData({ ...formData, released_year: e?.year() });
              if (!e || !e.year()) {
                setErrors({
                  ...errors,
                  released_year: "Released year is required!",
                });
              } else {
                setErrors({
                  ...errors,
                  released_year: "",
                });
              }
            }}
          />
          {errors?.released_year && (
            <Typography.Text type={"danger"}>
              {errors.released_year}
            </Typography.Text>
          )}
          <Uploader
            className="mt-1"
            setFile={setPosterFile}
            title={"Upload poster"}
            onChange={(): void => {
              if (posterFile) setErrors({ ...errors, poster: "" });
            }}
          />
          {errors.poster && (
            <Typography.Text type={"danger"}>{errors.poster}</Typography.Text>
          )}
        </Form>
      </Modal>
    </>
  );
};

export default MovieForm;
