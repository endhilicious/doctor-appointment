import React from 'react';
import DoctorView from '#/view/DoctorView/DoctorView';
import HomeLayout from '#/layouts/HomeLayout';

const ProfilePage = () => {
  return <DoctorView />
};

export default ProfilePage;

ProfilePage.layout = HomeLayout;
