import React from 'react';
import AppointmentView from '#/view/AppointmentView/AppointmentView';
import HomeLayout from '#/layouts/HomeLayout';

const AppointmentPage = () => {
  return (
    <AppointmentView />
  );
};

export default AppointmentPage;

AppointmentPage.layout = HomeLayout;
