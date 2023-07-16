import React, { useEffect, useState } from 'react';
import styles from './DoctorProfile.module.scss';
import { TimeSlot } from '../TimeSlot';
import { Button } from '#/common/Button';
import Modal from '#/common/Modals/Modals';
import { createData, updateData } from '#/firebase/firebaseService';
import { useLoading } from '#/context/useLoading';
import { useRouter } from 'next/router';
import { useAuth } from '#/context/useAuth';

type DoctorProfileProps = {
  id?: string;
  name: string;
  speciality: string;
  price: number;
  rating: number;
  timeSlots: number[];
  currentSlot?: number[];
  idBooking?: string;
};

const TIME_SLOT: { [key: string]: string } = {
  1: '14.00',
  2: '14.30',
  3: '15.00',
  4: '15.30',
  5: '16.00',
  6: '16.30',
  7: '17.30'
}

const DoctorProfile: React.FC<DoctorProfileProps> = (props) => {
  const router = useRouter();
  const { accessToken } = useAuth();
  const { setLoading } = useLoading();

  const { currentSlot = [], ...doctorData } = props;
  const { id, name, speciality, price, rating, timeSlots, idBooking } = doctorData;

  const [selectedSlot, setSelectedSlot] = useState<any>([]);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  console.log('accessToken', accessToken)

  useEffect(() => {
    if (currentSlot?.length > 0) {
      setSelectedSlot(currentSlot.map(data => Number(data)));
    }
  }, [currentSlot])

  const handleTimeSlotClick = (slot: any) => {
    let newSlot = [...selectedSlot];

    if (selectedSlot.includes(Number(slot))) {
      newSlot = newSlot.map(data => Number(data)).filter(data => Number(data) !== Number(slot))
    } else {
      newSlot.push(Number(slot))
    }
    setSelectedSlot(newSlot);
  }

  const handleBooking = () => {
    setModalOpen(true)
  }

  const handleSubmit = async () => {
    setLoading(true)
    const updatedData = {
      userId: accessToken,
      doctorId: id,
      timeSlot: selectedSlot,
    }
    try {
      if (!idBooking) {
        await createData(updatedData, 'booking');
      } else {
        await updateData(idBooking, updatedData, 'booking')
      }
    } catch (error) {
      console.log('error', error)
    } finally {
      setLoading(false)
      router.push('/appointment')
    }
    
  }
  function areArraysEqual(arr1: number[], arr2: number[]): boolean {
    if (arr1.length !== arr2.length) {
      return false;
    }
  
    return arr1.every((elem) => arr2.includes(elem));
  }

  return (
    <>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          title='Booking Confirmation'
          footer={(
            <div className={styles.modalBookingConfirmation}>
              <Button variant='error' onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button variant='success' onClick={handleSubmit}>
                Booking Now
              </Button>
            </div>
          )}
        >
          <div>Are You Sure Booking This Order</div>
        </Modal>
      )}
      <div>
        <h2 className={styles.name}>{name}</h2>
        <p className={styles.speciality}>{speciality}</p>
        <p className={styles.price}>Price: ${price}</p>
        <div className={styles.rating}>
          {Array.from({ length: rating }, (_, index) => (
            <span key={index} className={styles.star}>&#9733;</span>
          ))}
        </div>
        <div>
          {Object.entries(TIME_SLOT).map(([key, _]) => {
            return (
              <TimeSlot
                key={key}
                time={parseInt(key)}
                isSelected={selectedSlot.map((data: any) => Number(data)).includes(parseInt(key))}
                disabled={!timeSlots?.includes(parseInt(key))}
                onClick={() => handleTimeSlotClick(key)}
              />
            )
          })}
        </div>
        {(!areArraysEqual(selectedSlot, currentSlot) && selectedSlot.length > 0) && (
          <div className={styles.bookingOrder}>
            <Button onClick={handleBooking}>
              Booking Now
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default DoctorProfile;
