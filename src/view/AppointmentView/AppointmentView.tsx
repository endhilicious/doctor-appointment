import React, { useEffect, useState } from 'react';
import styles from './AppointmentView.module.scss';
import { Card } from '#/components/Card';
import { Button } from '#/common/Button';
import Modal from '#/common/Modals/Modals';
import { useLoading } from '#/context/useLoading';
import { deleteData, getDataByField, getDataById } from '#/firebase/firebaseService';
import { useAuth } from '#/context/useAuth';

const TIME_SLOT: { [key: string]: string } = {
  1: '14.00',
  2: '14.30',
  3: '15.00',
  4: '15.30',
  5: '16.00',
  6: '16.30',
  7: '17.30'
}

const TIME_SLOT_LAST: { [key: string]: string } = {
  1: '14.30',
  2: '15.00',
  3: '15.30',
  4: '16.00',
  5: '16.30',
  6: '17.30',
  7: '17.30',
}


const AppointmentView: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false)
  const [bookingData, setBookingData] = useState<any>([]);
  const [selectedData, setSelectedData] = useState<any>(null)
  const { isLoading, setLoading } = useLoading();
  const { accessToken } = useAuth();

  const fetchBookingData = async () => {
    try {
      setLoading(true);
      const response: any[] = await getDataByField('userId', accessToken, 'booking');

      if (response.length === 0) {
        setLoading(false);
        setBookingData([]);
        return;
      }

      const newData = await Promise.all(
        response.map(async (data: any) => {
          setLoading(true);
          const doctorData = await getDataById(data.doctorId, 'doctor');
          setLoading(false);

          return { ...data, ...doctorData, idBooking: data.id };
        })
      );

      setBookingData([...newData]);
    } catch (error) {
      console.log('error', error)
    }
  }

  useEffect(() => {
    fetchBookingData()
  }, [])

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleCancelBooking = (bookingId: any) => {
    setSelectedData(bookingId);
    setModalOpen(true)
  }

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setModalOpen(false)

      await deleteData(selectedData, 'booking');
    } catch (error) {
      console.log('error', error);
    } finally {
      fetchBookingData()
    }
  }

  const handleCancel = () => {
    setModalOpen(false)
    setSelectedData(null);
  };

  return (
    <div className={styles.appointmentView}>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCancel}
        title='Booking Confirmation'
        footer={(
          <div className={styles.modalCancelConfirmation}>
            <Button variant='error' onClick={handleCancel}>
              Close
            </Button>
            <Button variant='success' onClick={handleSubmit}>
              Cancel Appointment
            </Button>
          </div>
        )}
      >
        Are You Sure Want to Cancel This Appointment ?
      </Modal>
      <h1 className={styles.title}>My Appointments</h1>
      {bookingData.length === 0 ? (
        <p className={styles.noAppointments}>No appointments found.</p>
      ) : (
        <div className={styles.appointmentsList}>
          {bookingData.map((booking: any) => (
            <Card key={booking.id} onClick={() => {}}>
              <div>
                <strong className={styles.doctorId}>Doctor Name:</strong> {booking.name}
              </div>
              <div>
                <strong className={styles.timeSlot}>Time Slot:</strong>
                <div className={styles.timeSlotTime}>
                  <span>{TIME_SLOT[booking.timeSlot[0]]} - {TIME_SLOT_LAST[booking.timeSlot[booking.timeSlot.length - 1]]}</span>
                  <span>({booking.timeSlot.length} Slot)</span>
                </div>
              </div>
              <div>
                <Button variant='error' size='xs' onClick={() => handleCancelBooking(booking.idBooking)}>Cancel Appointment</Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AppointmentView;
