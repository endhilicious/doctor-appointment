import React, { useEffect, useState } from 'react';
import HomeLayout from '#/layouts/HomeLayout';
import HomeView from '#/view/HomeView';

export default function HomePage() {
  return <HomeView />
};

HomePage.layout = HomeLayout;
