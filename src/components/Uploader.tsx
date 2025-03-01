import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
import React from 'react';

const Uploader = ({
  setFile,
  title,
  className,
  onChange,
  defaultFileURL,
  defaultFileName,
}: {
  setFile: (file: File | undefined) => void;
  title: string;
  className?: string;
  onChange: () => void;
  defaultFileURL?: string;
  defaultFileName?: string;
}): React.ReactElement => {
  return (
    <div className={className}>
      <Upload
        accept=".jpg,.png,.jpeg"
        listType="picture"
        maxCount={1}
        beforeUpload={(file: File): boolean => {
          setFile(file);
          return false;
        }}
        onRemove={(file: unknown): boolean => {
          setFile(undefined);
          return true;
        }}
        onChange={onChange}
        defaultFileList={
          defaultFileName
            ? [
                {
                  uid: '1',
                  url: defaultFileURL,
                  name: defaultFileName ? defaultFileName : '',
                },
              ]
            : undefined
        }
      >
        <Button icon={<UploadOutlined />}>{title}</Button>
      </Upload>
    </div>
  );
};

export default Uploader;
