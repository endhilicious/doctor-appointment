import React, { useEffect, useState } from 'react';
import styles from './DoctorView.module.scss';
import { DoctorProfile } from '#/components/DoctorProfile';
import { useRouter } from 'next/router';
// import { getDataById } from '#/firebase/DoctorService';
import { useLoading } from '#/context/useLoading';
import { getDataById, getDataByMultipleField } from '#/firebase/firebaseService';
import { useAuth } from '#/context/useAuth';

const DoctorView: React.FC = () => {
  const router = useRouter();
  const { accessToken } = useAuth();
  const [doctor, setDoctor] = useState<any>({});
  const { isLoading, setLoading } = useLoading();
  const { id } = router.query;

  useEffect(() => {
    if (id) fetchDoctorList(id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const fetchDoctorList = async (id: any) => {
    try {
      setLoading(true);
      const doctor = await getDataById(id, 'doctor')
      const searchSlotByUserAndDoctor = {
        userId: accessToken,
        doctorId: id
      }
      const getSelectedSlot = await getDataByMultipleField(searchSlotByUserAndDoctor, 'booking')
      setDoctor({...doctor, currentTimeSlot: getSelectedSlot[0]?.timeSlot || [], idBooking: getSelectedSlot[0]?.id } as any)
    } catch (error) {
      console.log('error', error)
    } finally {
      setLoading(false);
    }
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!doctor) {
    return <div>Doctor not found</div>;
  }

  return (
    <div className={styles.DoctorView}>
      <DoctorProfile
        {...doctor}
        currentSlot={doctor.currentTimeSlot?.map?.((data: any) => Number(data))}
      />
    </div>
  );
};

export default DoctorView;
