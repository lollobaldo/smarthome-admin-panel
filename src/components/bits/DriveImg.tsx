import React, { ImgHTMLAttributes } from 'react';

const DRIVE_URL = 'https://lh3.google.com/u/0/d/';

const driveUrl = (id: string) => `${DRIVE_URL}${id}`;

type DriveImgProps = ImgHTMLAttributes<HTMLImageElement> & {
  driveId: string,
};

const DriveImg = ({ driveId, alt, ...props }: DriveImgProps) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <img  src={driveUrl(driveId)} alt={alt} {...props} />
);

export default DriveImg;
