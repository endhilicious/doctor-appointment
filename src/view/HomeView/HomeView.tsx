import React, { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { Card } from '#/components/Card';

import styles from './HomeView.module.scss';
import { useLoading } from '#/context/useLoading';
import Loading from '#/common/Loading/Loading';
import { getAllData } from '#/firebase/firebaseService';

const HomeView: React.FC<any> = () => {
  const router = useRouter();
  const [doctorData, setDoctorData] = useState<any>([]);
  const { isLoading } = useLoading();

  const handleCardClick = (doctorId: number) => {
    router.push(`/doctor/${doctorId}`);
  };

  useEffect(() => {
    fetchDoctorData();
  }, []);

  const fetchDoctorData = async () => {
    try {
      const docktorData = await getAllData('doctor');
      setDoctorData(docktorData);
    } catch (error) {
      console.log('error')
    }
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.cardContainer}>
        {doctorData?.map((doctor: any, i: any) => (
            <Fragment key={i}>
              <Card
                onClick={() => handleCardClick(doctor.id)}
              >
                <h3 className={styles.name}>{doctor.name}</h3>
                <p className={styles.speciality}>{doctor.speciality}</p>
                <p className={styles.price}>Price: ${doctor.price}</p>
                <div className={styles.rating}>
                  {Array.from({ length: doctor.rating }, (_, index) => (
                    <span key={index} className={styles.star}>&#9733;</span>
                  ))}
                </div>
              </Card>
            </Fragment>
          ))}
      </div>
    </div>
  );
};

export default HomeView;
